import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Authentication from "./auth/auth";
import Home from "./home/Home.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter
    future={{
      v7_relativeSplatPath: true,
      v7_startTransition: true,
    }}
  >
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
