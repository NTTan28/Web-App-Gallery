import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // 🚨 check rỗng (tránh lỗi 422)
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      console.log("Sending:", { username, password }); // debug

      const res = await axios.post("/auth/login", {
        username: username,
        password: password,
      });

      console.log("Response:", res.data);

      // lưu token
      localStorage.setItem("token", res.data.access_token);

      alert("Đăng nhập thành công!");
      navigate("/gallery");
    } catch (err) {
      console.log("Login error:", err.response?.data);

      // hiển thị lỗi backend nếu có
      if (err.response?.data?.detail) {
        alert(err.response.data.detail);
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Đăng nhập</h2>

        <input
          className="auth-input"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleLogin}>
          Vào Thư Viện
        </button>

        <p className="auth-switch">Chưa có tài khoản?</p>

        <button
          className="auth-btn secondary"
          onClick={() => navigate("/register")}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
}

export default Login;