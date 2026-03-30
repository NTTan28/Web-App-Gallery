import os
import uuid
from fastapi import UploadFile

UPLOAD_DIR = "uploads"


def save_file(file: UploadFile):
    # 🔥 tạo folder nếu chưa có
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)

    # 🔥 tạo tên file unique
    ext = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"

    file_path = os.path.join(UPLOAD_DIR, filename)

    # 🔥 lưu file
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    # 🔥 QUAN TRỌNG NHẤT (FIX DOWNLOAD)
    return f"uploads/{filename}"


def delete_file(file_path: str):
    if os.path.exists(file_path):
        os.remove(file_path)