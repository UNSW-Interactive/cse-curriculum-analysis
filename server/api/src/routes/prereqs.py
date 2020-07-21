from flask_restful import Resource
from flask import jsonify, request, Response

from src.routes.database.db_manager import get_prereqs, get_all_prereqs


# class Prereqs(Resource):
#     def __init__(self, connection):
#         self.connection = connection

def api_get_all_prereqs(connection):
    # TEMP CODE
    # return jsonify(
    #     {
    #         "COMP1911": {"handbook_prereqs": "", "prereqs": []},
    #         "COMP1511": {"handbook_prereqs": "", "prereqs": []},
    #         "COMP1521": {
    #             "handbook_prereqs": "Prerequisite: COMP1511 or DPST1091 or COMP1911 or COMP1917",
    #             "prereqs": ["OR", {"COMP1911": ""}, {"COMP1511": ""}],
    #         },
    #     }
    # )
    d = get_all_prereqs(connection)
    d["MATH1081"] = {"handbook_prereqs": "", "prereqs": []} # put in db prob
    d["COMP9814"] = {"handbook_prereqs": "", "prereqs": {"COMP9024": ""}} # put in db
    d["COMP9441"] = {"handbook_prereqs": "", "prereqs": []} # TODO: Remove references of this in db (reparse everything). course doesn't exist
    d["SENG1031"] = {"handbook_prereqs": "", "prereqs": []} # TODO: Remove references of this in db (reparse everything). course doesn't exist
    return jsonify(d)

def get_some_prereqs(connection):
    body = request.get_json()
    if "courses" not in body:
        return Response("Body requires JSON with 'courses' key.", status=400)
    elif not isinstance(body["courses"], list):
        return Response("'courses' value must be an array.", status=400)
    return jsonify(get_prereqs(connection, body["courses"]))
