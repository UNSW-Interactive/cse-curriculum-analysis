# Main file
from parsr import Parsr
import json
import string
import re

# p = Parsr(config_file='curriculum-analysis/config.json')
# with p:
#     qID = p.start_parsing_pdf('curriculum-analysis/file-management.pdf')
#     j = p.get_parsed_json(qID)
# with open('res.json', 'w') as myf:
#     myf.write(json.dumps(j))
# print(len(j))

with open("res.json") as myf:
    j = json.load(myf)


def preprocess(old: str) -> str:
    # strip non-alphabetical characters
    pattern = re.compile('[^a-z]+', re.UNICODE|re.IGNORECASE)
    return pattern.sub('', old).lower()

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
            if not new_content: # empty string
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


all_words = []
for page in j["pages"]:
    page_elements = page["elements"]
    all_words.extend(get_words(page_elements))

# with open('res2.json', 'w') as myf2:
#     myf2.write(json.dumps(all_words))

# Keep unique words, ranked by importance
unique_words = []
seen = {}
for word_obj in all_words:
    word = word_obj["content"]
    font = word_obj["font"]
    if word in seen:
        if font >= seen[word]:
            # seen it already and it's less important
            continue
        # else, get rid of our old entry
        unique_words.remove({"content": word, "font": seen[word]})
    unique_words.append(word_obj)
    seen[word] = font

with open('res3.json', 'w') as myf3:
    myf3.write(json.dumps(unique_words))

# Distribution
# import numpy as np
# import matplotlib.mlab as mlab
# import matplotlib.pyplot as plt

# num_bins = 5
# x=[w["font"] for w in unique_words]
# n, bins, patches = plt.hist(x, num_bins, facecolor='blue', alpha=0.5)
# plt.show()