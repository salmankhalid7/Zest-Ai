import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white font-sans">
      <Navbar/>

      {/* HERO */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">

        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Learn faster with{" "}
          <span className="text-green-600">AI flashcards</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Turn any document into smart flashcards and quizzes. Study smarter, not harder.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">

          <a
            href="http://localhost:5000/auth/google"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium shadow-md transition"
          >
            Get Started Free
          </a>

          <Link
            to="/login"
            className="px-6 py-3 border border-green-200 text-green-700 rounded-xl font-medium hover:bg-green-50 transition"
          >
            Login
          </Link>

        </div>

      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">

        {[
          {
            title: "AI Flashcards",
            desc: "Auto-generate structured flashcards from PDFs.",
          },
          {
            title: "Smart Quizzes",
            desc: "Test yourself with AI-generated questions.",
          },
          {
            title: "Save & Review",
            desc: "Bookmark important cards for revision.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-green-100 bg-white hover:shadow-md transition"
          >
            <h3 className="font-semibold text-green-700 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">
              {item.desc}
            </p>
          </div>
        ))}

      </section>

      {/* AUTH CARD */}
      <section className="max-w-md mx-auto px-6 py-10">

        <div className="bg-white border border-green-100 rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Start Learning
          </h2>

          {/* GOOGLE */}
          <a
            href="http://localhost:5000/auth/google"
            className="w-full flex items-center justify-center gap-3 px-4 py-3 mb-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-700"
          >
            Continue with Google
          </a>

          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-3 text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* EMAIL */}
          <Link
            to="/login"
            className="w-full block text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
          >
            Continue with Email
          </Link>

          {/* SIGNUP */}
          <p className="text-center text-sm text-gray-500 mt-5">
            New here?{" "}
            <Link to="/signup" className="text-green-600 font-medium">
              Create account
            </Link>
          </p>

        </div>

      </section>
      <Footer/>
    </div>
  );
};

export default Home;