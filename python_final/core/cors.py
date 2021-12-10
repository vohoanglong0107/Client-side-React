# Import standard library modules
import re

# Import installed packages
from flask_cors import CORS

# Import app code
from python_final.main import app
from python_final.core import config

origins = []

print(config.BACKEND_CORS_ORIGINS)

# Set all CORS enabled origins
if config.BACKEND_CORS_ORIGINS:
    origins_raw = config.BACKEND_CORS_ORIGINS.split(",")
    for origin in origins_raw:
        use_origin = origin.strip()
        origins.append(use_origin)

    CORS(app, origins=origins, supports_credentials=True)