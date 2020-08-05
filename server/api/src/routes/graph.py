from flask_restful import Resource
from flask import jsonify
import json
import collections

from src.routes.database.db_manager import get_all_courses_lectures_categories
from src.routes.utils.constants import WP_CATEGORIES as cats_to_subcats

def generate_maps_to_courses(all_courses):
    subcats_to_courses = collections.defaultdict(set)
    cats_to_courses = collections.defaultdict(set)
    for name, _, cats in all_courses:
        for cat in cats:
            if cat in cats_to_subcats:
                cats_to_courses[cat].add(
                    name
                )  # can move this before the if but could be spammy
                for subcat in cats_to_courses[cat]:
                    subcats_to_courses[subcat].add(name)

    return subcats_to_courses, cats_to_courses


def build_graph(all_courses, all_courses_names, cats_to_subcats, subcats_to_courses, cats_to_courses):
    adj_matrix = {
        i: {j: collections.defaultdict(int) for j in all_courses_names if j != i}
        for i in all_courses_names
    }

    for name, _, cats in all_courses:
        for cat in cats:
            if cat in cats_to_courses:
                linked_subjs = cats_to_courses[cat]
                for linked_subj in linked_subjs:
                    if linked_subj == name:
                        continue
                    subcats = cats_to_subcats[cat]
                    for subcat in subcats:
                        adj_matrix[name][linked_subj][subcat] += 2
            else:
                if cat not in cats_to_subcats:
                    # not related to any subcategory
                    continue
                subcats = cats_to_subcats[cat]
                for subcat in subcats:
                    print(subcat)
                    linked_subjs = subcats_to_courses[subcat]
                    for linked_subj in linked_subjs:
                        if linked_subj == name:
                            continue
                        adj_matrix[name][linked_subj][subcat] += 1

    return adj_matrix


def remove_dupe_links(graph):
    links_seen = set()
    for course in graph:
        for neighbour in graph[course]:
            if tuple(sorted((course, neighbour))) not in links_seen:
                links_seen.add(tuple(sorted((course, neighbour))))

    new_adj_matrix = collections.defaultdict(dict)
    for i, j in links_seen:
        new_adj_matrix[i][j] = graph[i][j]

    return new_adj_matrix


# class Graph(Resource):
#     def __init__(self, connection):
#         self.connection = connection

def generate_graph(connection):
    all_courses = get_all_courses_lectures_categories(connection)
    all_course_names = list(set(map(lambda x: x[0], all_courses)))
    subcats_to_courses, cats_to_courses = generate_maps_to_courses(all_courses)
    graph = build_graph(
        all_courses, all_course_names, cats_to_subcats, subcats_to_courses, cats_to_courses
    )

    # Need to remove duplicated links since it's an undirected graph
    # TODO: This makes it a directed graph :)
    subcats = list(set([i for j in cats_to_subcats.values() for i in j]))
    subcats.remove('Human-based computation') # no course has this
    undirected_graph = remove_dupe_links(graph)
    return jsonify({
        'nodes': all_course_names,
        'edges': undirected_graph,
        'subcategories': subcats
    })

    # def post(self):
    #     pass
