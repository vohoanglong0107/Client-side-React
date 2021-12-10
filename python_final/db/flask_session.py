from flask_sqlalchemy import SQLAlchemy

from python_final.main import app
from python_final.core import config
from python_final.db.base import Base

app.config["SQLALCHEMY_DATABASE_URI"] = config.SQLALCHEMY_DATABASE_URI
db = SQLAlchemy(app, model_class=Base)
db_session = db.session