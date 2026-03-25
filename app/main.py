from fastapi import FastAPI
from app.db.database import engine, Base
from app.api import auth, photo

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(photo.router)


@app.get("/")
def read_root():
    return {"message": "Gallery App Backend is running!"}