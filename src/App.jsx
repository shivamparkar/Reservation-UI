import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/List/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import { AuthContext } from "./context/AuthContex";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter basename="/Reservation-UI/">
      <ToastContainer />
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<List />} />
            <Route path="/hotels/:id" element={<Hotel />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
