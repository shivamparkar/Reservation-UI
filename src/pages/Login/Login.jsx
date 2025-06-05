import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContex";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
                {error && <span>{error.message}</span>}
            </div>
        </div>
    );
};

export default Login;
