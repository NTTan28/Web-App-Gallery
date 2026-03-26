import { useEffect, useState } from "react";
import axios from "../api/axios";
import UploadForm from "../components/UploadForm";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPhotos = async () => {
    const res = await axios.get("/photos");
    setPhotos(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/photos/${id}`);
    fetchPhotos();
  };

  const handleSearch = async () => {
    const res = await axios.get(`/photos/search/?title=${search}`);
    setPhotos(res.data);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div>
      <h2>Gallery</h2>

      <UploadForm refresh={fetchPhotos} />

      <input placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
      <button onClick={handleSearch}>Search</button>

      {photos.map((p) => (
        <div key={p.id}>
          <h4>{p.title}</h4>
          <img src={`http://127.0.0.1:8000/${p.image_url}`} width="200" />
          <p>{p.description}</p>
          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Gallery;