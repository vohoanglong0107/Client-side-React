from marshmallow import Schema, fields


# Shared properties
class PostSchema(Schema):
    id = fields.Int(required=True)
    body = fields.Str(required=True)
    author = fields.Nested("UserSchema", only=("id", "username"), required=True)
    # TODO: add like and heart
