# INFO

- Name: Nguyễn Huỳnh Nhật Tân
- Student Code: 23650801

### PART 1

Tiến hành Build

- Project FastAPI hoàn chỉnh
- Kết nối DB SQLite
- ORM bằng SQLAlchemy
- Tạo **User + Photo models**
- Chạy được:
  `http://127.0.0.1:8000/docs`

Chưa làm auth, chưa làm API → chỉ setup nền

- pip install fastapi uvicorn sqlalchemy
- run: python -m uvicorn app.main:app --reload
- Port:
  - http://127.0.0.1:8000/
  - http://127.0.0.1:8000/docs#/

### PART 2

Nội Dung

- Register (tạo user)
- Login (trả JWT)
- Hash password
- Xác thực bằng token

Thư Viện:

- pip install python-jose passlib[bcrypt]
- pip install "pydantic[email]"
  Hoặc
- pip install email-validator

##### TEST:

{

- "username": "tan",
- "email": "tan@gmail.com",
- "password": "1234aaaa"
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

---

5. bấm authorize
6. Nhập: Bearer <paste*token_vào*đây>
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

---

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

### PART 4:

Cài đặt:

- Đường dẫn: D:\PTUD\Web-App-Gallery\frontend>

* npx create-react-app . (tạo folder frontend nhưng chưa có src)
* (HOẶC) Nếu chưa có frontend, npx create-react-app gallery-frontend

cài đặt chạy thư viện:

- npm install axios react-router-dom

###### Chạy chương trình

- Vào backend: python -m uvicorn app.main:app --reload
- Vào frontend: npm start

---

### Library, Setup for Exam

1. pip install python-jose passlib[bcrypt]

python.exe -m pip install --upgrade pip

2. pip install "pydantic[email]"

Frontend:

3. npm install axios react-router-dom

- npm install -g npm@11.12.1
- npm install -g npm@11.12.1

CHẠY: 4. pip install uvicorn 5. pip install fastapi 6. pip install sqlalchemy 7. pip install python-multipart

- pip install bcrypt

8. pip uninstall bcrypt -y
9. pip install bcrypt==3.2.2

- python -m uvicorn app.main:app --reload
- npm start
