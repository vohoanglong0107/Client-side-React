from marshmallow import Schema, fields
from .roles import RoleSchema


# Shared properties
class UserSchema(Schema):
    id = fields.Int(required=True)
    email = fields.Email(required=True)
    username = fields.Str(required=True)
    role = fields.Nested(RoleSchema, required=True)
    number_of_followers = fields.Int(required=False)
    number_of_following = fields.Int(required=False)
