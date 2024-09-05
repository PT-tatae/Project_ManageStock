// src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // หากมี CSS ที่ต้องใช้

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // ตรวจสอบการ login ที่นี่
    if (username === "1" && password === "1") {
      navigate("/ManageStock"); 
    } else {
      alert("ซื่อหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <>
      
      <div className="login-container">
      <div className="circle "></div>
        <h1 className="text-login">Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h1 className="text-username">Username</h1>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <h1 className="text-password">Password</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
