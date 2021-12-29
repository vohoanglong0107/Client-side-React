import sqlalchemy
import pytest
from react_client_side.schemas import UserCreate
from react_client_side.db.flask_session import db_session


def test_create_user():
    crud.user.create(db_session, UserCreate(username='test', password='test', location='test', role_id=1))
    with pytest.raises(sqlalchemy.exc.IntegrityError):
        crud.user.create(UserCreate(username='test', password='test', location='test', role_id=1))
    