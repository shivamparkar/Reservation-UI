import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContex";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // <-- Import Link

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCLick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    try {
      const res = await axios.post(
        "https://reservation-api-production.up.railway.app/api/auth/login",
        credentials
      );
      navigate("/");
      dispatch({ type: "LOGIN_SUCCESS", payload: res?.data });
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response?.data,
      });
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
            fontWeight: "bold",
            color: "#0071c2",
          }}
        >
          Login
        </span>
        <form onSubmit={handleCLick}>
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />

          <button type="submit" className="lButton" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Login"}
          </button>
        </form>
        
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#1078c3", textDecoration: "none", fontWeight: "bold" }}>
            Register
          </Link>
        </div>

        <div className="error">{error && <span>{error.message}</span>}</div>
      </div>
    </div>
  );
};

export default Login;
