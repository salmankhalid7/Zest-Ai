import React from "react";

const Footer = ({ variant = "saas" }) => {
  return (
    <footer className="w-full border-t border-green-100 bg-white">

      {/* ================= MINIMAL FOOTER ================= */}
      {variant === "minimal" && (
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Zest AI · Built for smarter learning
        </div>
      )}

      {/* ================= APP FOOTER (DASHBOARD) ================= */}
      {variant === "app" && (
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">

          <p className="text-gray-500">
            Zest AI v1.0 · AI Learning Platform
          </p>

          <div className="flex gap-4 text-gray-600">
            <a href="#" className="hover:text-green-600">Help</a>
            <a href="#" className="hover:text-green-600">Settings</a>
            <a href="#" className="hover:text-green-600">Logout</a>
          </div>

        </div>
      )}

      {/* ================= SAAS FOOTER (LANDING PAGE) ================= */}
      {variant === "saas" && (
        <div className="max-w-6xl mx-auto px-6 py-12">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* BRAND */}
            <div>
              <h2 className="text-green-700 font-bold text-lg mb-3">
                Zest AI
              </h2>
              <p className="text-sm text-gray-600">
                AI-powered learning platform for flashcards, quizzes, and smart study.
              </p>
            </div>

            {/* PRODUCT */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a className="hover:text-green-600">Features</a></li>
                <li><a className="hover:text-green-600">How it works</a></li>
                <li><a className="hover:text-green-600">Pricing</a></li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a className="hover:text-green-600">About</a></li>
                <li><a className="hover:text-green-600">Contact</a></li>
                <li><a className="hover:text-green-600">Careers</a></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a className="hover:text-green-600">Privacy</a></li>
                <li><a className="hover:text-green-600">Terms</a></li>
              </ul>
            </div>

          </div>

          {/* BOTTOM LINE */}
          <div className="mt-10 border-t border-green-100 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Zest AI. All rights reserved.
          </div>

        </div>
      )}

    </footer>
  );
};

export default Footer;