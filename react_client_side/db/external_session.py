from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from react_client_side.core import config

engine = create_engine(config.SQLALCHEMY_DATABASE_URI, convert_unicode=True, echo=True)
db_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)