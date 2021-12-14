
import typing
from marshmallow import Schema, fields, ValidationError


class BytesField(fields.Field):
    def _serialize(self, value: bytes, attr: str, obj: typing.Any, **kwargs):
        if not isinstance(value, bytes):
            raise ValidationError('Invalid input type.')
        return value.decode('utf-8')
    def _validate(self, value):
        if not isinstance(value, bytes):
            raise ValidationError('Invalid input type.')
        if value is None or value == b'':
            raise ValidationError('Invalid value')


# Shared properties
class ProfileSchema(Schema):
    id = fields.Integer(required=True)
    fullname = fields.String(required=True)
    location = fields.String(required=True)
    about_me = fields.String(required=True)
    member_since = fields.DateTime(required=True)
    last_seen = fields.DateTime(required=True)
    avatar = BytesField()
    content_type = fields.String()