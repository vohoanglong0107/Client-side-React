from sqlalchemy.orm import backref, relationship
from sqlalchemy.sql.schema import ForeignKey, Column, Table
from sqlalchemy.sql.sqltypes import Integer, String

from python_final.db.base_class import Base


Follow = Table('Follow', Base.metadata,
    Column('follower_id', Integer, ForeignKey('User.id'), primary_key=True),
    Column('following_id', Integer, ForeignKey('User.id'), primary_key=True)
)


class User(Base):
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role_id = Column(Integer, ForeignKey("Role.id"))
    role = relationship("Role")
    profile = relationship("Profile", uselist=False, back_populates="user")
    posts = relationship("Post", back_populates="author")
    comments = relationship("Comment", back_populates="author")
    following = relationship(
        "User",
        secondary=Follow,
        primaryjoin=id == Follow.c.follower_id,
        secondaryjoin=id == Follow.c.following_id,
        backref="followers",
    )
