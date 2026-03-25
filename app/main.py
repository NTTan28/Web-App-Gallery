from fastapi import FastAPI
from app.db.database import engine, Base
from app.db import models

# Tạo bảng trong database
Base.metadata.create_all(bind=engine)

app = FastAPI()


# Test endpoint
@app.get("/")
def read_root():
    return {"message": "Gallery App Backend is running!"}