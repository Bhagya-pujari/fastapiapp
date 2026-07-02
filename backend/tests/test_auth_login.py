from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import Base
from models.users import User
from routers.auth import login
from schemas.users import Login_User
from utils.security import hash_password


def test_login_uses_email_field():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    SessionLocal = sessionmaker(bind=engine)

    db = SessionLocal()
    db.add(
        User(
            username="abc",
            email="abc@gmail.com",
            hashed_password=hash_password("abc"),
            role="user",
        )
    )
    db.commit()
    db.close()

    db = SessionLocal()
    result = login(Login_User(email="abc@gmail.com", password="abc"), db=db)

    assert result["token_type"] == "Bearer"
    assert isinstance(result["token"], str)

    db.close()
