# Import standard library modules

# Import installed modules
# # Import installed packages
from flask import abort
from webargs import fields
from flask_apispec import doc, use_kwargs, marshal_with
from flask_jwt_extended import get_current_user, jwt_required

# Import app code
from python_final.api.api_v1.api_docs import docs, security_params
from python_final.core import config
from python_final.db.flask_session import db_session
from python_final.db.utils import (
    create_comment,
    delete_comment,
    get_comment_by_post_id,
    update_comment,
)

from python_final.main import app

# Import Schemas
from python_final.schemas.comments import CommentSchema

# Import models
from python_final.models.users import User
from python_final.models.posts import Post
from python_final.models.comments import Comment
from python_final.models.roles import Role


@docs.register
@doc(description="Create new comment", tags=["posts"])
@app.route(f"{config.API_V1_STR}/comments/create", methods=["POST"])
@use_kwargs(
    {
        "body": fields.Str(required=True),
        "post_id": fields.Int(required=True),
    }
)
@marshal_with(CommentSchema())
@jwt_required()
def route_create_posts(body, post_id):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = create_comment(db_session, body, post_id, current_user.id)
    return user


@docs.register
@doc(description="Update comment", tags=["posts"])
@app.route(f"{config.API_V1_STR}/comments/update", methods=["POST"])
@use_kwargs(
    {
        "id": fields.Int(required=True),
        "body": fields.Str(required=True),
    }
)
@marshal_with(CommentSchema())
@jwt_required()
def route_update_posts(id, body):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = update_comment(db_session, id, body)
    return user


@docs.register
@doc(description="Get comments by post id", tags=["posts"])
@app.route(f"{config.API_V1_STR}/comments/get", methods=["GET"])
@use_kwargs(
    {
        "id": fields.Int(required=True),
    }
)
@marshal_with(CommentSchema())
@jwt_required()
def route_update_posts(id):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = get_comment_by_post_id(db_session, id)
    return user


@docs.register
@doc(description="delete comment", tags=["posts"])
@app.route(f"{config.API_V1_STR}/comments/delete", methods=["POST"])
@use_kwargs(
    {
        "id": fields.Int(required=True),
    }
)
@marshal_with(CommentSchema())
@jwt_required()
def route_delete_posts(id):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = delete_comment(db_session, id)
    return user