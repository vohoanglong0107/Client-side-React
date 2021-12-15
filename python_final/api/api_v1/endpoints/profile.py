# Import standard library modules

# Import installed modules
# # Import installed packages
from flask import abort, request
from webargs import fields
from flask_apispec import doc, use_kwargs, marshal_with
from flask_jwt_extended import get_current_user, jwt_required

# Import app code
from python_final.api.api_v1.api_docs import docs, security_params
from python_final.core import config
from python_final.db.flask_session import db_session
from python_final.db.utils import (
    get_profile_by_id,
    get_user_id,
    update_profile_by_id,
)

from python_final.main import app

# Import Schemas
from python_final.schemas.users import UserSchema
from python_final.schemas.profiles import ProfileSchema

# Import models
from python_final.models.users import User


@docs.register
@doc(description="Update current user profile", security=security_params, tags=["profiles"])
@app.route(f"{config.API_V1_STR}/profiles/update", methods=["PUT"])
@use_kwargs(
    {
        "fullname": fields.Str(required=False),
        "location": fields.Str(required=False),
        "about_me": fields.Str(required=False),
    },
    location="form",
)
@marshal_with(ProfileSchema())
@jwt_required()
def route_profile_id_put(fullname=None, location=None, about_me=None):
    current_user: User = get_current_user()

    avatar = request.files.get("avatar")

    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    profile = update_profile_by_id(db_session, get_user_id(current_user), fullname, location, about_me, avatar)
    return profile


@docs.register
@doc(description="Get user profile by id", security=security_params, tags=["profiles"])
@app.route(f"{config.API_V1_STR}/profiles/<int:user_id>", methods=["GET"])
@marshal_with(ProfileSchema())
@jwt_required()
def route_profile_id_get(user_id):
    current_user: User = get_current_user()

    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    profile = get_profile_by_id(db_session, user_id)
    return profile
