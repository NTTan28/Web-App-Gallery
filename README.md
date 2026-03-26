## INFO
+ Name: Nguyen Tan Khang
+ Student Code: 23722301



### PART 1

Tiến hành Build
- Project FastAPI hoàn chỉnh
- Kết nối DB SQLite
- ORM bằng SQLAlchemy
- Tạo **User + Photo models**
- Chạy được:
`http://127.0.0.1:8000/docs`

Chưa làm auth, chưa làm API → chỉ setup nền

+ pip install fastapi uvicorn sqlalchemy
+ run: python -m uvicorn app.main:app --reload
+ Port: 
    - http://127.0.0.1:8000/ 
    - http://127.0.0.1:8000/docs#/

### PART 2
Nội Dung
- Register (tạo user)
- Login (trả JWT)
- Hash password
- Xác thực bằng token

Thư Viện:
+ pip install python-jose passlib[bcrypt]
+ pip install "pydantic[email]" 
Hoặc
+ pip install email-validator

##### TEST:
{
+   "username": "khang",
+   "email": "kkk@gmail.com",
+   "password": "kkk123"
}


### PART 3
Nội Dung
- Upload ảnh thật (lưu vào server)
- CRUD Photo:
    - Create (upload)
    - Read (list + detail)
    - Update
    - Delete
- Search theo title
- Bảo vệ API (chỉ user sở hữu mới thao tác được)

##### TEST:
1. Mở POST /auth/login -> nhấn try it ou
2. Nhập tên, gmail, pass -> nhấn excute
3. Kết quả:
    - {
        - "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        - "token_type": "bearer"
    - }
4. Copy access_token
__________________________________________________
5. bấm authorize
6. Nhập: Bearer <paste_token_vào_đây>
7. Nhấn Authorize (phải có chữ Bear + Space + Token) 
8. Upload file ảnh, nếu thành công sẽ hiện
        {
            "id": 1,
            "title": "Ảnh test",
            "description": "Test upload",
            "image_url": "uploads/abc123.jpg",
            "user_id": 1
        }
9. Truy cập: http://127.0.0.1:8000/uploads/abc123.jpg
10. kiểm tra folder uploads sẽ thấy ảnh đã upload lên
_____________________________________________________
11. Gọi GET /photos/ (chỉ users nào uploads ảnh mới thấy)
[
  {
    "id": 1,
    "title": "Ảnh test",
    "user_id": 1
  }
]

12. Gọi: GET /photos/search/?title=Ảnh ---> Trả về ảnh có chữ “Ảnh” trong title
13. Gọi: PUT /photos/{photo_id} (Ví dụ: PUT /photos/1) ---> DB updated, gọi GET thấy dữ liệu mới
14. Gọi: DELETE /photos/1 (Database: record biến mất; Folder: file ảnh bị xóa)


### PART 5:

Cài đặt:
- Đường dẫn: D:\HomeCode\App_Development\Web_App_Gallery\frontend>
+ npx create-react-app . (tạo folder frontend nhưng chưa có src)
+ (HOẶC) Nếu chưa có frontend, npx create-react-app gallery-frontend

Tiếp tục chạy:
+ npm install axios react-router-dom

###### Chạy chương trình
+ Vào backend: python -m uvicorn app.main:app --reload
+ Vào frontend: npm start