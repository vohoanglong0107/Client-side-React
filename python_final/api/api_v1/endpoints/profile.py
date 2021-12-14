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
        "username": fields.Str(required=False),
        "email": fields.Str(required=False),
        "password": fields.Str(required=False),
        "role_id": fields.Integer(required=False),
    },
    location="form",
)
@marshal_with(ProfileSchema())
@jwt_required()
def route_users_id_put(username=None, email=None, password=None, role_id=None):
    current_user: User = get_current_user()

    avatar = request.files.get("avatar")

    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    profile = update_profile_by_id(db_session, get_user_id(current_user), username, email, password, role_id, avatar)
    return profile
