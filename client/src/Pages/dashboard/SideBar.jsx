import React, { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Layers,
  PenTool,
  History,
  BarChart3,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Bookmark,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import ZestLogo from "../../assets/logos/ZestLogo.svg";

const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "AI Chat", icon: MessageSquare, path: "/dashboard/chat" },
    { name: "Documents", icon: FileText, path: "/dashboard/documents" },
    { name: "Flashcards", icon: Layers, path: "/dashboard/flashcards" },
    { name: "Quizzes", icon: PenTool, path: "/dashboard/quizzes" },
    { name: "Favorites", icon: Bookmark, path: "/favorites" },
    { name: "History", icon: History, path: "/dashboard/history" },
    { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
    { name: "Profile", icon: User, path: "/dashboard/profile" },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const activePath = location.pathname;

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-5 left-4 z-50 p-2.5 rounded-xl bg-white border border-gray-200 shadow-sm"
      >
        {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* BACKDROP */}
      {isMobileOpen && (
        <div
          onClick={toggleMobile}
          className="md:hidden fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col justify-between z-40
        transition-all duration-300
        ${isCollapsed ? "w-[76px]" : "w-[260px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* TOGGLE BUTTON */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute top-7 -right-3 w-6 h-6 rounded-full border bg-white items-center justify-center shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* LOGO */}
        <div className="p-5 flex items-center gap-3 border-b h-20">
          <img src={ZestLogo} alt="logo" className="w-8 h-8" />

          {!isCollapsed && (
            <div>
              <h1 className="text-sm font-black">ZEST AI</h1>
              <p className="text-[10px] text-gray-400">Learning Suite</p>
            </div>
          )}
        </div>

        {/* NAV ITEMS */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path;

            return (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-bold transition
                  ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-500 hover:bg-gray-50 hover:text-black"
                  }
                `}
              >
                <Icon size={18} />

                {!isCollapsed && <span>{item.name}</span>}
              </button>
            );
          })}
        </div>

        {/* USER SECTION */}
        <div className="p-3 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                S
              </div>

              {!isCollapsed && (
                <div>
                  <p className="text-xs font-bold">Salman</p>
                  <p className="text-[10px] text-gray-400">salman@zest.ai</p>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <button className="text-gray-400 hover:text-red-500">
                <LogOut size={14} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;