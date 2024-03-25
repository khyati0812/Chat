import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/Signup/Signup";
import { Home } from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
// import ProtectRoutes from "./ProtectRoutes/ProtectRoutes.js";
function App() {
  const auth = localStorage.getItem("signed_in");
  const sign = localStorage.getItem("user");

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
