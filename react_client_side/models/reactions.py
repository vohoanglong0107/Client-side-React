from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import Integer

from react_client_side.db.base_class import Base


class Role(Base):
    id = Column(Integer, primary_key=True)
    heart_count = Column(Integer, default=0)
    like_count = Column(Integer, default=0)


