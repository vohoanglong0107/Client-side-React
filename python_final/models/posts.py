from sqlalchemy import func
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey, Column
from sqlalchemy.sql.sqltypes import Integer, String

from python_final.db.base_class import Base


class Post(Base):
    id = Column(Integer, primary_key=True)
    body = Column(String)
    author_id = Column(Integer, ForeignKey('User.id'))
    author = relationship('User', back_populates='posts')
    comments = relationship('Comment', back_populates='post')
