import React, { useState } from "react";
import google from "../assets/images/google.png";

function TrialModal({ isOpen, onClose, isSignUpInitial = true }) {
  const [isSignUp, setIsSignUp] = useState(isSignUpInitial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your form authentication logic here (e.g., hit your /auth/email endpoints)
    console.log("Authenticating:", { email, password, isSignUp });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* BACKDROP BLUR LAYER */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* MODAL WINDOW BOX */}
      <div className="relative w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-black/10 overflow-hidden select-none animate-in fade-in zoom-in-95 duration-200">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition p-1 rounded-full hover:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* COMPONENT INTERIOR CONTENT */}
        <div className="p-6 sm:p-8 space-y-5">
          
          {/* HEADER COPIES */}
          <div className="space-y-1.5 mt-2">
            <span className="text-[10px] font-bold bg-black text-white px-2.5 py-1 rounded-full uppercase tracking-wider inline-block">
              Beta Access Offer
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-xs text-gray-400">
              Get unrestricted access to all automated educational modules.
            </p>
          </div>

          {/* OAUTH PORTAL STRIP */}
          <div className="space-y-3">
            <a
              href="http://localhost:5000/auth/google"
              className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition duration-200 shadow-sm"
            >
              <img
                src={google}
                alt="Google Emblem"
                className="w-5 h-5 object-contain shrink-0"
              />
              {isSignUp ? "Sign up with Google" : "Continue with Google"}
            </a>
          </div>

          {/* CONTENT SPLIT LINE DIVIDER */}
          <div className="flex items-center my-2">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="px-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider">or use credentials</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* EMAIL FORM LAYER */}
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1e293b] font-medium placeholder-gray-400 focus:outline-none focus:border-black transition"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-[#64748b] uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#f8fafc] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1e293b] font-medium placeholder-gray-400 focus:outline-none focus:border-black transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold text-sm py-3 rounded-xl transition duration-200 mt-2 shadow-sm"
            >
              {isSignUp ? "Create Account with Email" : "Sign In with Email"}
            </button>
          </form>

          {/* STATE TOGGLE FOOTER */}
          <p className="text-xs text-gray-500 text-center pt-1">
            {isSignUp ? "Already have an account? " : "New here? "}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black font-semibold hover:underline focus:outline-none"
            >
              {isSignUp ? "Sign In" : "Create an account"}
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}

export default TrialModal;