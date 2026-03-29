from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    username: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=3)


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


# 👤 Profile
class UserProfile(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True


# 🔑 Change password
class ChangePassword(BaseModel):
    old_password: str
    new_password: str


# 📧 Update email
class UpdateEmail(BaseModel):
    email: EmailStr