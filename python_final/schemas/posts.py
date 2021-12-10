from marshmallow import Schema, fields


# Shared properties
class PostSchema(Schema):
    body = fields.Str(required=True)
    author = fields.Nested("UserSchema", only=("id", "username"), required=True)
