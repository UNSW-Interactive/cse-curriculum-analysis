from flask import jsonify
from collections import Counter, defaultdict

from src.routes.database.db_manager import get_all_courses_lectures_categories
from src.routes.graph import generate_maps_to_courses
from src.routes.utils.constants import WP_CATEGORIES as cats_to_subcats

def get_course_relationship(connection, course_a, course_b):
    # technically should filter in psql but whatever
    courses_a_b = [i for i in get_all_courses_lectures_categories(connection) if i[0] in (course_a, course_b)]
    _, cats_to_courses = generate_maps_to_courses(courses_a_b)
    cats_a = [(i, cats_to_subcats[i]) for i in cats_to_courses if course_a in cats_to_courses[i]]
    cats_b = [(i, cats_to_subcats[i]) for i in cats_to_courses if course_b in cats_to_courses[i]]
    subcats_a = set()
    subcats_b = set()
    for cat in cats_a:
        subcats_a.update(cat[1])
    for cat in cats_b:
        subcats_b.update(cat[1])
    intersecting_subcats = subcats_a.intersection(subcats_b)

    c = Counter()
    result = defaultdict(set)
    for cat in cats_a:
        for subcat in cat[1]:
            if any(cat[0] == c[0] for c in cats_b):
                # cat in cat_a also in cat_b
                c[subcat] += 1
            result[subcat].add(cat[0])
            # c[subcat] += 1 if any(cat[0] == c[0] for c in cats_b) else 0
    for cat in cats_b:
        for subcat in cat[1]:
            result[subcat].add(cat[0])
            # no adding since we've already counted it
    # for cat in cats_b:
    #     for subcat in cat[1]:
    #         result[subcat].add(cat[0])
    #         c[subcat] += 2 if any(cat[0] == c[0] for c in cats_a) else 0.5
    # for cat in cats_a + cats_b:
    #     for subcat in cat[1]:
    #         result[subcat].add(cat[0]) # todo: limit? can be front end job
    #         c[subcat] += 1

    # remove subcats not related to each other
    for subcat in list(c.keys()):
        if subcat not in intersecting_subcats:
            c.pop(subcat)
    
    api_result = {}
    total = sum(c.values())
    for subcat in c:
        api_result[subcat] = {
            'percentage': c[subcat] / total,
            'wp_categories': list(result[subcat])
        }
    return jsonify(api_result)

