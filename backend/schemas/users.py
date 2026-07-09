from pydantic import BaseModel, ConfigDict, field_validator


class UserBase(BaseModel):
    name: str
    email: str
    role: str = "user"


class UserCreate(UserBase):
    password: str

    @field_validator("password")
    @classmethod
    def password_must_fit_bcrypt(cls, password: str) -> str:
        if len(password.encode("utf-8")) > 72:
            raise ValueError("Password cannot be longer than 72 bytes")
        return password


class UserResponse(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

class Login_User(BaseModel):
    email: str
    password: str
