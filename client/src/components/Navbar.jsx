import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
      
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
          <span className="text-lg font-bold text-green-800">
            Zest AI
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">

          <Link to="/" className="hover:text-green-600 transition">
            Home
          </Link>

          <a href="/#features" className="hover:text-green-600 transition">
            Features
          </a>

          <Link to="/dashboard" className="hover:text-green-600 transition">
            Dashboard
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Login
          </Link>

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <span className="text-2xl">✕</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-green-100 px-6 py-4 space-y-4">

          <Link
            to="/"
            className="block text-gray-700 hover:text-green-600"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <a
            href="/#features"
            className="block text-gray-700 hover:text-green-600"
            onClick={() => setOpen(false)}
          >
            Features
          </a>

          <Link
            to="/dashboard"
            className="block text-gray-700 hover:text-green-600"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="block text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>

        </div>
      )}

    </nav>
  );
}

export default Navbar;