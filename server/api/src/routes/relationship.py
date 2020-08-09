from flask import jsonify
from collections import Counter, defaultdict

from src.routes.database.db_manager import get_all_courses_lectures_categories, get_votes
from src.routes.graph import generate_maps_to_courses, build_graph
from src.routes.utils.constants import WP_CATEGORIES as cats_to_subcats

def get_course_relationship(connection, course_a, course_b):
    # technically should filter in psql but whatever
    courses_a_b = [i for i in get_all_courses_lectures_categories(connection) if i[0] in (course_a, course_b)]
    subcats_to_courses, cats_to_courses = generate_maps_to_courses(courses_a_b)
    graph = build_graph(
        courses_a_b,
        [course_a, course_b],
        cats_to_subcats,
        subcats_to_courses,
        cats_to_courses,
    )
    relationship = graph[course_a][course_b]
    cats_a = [(i, cats_to_subcats[i]) for i in cats_to_courses if course_a in cats_to_courses[i]]
    cats_b = [(i, cats_to_subcats[i]) for i in cats_to_courses if course_b in cats_to_courses[i]]
    result = defaultdict(set)
    for cat in cats_a + cats_b:
        for subcat in cat[1]:
            result[subcat].add(cat[0])
    total = sum(relationship.values())
    api_result = {}
    for subcat in relationship:
        api_result[subcat] = {
            'percentage': relationship[subcat] / total,
            'wp_categories': list(result[subcat])
        }

    # also get votes
    votes = get_votes(connection, course_a, course_b)
    api_result['likes'] = votes[0] if votes is not None else 0
    api_result['dislikes'] = votes[1] if votes is not None else 0
    return jsonify(api_result)

