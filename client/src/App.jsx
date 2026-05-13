import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthSuccess from "../src/Pages/AuthSuccess";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import ProtectedRoute from "../src/components/ProtectedRoute";
import Home from "./Pages/Home";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Auth success callback */}
        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;