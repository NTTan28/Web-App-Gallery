import { useState } from "react";
import axios from "../api/axios";

function UploadForm({ refresh }) {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    // ❌ chưa chọn file
    if (!files || files.length === 0) {
      alert("Chọn ít nhất 1 ảnh!");
      return;
    }

    const formData = new FormData();

    // 🔥 append nhiều file
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("title", title);
    formData.append("description", description);

    try {
      await axios.post("/photos/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 🔥 QUAN TRỌNG
        },
      });

      alert("Upload thành công!");

      // 🔄 reset form
      setFiles([]);
      setTitle("");
      setDescription("");

      refresh(); // reload gallery
    } catch (err) {
      console.log("UPLOAD ERROR:", err.response?.data);
      alert("Upload thất bại!");
    }
  };

  return (
    <div>
      <h3>Upload Photos</h3>

      {/* 🔥 chọn nhiều file */}
      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />

      <br />

      {/* 🔥 preview ảnh */}
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {files &&
          Array.from(files).map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt="preview"
              width="80"
              style={{ borderRadius: 5 }}
            />
          ))}
      </div>

      <br />

      {/* 📌 title */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      {/* 📌 description */}
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />

      <button onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default UploadForm;