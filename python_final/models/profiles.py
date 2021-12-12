from sqlalchemy import func
from sqlalchemy.orm import relationship, backref
from sqlalchemy.sql.schema import ForeignKey, Column
from sqlalchemy.sql.sqltypes import Integer, String, TIMESTAMP

from python_final.db.base_class import Base



class Profile(Base):
    id = Column(Integer, ForeignKey('User.id'), primary_key=True)
    user = relationship('User', back_populates='profile', uselist=False)
    fullname = Column(String, index=True)
    location = Column(String)
    about_me = Column(String, default='')
    member_since = Column(TIMESTAMP, server_default=func.now())
    last_seen = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())