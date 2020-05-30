from flask import Flask
from flask_script import Manager
from app import app
from config import ProductionConfig



# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt

# from config import ProductionConfig


# db = SQLAlchemy()
# flask_bcrypt = Bcrypt()
# app = create_app(None)
app.config.from_object(ProductionConfig)
manager = Manager(app)

@manager.command
def run():
    app.run()


if __name__ == "__main__":
    manager.run()
