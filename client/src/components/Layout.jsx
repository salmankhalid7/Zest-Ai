import React from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  // Helper function to style active vs inactive links using the green theme
  const getLinkClass = (path) => {
    const baseClass = "px-3 py-2 text-[15px] rounded-lg transition-all duration-200 font-medium";
    const isActive = location.pathname === path;

    return isActive
      ? `${baseClass} bg-green-100 text-green-800 font-semibold`
      : `${baseClass} text-gray-600 hover:bg-green-50 hover:text-green-700`;
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans bg-gray-50">
      
      {/* SIDEBAR (Light Green & White Theme) */}
      <aside className="w-60 bg-white border-r border-green-100 p-5 flex flex-col shrink-0">
        <div className="mb-[30px] px-3">
          <h2 className="text-2xl font-bold text-green-700 tracking-wider">
            Zest AI
          </h2>
        </div>

        <nav className="flex flex-col gap-3">
          <Link to="/" className={getLinkClass("/")}>Home</Link>
          <Link to="/dashboard" className={getLinkClass("/dashboard")}>Dashboard</Link>
          <Link to="/favorites" className={getLinkClass("/favorites")}>Favorites</Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto bg-green-50/20">
        {children}
      </main>

    </div>
  );
};

export default Layout;