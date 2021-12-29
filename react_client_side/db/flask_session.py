from flask_sqlalchemy import SQLAlchemy

from react_client_side.main import app
from react_client_side.core import config
from react_client_side.db.base import Base

app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app, model_class=Base)
db_session = db.session