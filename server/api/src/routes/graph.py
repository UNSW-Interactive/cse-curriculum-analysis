from flask_restful import Resource
from flask import jsonify

class Graph(Resource):
    def get(self):
        return jsonify(["COMP1511", "COMP1521", "COMP2522"])
    def post(self):
        pass