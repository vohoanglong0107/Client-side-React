from sqlalchemy import func
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import ForeignKey, Column
from sqlalchemy.sql.sqltypes import Integer, String, TIMESTAMP

from python_final.db.base_class import Base


class Comment(Base):
    id = Column(Integer, primary_key=True)
    body = Column(String)
    timestamp = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    author_id = Column(Integer, ForeignKey('User.id'))
    author = relationship('User', back_populates='comments')
    post_id = Column(Integer, ForeignKey('Post.id'))
    post = relationship('Post', back_populates='comments')
