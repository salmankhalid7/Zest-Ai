import React from "react";
import { Link } from "react-router-dom";
import google from "../assets/images/google.png";
import login from "../assets/images/login.svg";

const Login = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col justify-between">
      {/* MAIN CONTAINER LAYER */}
      <div className="w-full flex flex-col">
        {/* MINIMAL NAVBAR */}
        <div className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-gray-900"
          >
            Zest AI
          </Link>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-black transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-black transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-black transition">
              Contact
            </Link>
          </div>
        </div>

        {/* CONTAINER WITH THE NEW CONTAINER BORDER APPLIED */}
        <div className="max-w-5xl mx-auto my-12 p-8 sm:p-12 border border-gray-100 rounded-3xl shadow-xl shadow-black/[0.01] bg-white w-full">
          {/* MAIN BODY VIEWPORT CONTENT */}
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* LEFT - COMPONENT AUTHENTICATION FORM */}
            <div className="max-w-md w-full mx-auto lg:mx-0">
              {/* HEADER */}
              <h1 className="text-3xl font-bold tracking-tight mb-3 text-gray-900">
                Welcome to Zest Ai
              </h1>

              <p className="text-gray-500 mb-8 text-sm sm:text-base">
                Sign in to continue your personalized learning journey with Zest
                AI.
              </p>

              {/* GOOGLE SIGN IN BUTTON */}
              <a
                href="http://localhost:5000/auth/google"
                className="w-full flex items-center justify-center gap-3 bg-black text-white py-3.5 rounded-xl font-medium hover:opacity-90 transition shadow-sm text-sm"
              >
                <img
                  src={google}
                  alt="Google emblem logo"
                  className="w-10 h-10 object-contain shrink-0"
                />
                Continue with Google
              </a>

              {/* CONTENT SPLIT LINE DIVIDER */}
              <div className="flex items-center my-6">
                <div className="flex-1 h-px bg-gray-100"></div>
                <span className="px-3 text-xs text-gray-400 font-medium uppercase tracking-wider">
                  or
                </span>
                <div className="flex-1 h-px bg-gray-100"></div>
              </div>

              {/* EMAIL SIGN IN BUTTON */}
              <Link
                to="/login-email"
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition text-sm text-gray-800"
              >
                <svg
                  className="w-4 h-4 text-gray-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0l-7.5-4.615a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                Continue with Email
              </Link>

              {/* REDIRECT ACTION LINK TO REGISTER ROUTE */}
              <p className="text-sm text-gray-500 mt-6 text-center">
                New here?{" "}
                <Link
                  to="/signup"
                  className="text-black font-semibold hover:underline"
                >
                  Create an account
                </Link>
              </p>

              {/* ENCRYPTED METHOD CONTEXT SECURITY FOOTNOTE */}
              <p className="text-[11px] text-gray-400 mt-6 text-center tracking-wide">
                Secure authentication powered by OAuth & encrypted sessions
              </p>
            </div>

            {/* RIGHT - CORRECTED FULL SIZE ILLUSTRATION COLUMN */}
            <div className="hidden lg:flex justify-center items-center w-full">
              <img
                src={login}
                alt="Zest AI Workspace Login Vector Illustration"
                className="w-full max-w-sm h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MINIMAL FOOTER COMPONENT */}
      <footer className="w-full py-6 text-center border-t border-gray-100 px-6">
        <p className="text-xs text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} Zest AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Login;
