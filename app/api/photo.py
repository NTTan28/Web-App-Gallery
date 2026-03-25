from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List

from app.db.models import Photo
from app.api.deps import get_db, get_current_user
from app.schemas.photo import PhotoResponse
from app.utils.file_handler import save_file, delete_file

router = APIRouter(prefix="/photos", tags=["Photos"])


# A. Upload Photo
@router.post("/", response_model=PhotoResponse)
def upload_photo(
    title: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    file_path = save_file(file)

    photo = Photo(
        title=title,
        description=description,
        image_url=file_path,
        user_id=current_user.id,
    )

    db.add(photo)
    db.commit()
    db.refresh(photo)

    return photo


# B. Get all photos (current user)
@router.get("/", response_model=List[PhotoResponse])
def get_photos(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return db.query(Photo).filter(Photo.user_id == current_user.id).all()


# C. Get photo detail
@router.get("/{photo_id}", response_model=PhotoResponse)
def get_photo(
    photo_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    photo = db.query(Photo).filter(Photo.id == photo_id).first()

    if not photo or photo.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Photo not found")

    return photo


# D. Update photo
@router.put("/{photo_id}")
def update_photo(
    photo_id: int,
    title: str = Form(...),
    description: str = Form(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    photo = db.query(Photo).filter(Photo.id == photo_id).first()

    if not photo or photo.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Photo not found")

    photo.title = title
    photo.description = description

    db.commit()

    return {"message": "Updated successfully"}


# E. Delete photo
@router.delete("/{photo_id}")
def delete_photo(
    photo_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    photo = db.query(Photo).filter(Photo.id == photo_id).first()

    if not photo or photo.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Photo not found")

    # Xóa file
    delete_file(photo.image_url)

    db.delete(photo)
    db.commit()

    return {"message": "Deleted successfully"}


# F. Search photo
@router.get("/search/", response_model=List[PhotoResponse])
def search_photos(
    title: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return db.query(Photo).filter(
        Photo.user_id == current_user.id,
        Photo.title.ilike(f"%{title}%")
    ).all()