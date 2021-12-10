# Import installed packages
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec import FlaskApiSpec

# Import app code
from ...main import app
from ...core import config

security_definitions = {
    "bearer": {
        "type": "oauth2",
        "flow": "password",
        "tokenUrl": f"{config.API_V1_STR}/login/access-token",
    }
}

app.config.update(
    {
        "APISPEC_SPEC": APISpec(
            title=config.PROJECT_NAME,
            version="v1",
            plugins=(MarshmallowPlugin(),),
            openapi_version="3.0.2",
            securityDefinitions=security_definitions,
        ),
        "APISPEC_SWAGGER_URL": f"{config.API_V1_STR}/swagger/",
    }
)
docs = FlaskApiSpec(app)

security_params = [{"bearer": []}]