import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for better visual feedback
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on window resize if screen becomes desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contactus" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 font-sans
          transition-all duration-300 ease-in-out
          ${scrolled 
            ? "bg-white/80 backdrop-blur-md border-b border-black/10 shadow-sm" 
            : "bg-white/40 backdrop-blur-md border-b border-black/20"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            
            {/* LEFT: LOGO */}
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="text-xl sm:text-2xl font-bold tracking-tight text-black hover:opacity-80 transition-opacity"
              >
                Zest AI
              </Link>
            </div>

            {/* CENTER: DESKTOP NAVIGATION LINKS */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-6 lg:space-x-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm lg:text-base font-medium text-black/60 transition-all duration-200 hover:text-black hover:scale-105"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT: ACTIONS (LOGIN & START FREE TRIAL) */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link
                to="/login"
                className="text-sm lg:text-base font-medium text-black/60 transition-all duration-200 hover:text-black hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="text-sm lg:text-base font-semibold text-white bg-black rounded-md px-4 lg:px-5 py-1.5 lg:py-2 transition-all duration-200 hover:opacity-80 hover:scale-105 active:scale-95"
              >
                Start Free Trial
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black focus:outline-none p-2 rounded-md hover:bg-black/5 transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE OVERLAY */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* MOBILE DROPDOWN MENU */}
        <div
          className={`
            md:hidden fixed top-14 sm:top-16 left-0 right-0 z-50
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="bg-white/95 backdrop-blur-md border-b border-black/10 shadow-xl mx-4 rounded-2xl mt-2 overflow-hidden">
            <div className="px-5 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2.5 text-base font-medium text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-all px-3"
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-black/10 my-2"></div>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block py-2.5 text-base font-medium text-black/70 hover:text-black hover:bg-black/5 rounded-lg transition-all px-3"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block text-center text-base font-semibold text-white bg-black rounded-lg py-3 mt-2 transition-all hover:opacity-80 active:scale-98"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-14 sm:h-16" />
    </>
  );
}

export default Navbar;