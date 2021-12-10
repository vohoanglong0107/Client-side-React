# Import standard library packages

# Import installed packages

# Import app code
from python_final.main import app
from python_final.db.flask_session import db_session
from python_final.core import config

# Set up CORS
from . import cors  # noqa

from .jwt import jwt  # noqa
from . import errors  # noqa

from ..api.api_v1 import api as api_v1  # noqa

app.config["SECRET_KEY"] = config.SECRET_KEY


@app.teardown_appcontext
def shutdown_db_session(exception=None):
    db_session.remove()
