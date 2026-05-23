import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pdfjs } from "react-pdf";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import AuthSuccess from "./Pages/AuthSuccess";
import Flashcards from "./Pages/Flashcards";
import Quiz from "./Pages/Quiz";
import Favorites from "./Pages/Favorites";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// PDF worker setup
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const App = () => {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* ================= PROTECTED ROUTES ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/flashcards/:id"
          element={
            <ProtectedRoute>
              <Flashcards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz/:id"
          element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;