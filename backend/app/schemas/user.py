from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    username: str = Field(..., min_length=1)
    email: EmailStr = Field(..., min_length = 6)
    password: str = Field(..., min_length = 3)


class UserLogin(BaseModel):
    username: str = Field(..., min_length = 1)
    password: str = Field(..., min_length = 3)


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str