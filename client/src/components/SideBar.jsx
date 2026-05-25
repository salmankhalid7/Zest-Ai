import React, { useState } from 'react';
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
  X 
} from 'lucide-react';
import ZestLogo from "../assets/logos/ZestLogo.svg";

const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'AI Chat', icon: MessageSquare },
    { name: 'Documents', icon: FileText },
    { name: 'Flashcards', icon: Layers },
    { name: 'Quizzes', icon: PenTool },
    { name: 'History', icon: History },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
    { name: 'Profile', icon: User },
  ];

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* MOBILE TRIGGER INTERFACE BUTTON */}
      <button 
        onClick={toggleMobile}
        className="md:hidden fixed top-5 left-4 z-50 p-2.5 rounded-xl bg-white border border-gray-200 text-black hover:bg-gray-50 transition-all shadow-sm"
      >
        {isMobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* BACKDROP OVERLAY SHADOW */}
      {isMobileOpen && (
        <div 
          onClick={toggleMobile}
          className="md:hidden fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      {/* FIXED SIDEBAR CORE PANEL */}
      <aside 
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col justify-between select-none z-40
          transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          ${isCollapsed ? 'w-[76px]' : 'w-[260px]'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* DESKTOP TOGGLE ACTION ARROW BUTTON */}
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute top-7 -right-3 w-6 h-6 rounded-full border border-gray-200 bg-white text-gray-400 items-center justify-center hover:text-black hover:border-gray-400 transition-all z-50 shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* BRAND IDENTITY LOGO HEADER (Clear Background Style) */}
        <div className="p-5 flex items-center gap-3 border-b border-gray-100 h-20 overflow-hidden">
          <div className="w-8 h-8 flex items-center justify-center shrink-0">
            <img 
              src={ZestLogo} 
              alt="Zest AI Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className={`transition-all duration-200 ${isCollapsed ? 'opacity-0 pointer-events-none transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
            <h1 className="text-sm font-black text-black tracking-wider whitespace-nowrap">
              ZEST AI
            </h1>
            <p className="text-[10px] text-gray-400 font-bold tracking-wide uppercase whitespace-nowrap">
              Learning Suite
            </p>
          </div>
        </div>

        {/* MAIN APP NAVIGATION LINK ITEMS (With Bold, Prominent Fonts) */}
        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.name);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-sm font-bold tracking-normal transition-all duration-150 group relative
                  ${isActive 
                    ? 'bg-black text-white shadow-sm' 
                    : 'text-gray-500 hover:text-black hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={18} className={`shrink-0 transition-transform duration-150 ${!isActive && 'group-hover:scale-105'}`} />
                
                <span className={`transition-opacity duration-200 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0 pointer-events-none' : 'opacity-100'}`}>
                  {item.name}
                </span>

                {/* HOVER SLIDEOUT FLOATING MINIMALIST TOOLTIP */}
                {isCollapsed && (
                  <div className="absolute left-[70px] invisible group-hover:visible bg-black text-white text-[10px] px-2.5 py-1.5 rounded font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-all uppercase whitespace-nowrap pointer-events-none z-50 shadow-md">
                    {item.name}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* USER PROFILE PANEL FOOTER (Clean Grid, No sliders or custom scroll clips) */}
        <div className="p-3 border-t border-gray-100 bg-white">
          <div className={`flex items-center justify-between rounded-xl p-1.5 transition-all duration-200 ${isCollapsed ? 'gap-0 justify-center bg-transparent border-0' : 'gap-3 bg-gray-50/50 border border-gray-100/60 shadow-none'}`}>
            
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-[11px] shrink-0 shadow-sm">
                S
              </div>

              <div className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                <div className="flex items-center gap-1">
                  <h2 className="text-xs font-bold text-gray-900 truncate max-w-[85px]">
                    Salman
                  </h2>
                  <span className="text-[8px] font-black tracking-widest px-1 py-0.2 rounded bg-gray-200 text-gray-600 scale-90">
                    PRO
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 truncate max-w-[110px]">
                  salman@zest.ai
                </p>
              </div>
            </div>

            <button 
              className={`p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50/50 transition-colors shrink-0 ${isCollapsed ? 'hidden' : 'block'}`}
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>

      </aside>
    </>
  );
};

export default SideBar;