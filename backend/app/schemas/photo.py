from pydantic import BaseModel
from datetime import datetime


class PhotoResponse(BaseModel):
    id: int
    title: str
    description: str
    image_url: str
    uploaded_at: datetime
    user_id: int

    class Config:
        from_attributes = True