import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read your token instance safely on mount
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  // Soft light green spinner prevents route flashing on refresh
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-green-800 tracking-wide">
          Verifying session...
        </p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;