from flask_restful import Resource
from flask import request, jsonify, Response

from src.routes.database.db_manager import get_course_information

class Course(Resource):
    def get(self, course):
        db_course_info =  get_course_information(course)
        if db_course_info is None:
            return Response(f"Course '{course}' does not exist.", status=404)
        keys = ['course_code', 'course_name', 'host_url', 'handbook_summary', 'grad_level', 'handbook_prereqs']
        return jsonify(dict(zip(keys, (course,) + db_course_info)))
    def post(self):
        pass