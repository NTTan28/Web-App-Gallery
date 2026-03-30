import { useEffect, useState } from "react";
import axios from "../api/axios";
import UploadForm from "../components/UploadForm";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const navigate = useNavigate();

  // 🔥 GET ALL PHOTOS
  const fetchPhotos = async () => {
    const res = await axios.get("/photos/");
    setPhotos(res.data);
  };

  // ❤️ LIKE
  const handleLike = async (id) => {
    await axios.post(`/photos/${id}/like`);
    fetchPhotos();
  };

  // ⬇️ DOWNLOAD (FIX CHUẨN)
  const handleDownload = async (imageUrl) => {
    try {
      const res = await axios.get(`/${imageUrl}`, {
        responseType: "blob", // 🔥 bắt buộc
      });

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = imageUrl.split("/").pop();

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Download lỗi:", err);
      alert("Download thất bại!");
    }
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    await axios.delete(`/photos/${id}`);
    alert("Đã xóa ảnh!");
    fetchPhotos();
  };

  // 🔍 SEARCH
  const handleSearch = async () => {
    const res = await axios.get(`/photos/search/?title=${search}`);
    setPhotos(res.data);
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✏️ EDIT
  const handleEdit = async () => {
    try {
      await axios.put(`/photos/${selectedPhoto.id}`, {
        title: editData.title || "",
        description: editData.description || "",
      });

      setSelectedPhoto(null);
      fetchPhotos();
    } catch (err) {
      console.log("Lỗi update:", err.response?.data);
      alert("Cập nhật thất bại!");
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div className="gallery-container">

      {/* 🔥 HEADER */}
      <div
        className="gallery-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Thư viện ảnh</h2>

        <div>
          <button
            onClick={() => navigate("/profile")}
            style={{ marginRight: 10 }}
          >
            Profile
          </button>

          <button onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>

      {/* 📤 UPLOAD */}
      <UploadForm refresh={fetchPhotos} />

      {/* 🔍 SEARCH */}
      <div className="search-bar">
        <input
          placeholder="Tìm ảnh..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Tìm kiếm</button>
      </div>

      {/* 🖼️ GALLERY */}
      <div className="gallery-grid">
        {photos.map((p) => (
          <div key={p.id} className="photo-card">
            <img
              src={`http://127.0.0.1:8000/${p.image_url}`}
              alt=""
              onClick={() => {
                setSelectedPhoto(p);
                setEditData({
                  title: p.title || "",
                  description: p.description || "",
                });
              }}
            />

            <h4>{p.title}</h4>
            <p>{p.description}</p>

            {/* ❤️ LIKE */}
            <p>❤️ {p.likes || 0}</p>

            <button onClick={() => handleLike(p.id)}>
              ❤️ Like
            </button>

            {/* ⬇️ DOWNLOAD */}
            <button onClick={() => handleDownload(p.image_url)}>
              ⬇️ Download
            </button>

            {/* ❌ DELETE */}
            <button
              onClick={() => {
                if (window.confirm(`Bạn có chắc muốn xóa ảnh "${p.title}"?`)) {
                  handleDelete(p.id);
                }
              }}
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      {/* 🧊 MODAL */}
      {selectedPhoto && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={`http://127.0.0.1:8000/${selectedPhoto.image_url}`}
              alt=""
            />

            <input
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <textarea
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />

            <button onClick={handleEdit}>Lưu</button>
            <button onClick={() => setSelectedPhoto(null)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;