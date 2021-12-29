from marshmallow import Schema, fields


class TokenSchema(Schema):
    # Own properties
    access_token = fields.Str()
    token_type = fields.Str()