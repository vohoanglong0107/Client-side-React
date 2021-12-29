# Import standard library modules

# Import installed modules
# # Import installed packages
from flask import abort
from webargs import fields
from flask_apispec import doc, use_kwargs, marshal_with
from flask_jwt_extended import get_current_user, jwt_required

# Import app code
from react_client_side.api.api_v1.api_docs import docs, security_params
from react_client_side.core import config
from react_client_side.db.flask_session import db_session
from react_client_side.db.utils import (
    create_comment,
    delete_comment,
    get_comment_by_post_id,
    get_user_id,
    update_comment,
)

from react_client_side.main import app

# Import Schemas
from react_client_side.schemas.comments import CommentSchema

# Import models
from react_client_side.models.users import User
from react_client_side.models.posts import Post
from react_client_side.models.comments import Comment
from react_client_side.models.roles import Role


@docs.register
@doc(description="Create new comment", security=security_params, tags=["posts"])
@app.route(f"{config.API_V1_STR}/comments/create/<int:post_id>", methods=["POST"])
@use_kwargs(
    {
        "body": fields.Str(required=True),
    }
)
@marshal_with(CommentSchema())
@jwt_required()
def route_create_comments(post_id, body):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    comment = create_comment(db_session, body, post_id, get_user_id(current_user))
    return comment


@docs.register
@doc(description="Update comment", security=security_params, tags=["posts"])
@app.route(f"{config.API_V1_STR}/comments/update", methods=["POST"])
@use_kwargs(
    {
        "id": fields.Int(required=True),
        "body": fields.Str(required=True),
    }
)
@marshal_with(CommentSchema())
@jwt_required()
def route_update_comments(id, body):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    comment = update_comment(db_session, id, body)
    return comment


@docs.register
@doc(description="Get comments by post id", security=security_params, tags=["posts"])
@app.route(f"{config.API_V1_STR}/comments/get", methods=["GET"])
@use_kwargs(
    {
        "id": fields.Int(required=True),
    }
)
@marshal_with(CommentSchema())
@jwt_required()
def route_get_comments(id):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    comment = get_comment_by_post_id(db_session, id)
    return comment


@docs.register
@doc(description="delete comment", security=security_params, tags=["posts"])
@app.route(f"{config.API_V1_STR}/comments/delete", methods=["POST"])
@use_kwargs(
    {
        "id": fields.Int(required=True),
    }
)
@marshal_with(CommentSchema())
@jwt_required()
def route_delete_comments(id):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    comment = delete_comment(db_session, id)
    return comment
