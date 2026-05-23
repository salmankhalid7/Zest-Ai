import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white font-sans">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[360px] text-center border border-green-100">
        
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Welcome
        </h1>

        <p className="text-gray-500 mb-6 text-sm">
          Sign in to continue your AI workspace
        </p>

        <a
          href="http://localhost:5000/auth/google"
          className="inline-block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow-md"
        >
          Continue with Google
        </a>

        <p className="text-xs text-gray-400 mt-5">
          Secure login powered by Google OAuth
        </p>
      </div>
    </div>
  );
};

export default Login;