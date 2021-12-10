# Import all the models, so that Base has them before being
# imported by Alembic
from python_final.db.base_class import Base  # noqa: F401
from python_final.models.comments import Comment  # noqa: F401
from python_final.models.posts import Post  # noqa: F401
from python_final.models.profiles import Profile  # noqa: F401
from python_final.models.roles import Role  # noqa: F401
from python_final.models.users import User  # noqa: F401
