from flask import Flask, g
from flask_restful import Api
from flask_cors import CORS, cross_origin
import psycopg2
import time
import sys
import signal
from src.routes.index import Index
from src.routes.graph import generate_graph
from src.routes.prereqs import api_get_all_prereqs
from src.routes.course import get_course_info
from src.routes.search import search_courses

app = Flask(__name__)
# Access-Control-Allow-Origin header
CORS(app)
# api = Api(app)

# could go in separate file
def connect_to_db():
    connection = psycopg2.connect("") # "" to use env vars
    return connection

def get_db():
    if not hasattr(g, 'postgres_db'):
        g.postgres_db = connect_to_db()
    return g.postgres_db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'postgres_db'):
        g.postgres_db.close()

@app.route('/')
def index():
    return "hi"

@app.route('/graph')
def graph():
    return generate_graph(get_db())

@app.route('/prereqs')
def prereqs():
    return api_get_all_prereqs(get_db())

@app.route('/course/<string:course>')
def api_course(course):
    return get_course_info(get_db(), course)

@app.route('/search/<string:keyword>')
def search_keyword(keyword):
    return search_courses(keyword)