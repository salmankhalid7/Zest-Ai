import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, location]);

  return (
    <div className="fixed inset-0 bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white border border-green-100 rounded-2xl p-8 max-w-sm w-full text-center shadow-sm flex flex-col items-center">
        
        {/* ANIMATED THEME LOADER */}
        <div className="relative flex items-center justify-center w-16 h-16 mb-5">
          {/* Outer glowing pulsing ring */}
          <div className="absolute inset-0 rounded-full bg-green-400/20 animate-ping opacity-75" />
          {/* Inner loading spinner */}
          <div className="w-12 h-12 border-4 border-green-100 border-t-green-600 rounded-full animate-spin relative z-10" />
        </div>

        {/* TYPOGRAPHY */}
        <h2 className="text-xl font-bold text-gray-800 tracking-tight mb-1.5">
          Securing connection...
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-[240px]">
          Please wait a moment while we set up your Zest AI workspace.
        </p>

      </div>
    </div>
  );
};

export default AuthSuccess;