import { useState } from "react";
import axios from "../api/axios";

function UploadForm({ refresh }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    await axios.post("/photos", formData);
    refresh();
  };

  return (
    <div>
      <h3>Upload Photo</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="description" onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadForm;