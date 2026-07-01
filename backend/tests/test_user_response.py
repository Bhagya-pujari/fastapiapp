from models.users import User
from schemas.users import UserResponse


def test_user_response_model_from_user():
    user = User(
        id=1,
        username="alice",
        email="alice@example.com",
        hashed_password="hashed",
        role="user",
    )

    response = UserResponse.model_validate(user)

    assert response.id == 1
    assert response.username == "alice"
    assert response.email == "alice@example.com"
    assert response.role == "user"
