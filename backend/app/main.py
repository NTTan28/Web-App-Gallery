from fastapi import FastAPI
from app.db.database import engine, Base
from app.api import auth, photo
# new
from fastapi.staticfiles import StaticFiles 

# new 2
from fastapi.middleware.cors import CORSMiddleware



Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # cho phép tất cả (đi thi OK)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(photo.router)


@app.get("/")
def read_root():
    return {"message": "Gallery App Backend is running!"}


# new
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")