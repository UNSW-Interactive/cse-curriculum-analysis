# Main file - todo rename to analyse.py?
from parsr import Parsr
import json
import string
import re
import urllib.parse
import requests
from nltk.corpus import words as nltk_words  # nltk.download('words')
from stopwords import STOPWORDS
import argparse
from my_wikipedia import get_categories, wp_search
from validate import validate_course, validate_file, validate_lec_number
import database
import sys
from collections import Counter

english_words = set(nltk_words.words())

def preprocess(old: str) -> str:
    # strip non-alphabetical characters
    pattern = re.compile("[^a-z]+", re.UNICODE | re.IGNORECASE)
    new = pattern.sub("", old).lower()
    return new if new not in STOPWORDS else ""


def get_words(elements) -> list:
    words = []
    for element in elements:
        if element is None:
            continue
        if "content" not in element:
            continue
        if isinstance(element["content"], list):
            words.extend(get_words(element["content"]))
        else:
            new_content = preprocess(element["content"])
            if not new_content or new_content not in english_words:  # empty string
                continue
            words.append(
                {
                    # "id": element["id"],
                    # "type": element["type"],
                    "content": new_content,
                    "font": element["font"],
                }
            )
    return words

def main(lecture_file, course, lecture):
    if (parsed_json := database.get_parsed_json(course, lecture) is None):
        parsr = Parsr()
        with parsr:
            qID = parsr.start_parsing_pdf(lecture_file)
            parsed_json = parsr.get_parsed_json(qID) 
            # could maybe do something smarter here... threading, etc
            # todo: scale with # of pages?
    
    # check if we've already parsed this lecture
    # if we have, but we override, do CA again
    if database.has_parsed_result(course, lecture) and not args.override:
        print("Content has already been parsed")
        sys.exit(0)
    
    all_words = []
    for page in parsed_json["pages"]:
        page_elements = page["elements"]
        all_words.extend(get_words(page_elements))

    c = Counter()
    # We want to give weight to those with lower font
    lowest_font = min(all_words, key=lambda x: x["font"])["font"]
    highest_font = max(all_words, key=lambda x: x["font"])["font"]
    for word_obj in all_words:
        word = word_obj["content"]
        font = word_obj["font"]
        # font is kinda backwards with parsr
        c[word] += (highest_font - lowest_font) - font

    search_result = wp_search(*[i[0] for i in c.most_common(5)])
    for page in search_result:
        print(get_categories(page))


# TODO: Put in a file
class Course:
    def __init__(self, course):
        self.course = course


class Lecture:
    def __init__(self, num):
        self.num = num


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Parse a given lecture's slides.")
    parser.add_argument(
        "-f", "--file", help="The file to parse.", type=validate_file, required=True
    )
    parser.add_argument(
        "-c", "--course", help="The course.", type=validate_course, required=True
    )
    parser.add_argument(
        "-n",
        "--num",
        help="The lecture number.",
        type=validate_lec_number,
        required=True,
    )
    parser.add_argument(
        "--override",
        help="Run curriculum analysis on this lecture even if data for this lecture already exists.",
    )
    args = parser.parse_args()
    main(args.file, Course(args.course), Lecture(args.num))
