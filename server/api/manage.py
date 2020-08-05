from flask import Flask
from flask_script import Manager
import sys, signal
# print("QWERT")
from src import app
from flask.cli import FlaskGroup
# from dotenv import load_dotenv
# load_dotenv()
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt

# from config import ProductionConfig


# db = SQLAlchemy()
# flask_bcrypt = Bcrypt()
# app = create_app(None)
# app.config.from_object(ProductionConfig)
# manager = Manager(app)

# @manager.command
# def run():
#     app.run(host='0.0.0.0', port=8000) # TODO: Not debug=True, do better (config)

## This is used in production ##
cli = FlaskGroup(app)

if __name__ == "__main__":
    cli()
