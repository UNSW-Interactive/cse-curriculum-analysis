from flask_restful import Resource
from flask import jsonify, request, Response

from src.routes.database.db_manager import get_prereqs

class Prereqs(Resource):
    def get(self):
        return jsonify(
           {}
        )

    def post(self):
        body = request.get_json()
        if "courses" not in body:
            return Response("Body requires JSON with 'courses' key.", status=400)
        elif not isinstance(body['courses'], list):
            return Response("'courses' value must be an array.", status=400)
        return jsonify(get_prereqs(body["courses"]))
