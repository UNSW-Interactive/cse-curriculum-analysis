from flask import Flask
from flask_restful import Api
from flask_cors import CORS
import psycopg2
import time
import sys
from src.routes.index import Index
from src.routes.graph import generate_graph
from src.routes.prereqs import api_get_all_prereqs
from src.routes.course import get_course_info

# TODO: config file for below... (these lines will prob go after app = , where u pass uin config)
# connection = psycopg2.connect(
#     dbname="postgres", user="postgres", host="0.0.0.0", port=5432, password="abc"
# )
connection = None

app = Flask(__name__)
# Access-Control-Allow-Origin header
CORS(app)
api = Api(app)

@app.route('/')
def index():
    return "hi"

@app.route('/graph')
def graph():
    return generate_graph(connection)

@app.route('/prereqs')
def prereqs():
    return api_get_all_prereqs(connection)

@app.route('/course/<string:course>')
def course(course_name):
    return get_course_info(connection, course_name)

# api.add_resource(Index, "/", connection=connection)
# api.add_resource(Graph, "/graph")
# api.add_resource(Prereqs, "/prereqs")
# api.add_resource(Course, "/course/<string:course>", connection=conn)
