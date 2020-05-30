from flask import Flask
from flask_restful import Api

from app.routes.index import Index

app = Flask(__name__)
api = Api(app)


api.add_resource(Index, "/")