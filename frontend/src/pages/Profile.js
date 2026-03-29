import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // 👤 Lấy thông tin user
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/auth/me", { headers })
      .then(res => {
        setUser(res.data);
        setEmail(res.data.email);
      })
      .catch(() => alert("Bạn chưa đăng nhập"));
  }, []);

  // 🔑 Đổi mật khẩu
  const changePassword = async () => {
    try {
      await axios.put("http://127.0.0.1:8000/auth/change-password", {
        old_password: oldPassword,
        new_password: newPassword
      }, { headers });

      alert("Đổi mật khẩu thành công!");
    } catch {
      alert("Sai mật khẩu!");
    }
  };

  // 📧 Đổi email
  const updateEmail = async () => {
    try {
      await axios.put("http://127.0.0.1:8000/auth/update-email", {
        email: email
      }, { headers });

      alert("Đổi email thành công!");
    } catch {
      alert("Lỗi cập nhật email");
    }
  };

  return (
    <div>
      <h2>Profile</h2>

      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </>
      )}

      <hr />

      <h3>Đổi mật khẩu</h3>
      <input
        type="password"
        placeholder="Old password"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <button onClick={changePassword}>Đổi mật khẩu</button>

      <hr />

      <h3>Đổi email</h3>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <button onClick={updateEmail}>Cập nhật email</button>
    </div>
  );
}

export default Profile;