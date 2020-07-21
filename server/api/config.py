import os

class Config:
    SECRET_KEY = ...
    DEBUG = False

class TestConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    # TODO: Database, etc
    pass
