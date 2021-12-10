from marshmallow import Schema, fields


# Shared properties
class CommentSchema(Schema):
    body = fields.Str(required=True)
    timestamp = fields.DateTime(required=True)
    author = fields.Nested("UserSchema", only=("id", "username"), required=True)