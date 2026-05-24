import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const productLinks = [
    "Home",
    "Slack App",
    "Verified Experience",
    "LMS Integration",
    "AI Learning Assistant",
    "Blog",
  ];

  const companyLinks = [
    "Careers",
    "Contact",
    "Privacy Policy",
    "Terms & Conditions",
  ];

  const learnWithAiLinks = [
    "Learn Python with AI",
    "Learn JavaScript with AI",
    "Learn Data Science with AI",
    "Learn Machine Learning with AI",
    "Learn Web Development with AI",
  ];

  const personalizedLearningLinks = [
    "Personalized Learning For Spanish",
    "Personalized Learning For Marketing",
    "Personalized Learning For Tech Skills",
    "Personalized Learning For Product Management",
    "Personalized Learning For Business",
  ];

  const verifiedExperienceLinks = [
    "Software Engineering",
    "Data Science",
    "Product Management",
    "Marketing",
    "Business Analytics",
  ];

  // Helper function to create slug from link text for routing (JavaScript version)
  const getSlug = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  };

  return (
    <footer className="bg-white border-t border-gray-100 text-gray-600">
      {/* MAIN FOOTER LINK CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        
        {/* RESPONSIVE GRID: 1 column on mobile, 2 on tablet, 3 on desktop, 5 on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 items-start">
          
          {/* COLUMN 1 — BRAND PROFILE */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Zest AI
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 max-w-md">
                An AI-powered personalized learning platform with adaptive technology tailored to your goals.
              </p>
            </div>
          </div>

          {/* COLUMN 2 — PRODUCT */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
              Product
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${getSlug(link)}`}
                    className="text-sm transition-colors duration-150 hover:text-purple-600 block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3 — COMPANY */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${getSlug(link)}`}
                    className="text-sm transition-colors duration-150 hover:text-purple-600 block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4 — LEARN WITH AI */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
              Learn with AI
            </h3>
            <ul className="space-y-2.5">
              {learnWithAiLinks.slice(0, 5).map((link) => (
                <li key={link}>
                  <Link
                    to={`/${getSlug(link)}`}
                    className="text-sm transition-colors duration-150 hover:text-purple-600 block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5 — VERIFIED EXPERIENCE */}
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-3">
              Verified Experience
            </h3>
            <ul className="space-y-2.5">
              {verifiedExperienceLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${getSlug(link)}`}
                    className="text-sm transition-colors duration-150 hover:text-purple-600 block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* COPYRIGHT CLOSURE LINE — RESPONSIVE */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-400 text-center sm:text-left">
              © 2026 Zest AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-xs text-gray-400 hover:text-purple-600 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-xs text-gray-400 hover:text-purple-600 transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-xs text-gray-400 hover:text-purple-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;