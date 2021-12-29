# Import installed packages
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from flask_apispec import FlaskApiSpec

# Import app code
from ...main import app
from ...core import config

spec = APISpec(
    title=config.PROJECT_NAME,
    version="1.0.0",
    plugins=(MarshmallowPlugin(),),
    openapi_version="3.0.2",
    # securityDefinitions=security_definitions,
)

spec.components.security_scheme(
    "jwt",
    {
        "type": "http",
        "scheme": "bearer",
        "tokenUrl": f"{config.API_V1_STR}/login/access-token",
        "bearerFormat": "JWT",
    },
)

app.config.update(
    {
        "APISPEC_SPEC": spec,
        "APISPEC_SWAGGER_URL": f"{config.API_V1_STR}/swagger/",
    }
)
docs = FlaskApiSpec(app)

security_params = [{"bearer": []}]
