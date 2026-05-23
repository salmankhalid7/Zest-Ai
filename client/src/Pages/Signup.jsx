import React from "react";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4 font-sans">

      <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8 border border-green-100">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-green-600 text-center mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 text-sm mb-6">
          Join to access AI-powered quizzes & summaries
        </p>

        {/* FORM */}
        <form className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-400"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-400"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
          >
            Create Account
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Signup;