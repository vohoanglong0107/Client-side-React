# Import all the models, so that Base has them before being
# imported by Alembic
from react_client_side.db.base_class import Base  # noqa: F401
from react_client_side.models.comments import Comment  # noqa: F401
from react_client_side.models.posts import Post  # noqa: F401
from react_client_side.models.profiles import Profile  # noqa: F401
from react_client_side.models.roles import Role  # noqa: F401
from react_client_side.models.users import User  # noqa: F401
