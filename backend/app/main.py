from fastapi import FastAPI
from app.db.database import engine, Base
from app.api import auth, photo

# 🔥 static files (serve ảnh)
from fastapi.staticfiles import StaticFiles

# 🔥 CORS (cho frontend React gọi API)
from fastapi.middleware.cors import CORSMiddleware


# 🔥 tạo bảng DB
Base.metadata.create_all(bind=engine)

# 🔥 khởi tạo app
app = FastAPI()


# 🔥 CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # thi thì để * cho nhanh
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 🔥 router
app.include_router(auth.router)
app.include_router(photo.router)


# 🔥 test API
@app.get("/")
def read_root():
    return {"message": "Gallery App Backend is running!"}


# 🔥 serve folder uploads (QUAN TRỌNG)
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)