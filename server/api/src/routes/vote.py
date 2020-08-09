from flask import Response

from src.routes.database.db_manager import upvote, remove_upvote, downvote, remove_downvote

def like(connection, course_a, course_b):
    upvote(connection, course_a, course_b)
    return Response()

def dislike(connection, course_a, course_b):
    downvote(connection, course_a, course_b)

def unlike(connection, course_a, course_b):
    remove_upvote(connection, course_a, course_b)

def undislike(connection, course_a, course_b):
    remove_downvote(connection, course_a, course_b)