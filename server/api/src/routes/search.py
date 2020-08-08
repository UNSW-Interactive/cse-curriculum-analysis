from flask import jsonify
from collections import Counter

from src.routes.database.db_manager import search_keyword


def search_courses(conn, keywords):
    r = filter(None, (search_keyword(conn, keyword) for keyword in keywords))
    final_count = Counter({})
    for i in r:
        for j in i:
            final_count[j[0]] += j[1]
    # print(final_count)
    return jsonify(list(map(lambda x:x[0],final_count.most_common())))
    # return jsonify(list(
    #     map(
    #         lambda x: x[0],
    #         sorted(search_keyword(conn, keyword) for keyword in keywords),
    #     ))
    # )

