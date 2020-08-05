import os

class Config:
    SECRET_KEY = ...
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    # TODO: Database, etc
    DEBUG = False
