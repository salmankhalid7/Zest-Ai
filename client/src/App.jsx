import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pdfjs } from "react-pdf";

// Pages
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./Pages/dashboard/Overview";
import AuthSuccess from "./Pages/AuthSuccess";
import Flashcards from "./Pages/Flashcards";
import Quiz from "./Pages/Quiz";
import Favorites from "./Pages/Favorites";
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import Pricing from "./Pages/Pricing";

import Chat from "./Pages/ChatBox";
import Documents from "./Pages/Documents";
import Analytics from "./Pages/Analytics";
import Profile from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";

// Components
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* DASHBOARD LAYOUT (PROTECTED) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* DEFAULT DASHBOARD PAGE */}
          <Route index element={<Overview />} />

          {/* SIDEBAR ROUTES */}
          <Route path="chat" element={<Chat />} />
          <Route path="documents" element={<Documents />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="quizzes" element={<Quiz />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* OUTSIDE DASHBOARD */}
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