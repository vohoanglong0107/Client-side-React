from marshmallow import Schema, fields


# Shared properties
class PostSchema(Schema):
    id = fields.Int(required=True)
    body = fields.Str(required=True)
    timestamp = fields.DateTime(required=True)
    heart_count = fields.Int(required=True)
    author = fields.Nested("UserSchema", only=("id", "email", "username", "profile"), required=True)
    comments = fields.Nested("CommentSchema", many=True, only=("id", "body", "timestamp", "author"), required=True)
