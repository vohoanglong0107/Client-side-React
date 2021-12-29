# Import standard library modules

# Import installed modules
# # Import installed packages
from flask import abort
from webargs import fields
from flask_apispec import doc, use_kwargs, marshal_with
from flask_jwt_extended import get_current_user, jwt_required

# Import app code
from react_client_side.main import app
from react_client_side.api.api_v1.api_docs import docs, security_params
from react_client_side.core import config
from react_client_side.db.flask_session import db_session
from react_client_side.db.utils import (
    get_role_by_name,
    create_role,
    get_roles,
)

# Import Schemas
from react_client_side.schemas.roles import RoleSchema

# Import models
from react_client_side.models.users import User


@docs.register
@doc(description="Create a new role", security=security_params, tags=["roles"])
@app.route(f"{config.API_V1_STR}/roles/", methods=["POST"])
@use_kwargs({"name": fields.Str(required=True)})
@marshal_with(RoleSchema())
@jwt_required()
def route_roles_post(name=None):
    current_user = get_current_user()
    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    role = get_role_by_name(name, db_session)
    if role:
        return abort(400, f"The role: {name} already exists in the system")
    role = create_role(name, db_session)
    return role


@docs.register
@doc(
    description="Retrieve the role of the user",
    security=security_params,
    tags=["roles"],
)
@app.route(f"{config.API_V1_STR}/roles/", methods=["GET"])
@marshal_with(RoleSchema(many=True))
@jwt_required()
def route_roles_get():
    current_user = get_current_user()  # type: User

    if not current_user:
        abort(400, "Could not authenticate user with provided token")

    return get_roles(db_session)