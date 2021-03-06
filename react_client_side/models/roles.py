from sqlalchemy.sql.schema import Column
from sqlalchemy.sql.sqltypes import Integer, String

from react_client_side.db.base_class import Base



class Role(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, index=True)
    permission = Column(Integer)


