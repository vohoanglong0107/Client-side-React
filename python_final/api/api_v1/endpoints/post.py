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
    create_post,
    delete_post,
    get_post_by_user_id,
    get_post_for_user_id,
    get_user_id,
    heart_post,
    unheart_post,
    update_post,
)

from python_final.main import app

# Import Schemas
from python_final.schemas.posts import PostSchema

# Import models
from python_final.models.users import User
from python_final.models.posts import Post
from python_final.models.roles import Role


@docs.register
@doc(description="Create new post", security=security_params, tags=["posts"])
@app.route(f"{config.API_V1_STR}/posts/create", methods=["POST"])
@use_kwargs(
    {
        "body": fields.Str(required=True),
    }
)
@marshal_with(PostSchema())
@jwt_required()
def route_create_posts(body):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = create_post(db_session, body, get_user_id(current_user))
    return user


@docs.register
@doc(description="Update post", security=security_params, tags=["posts"])
@app.route(f"{config.API_V1_STR}/posts/update", methods=["POST"])
@use_kwargs(
    {
        "id": fields.Int(required=True),
        "body": fields.Str(required=True),
    }
)
@marshal_with(PostSchema())
@jwt_required()
def route_update_posts(id, body):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = update_post(db_session, id, body)
    return user


@docs.register
@doc(description="Get posts for current user", security=security_params, tags=["posts"])
@app.route(f"{config.API_V1_STR}/posts/get", methods=["GET"])
@marshal_with(PostSchema())
@jwt_required()
def route_get_posts():
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = get_post_for_user_id(db_session, get_user_id(current_user))
    return user


@docs.register
@doc(description="delete post", security=security_params, tags=["posts"])
@app.route(f"{config.API_V1_STR}/posts/delete", methods=["POST"])
@use_kwargs(
    {
        "id": fields.Int(required=True),
    }
)
@marshal_with(PostSchema())
@jwt_required()
def route_delete_posts(id):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = delete_post(db_session, id)
    return user


@docs.register
@doc(description="unheart post by post id", security=security_params, tags=["posts"])
@app.route(f"{config.API_V1_STR}/posts/unheart", methods=["POST"])
@use_kwargs(
    {
        "id": fields.Int(required=True),
    }
)
@marshal_with(PostSchema())
@jwt_required()
def route_heart_posts(id):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    post = unheart_post(db_session, id)
    return post
