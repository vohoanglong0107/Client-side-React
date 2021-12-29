from marshmallow import Schema, fields


# Shared properties
class RoleSchema(Schema):
    id = fields.Integer(required=True)
    name = fields.Str(required=True)
    permissions = fields.Str(required=True)