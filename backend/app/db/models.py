from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    photos = relationship("Photo", back_populates="owner")


class Photo(Base):
    __tablename__ = "photos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    image_url = Column(String)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    likes = Column(Integer, default=0)  # ❤️ THÊM DÒNG NÀY

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="photos")