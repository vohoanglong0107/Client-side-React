
from marshmallow import Schema, fields


# Shared properties
class ProfileSchema(Schema):
    id = fields.Integer(required=True)
    fullname = fields.String(required=True)
    location = fields.String(required=True)
    about_me = fields.String(required=True)
    member_since = fields.DateTime(required=True)
    last_seen = fields.DateTime(required=True)
    # TODO add avatar
    # avatar_hash = fields.String(required=True)