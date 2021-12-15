from marshmallow import Schema, fields


# Shared properties
class CommentSchema(Schema):
    id = fields.Integer(required=True)
    body = fields.Str(required=True)
    timestamp = fields.DateTime(required=True)
    author = fields.Nested("UserSchema", only=("id", "email", "username", "profile"), required=True)
