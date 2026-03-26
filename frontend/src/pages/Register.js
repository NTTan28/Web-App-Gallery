import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Register success");
      navigate("/");
    } catch (err) {
      alert("Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;