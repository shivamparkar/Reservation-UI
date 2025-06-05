import React, { useState } from "react";
import "./login.css"; // reuse same styles as Login
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    setError(null);
    try {
      await axios.post("https://reservation-api-production.up.railway.app/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <span
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0",
          }}
        >
          Register
        </span>
        <form onSubmit={handleSubmit}>
          <input type="text" id="username" placeholder="Username" className="lInput" onChange={handleChange} required />
          <input type="email" id="email" placeholder="Email" className="lInput" onChange={handleChange} required />
          <input type="password" id="password" placeholder="Password" className="lInput" onChange={handleChange} required />
          <input type="text" id="phone" placeholder="Phone" className="lInput" onChange={handleChange} required />
          <input type="text" id="city" placeholder="City" className="lInput" onChange={handleChange} required />
          <input type="text" id="country" placeholder="Country" className="lInput" onChange={handleChange} required />

          <button type="submit" className="lButton">Register</button>
        </form>
        <div className="error">{error && <span>{error}</span>}</div>
      </div>
    </div>
  );
};

export default Register;
