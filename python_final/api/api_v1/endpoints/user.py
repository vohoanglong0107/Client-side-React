# Import standard library modules

# Import installed modules
# # Import installed packages
from flask import abort, jsonify
from webargs import fields
from flask_apispec import doc, use_kwargs, marshal_with
from flask_jwt_extended import get_current_user, jwt_required

# Import app code
from python_final.api.api_v1.api_docs import docs, security_params
from python_final.core import config
from python_final.db.flask_session import db_session
from python_final.db.utils import (
    follow_user_by_id,
    get_followers_by_user_id,
    get_following_by_user_id,
    get_user_by_email,
    get_user_id,
    search_user_by_username_or_email,
    get_user_by_username,
    create_user,
    get_user_by_id,
    unfollow_user_by_id,
)

from python_final.main import app

# Import Schemas
from python_final.schemas.users import UserSchema

# Import models
from python_final.models.users import User
from python_final.models.roles import Role


@docs.register
@doc(description="Register new user without the need to be logged in", tags=["users"])
@app.route(f"{config.API_V1_STR}/users/register", methods=["POST"])
@use_kwargs(
    {
        "username": fields.Str(required=True),
        "email": fields.Str(required=True),
        "password": fields.Str(required=True),
        "role_id": fields.Integer(required=True),
    }
)
@marshal_with(UserSchema())
def route_users_post_open(username, email, password, role_id):
    user = get_user_by_username(username, db_session)

    if user:
        return abort(
            400, f"The user with this username already exists in the system: {username}"
        )
    user = get_user_by_email(email, db_session)
    if user:
        return abort(
            400, f"The user with this email already exists in the system: {email}"
        )

    user = create_user(db_session, username, email, password, role_id)
    return user


@docs.register
@doc(description="Get current user", security=security_params, tags=["users"])
@app.route(f"{config.API_V1_STR}/users/me", methods=["GET"])
@marshal_with(UserSchema())
@jwt_required()
def route_users_me_get():
    current_user: User = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")
    current_user.number_of_followers = len(current_user.followers)
    current_user.number_of_following = len(current_user.following)
    return current_user


@docs.register
@doc(description="Get a specific user by ID", security=security_params, tags=["users"])
@app.route(f"{config.API_V1_STR}/users/<int:user_id>", methods=["GET"])
@marshal_with(UserSchema())
@jwt_required()
def route_users_id_get(user_id):
    current_user: User = get_current_user() 

    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = get_user_by_id(user_id, db_session)

    if not user:
        return abort(400, f"The user with id: {user_id} does not exists")
    user.number_of_followers = len(user.followers)
    user.number_of_following = len(user.following)
    return user


@docs.register
@doc(
    description="check is following",
    security=security_params,
    tags=["users"],
)
@app.route(f"{config.API_V1_STR}/users/<int:user_id>/isFollowing/", methods=["GET"])
@jwt_required()
def route_users_check_is_following(user_id):
    current_user: User = get_current_user()

    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = get_user_by_id(user_id, db_session)
    if not user:
        return abort(400, f"The user with id: {user_id} does not exists")

    following = get_following_by_user_id(db_session, get_user_id(current_user))
    return jsonify({'msg': user in following})


@docs.register
@doc(
    description="Follow a user by ID",
    security=security_params,
    tags=["users"],
)
@app.route(f"{config.API_V1_STR}/users/<int:user_id>/follow/", methods=["POST"])
@marshal_with(UserSchema())
@jwt_required()
def route_users_follow(user_id):
    current_user: User = get_current_user()

    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = get_user_by_id(user_id, db_session)
    if not user:
        return abort(400, f"The user with id: {user_id} does not exists")

    updated_user = follow_user_by_id(db_session, user_id, get_user_id(current_user))
    return updated_user


@docs.register
@doc(
    description="Unfollow a user by ID",
    security=security_params,
    tags=["users"],
)
@app.route(f"{config.API_V1_STR}/users/<int:user_id>/unfollow/", methods=["POST"])
@marshal_with(UserSchema())
@jwt_required()
def route_users_unfollow(user_id):
    current_user: User = get_current_user()

    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = get_user_by_id(user_id, db_session)
    if not user:
        return abort(400, f"The user with id: {user_id} does not exists")

    updated_user = unfollow_user_by_id(db_session, user_id, get_user_id(current_user))
    return updated_user


@docs.register
@doc(
    description="Get all followers of a user by ID",
    security=security_params,
    tags=["users"],
)
@app.route(f"{config.API_V1_STR}/users/<int:user_id>/followers/", methods=["GET"])
@marshal_with(UserSchema(many=True))
@jwt_required()
def route_user_get_followers(user_id):
    current_user: User = get_current_user()

    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    user = get_user_by_id(user_id, db_session)
    if not user:
        return abort(400, f"The user with id: {user_id} does not exists")

    followers = get_followers_by_user_id(db_session, user_id)
    return followers


@docs.register
@doc(
    description="search users by username or email",
    security=security_params,
    tags=["users"],
)
@app.route(f"{config.API_V1_STR}/users/search/<search_text>", methods=["GET"])
@marshal_with(UserSchema(many=True))
@jwt_required()
def route_search_users(search_text):
    current_user: User = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    users = search_user_by_username_or_email(db_session, search_text)
    for user in users:
        user.number_of_followers = len(user.followers)
        user.number_of_following = len(user.following)
    return users