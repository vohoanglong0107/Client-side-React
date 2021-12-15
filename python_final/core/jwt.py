# Import standard library modules

# Import installed modules
from flask_jwt_extended import JWTManager

# Import app code
from ..main import app
from python_final.db.utils import get_user_by_id
from python_final.db.flask_session import db_session

# Setup the Flask-JWT-Extended extension
jwt = JWTManager(app)


@jwt.user_lookup_loader
def get_current_user(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return get_user_by_id(identity, db_session)