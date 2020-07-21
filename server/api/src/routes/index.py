from flask_restful import Resource

class Index(Resource):
    def __init__(self, connection):
        self.connection=connection
    def get(self):
        return "hi"
    def post(self):
        pass