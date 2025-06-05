import React, { useContext } from "react";
import "./navbar.css";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);
 

  const navigate = useNavigate();

  const removeLogin = () => {
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">BOOK Easy</span>
        </Link>

        {user ? (
          <span>
            {user.username}
          </span>
          
        ) : (
          <div className="navItem">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
      <button
        className="lbtn"
        onClick={removeLogin}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
