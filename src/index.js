import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import App from "./App";
import "./styles.css";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> {/* OPENING PAGE IS LOGIN */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<App />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* fallback */}
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
