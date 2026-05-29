import React from "react";

function DashboardNav() {
  return (
    <nav className="w-full h-20 bg-white border-b border-gray-100 px-6 sm:px-8 flex items-center justify-between text-black select-none">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">Workspace</span>
        <span className="text-xs font-bold text-gray-300">/</span>
        <span className="text-xs font-bold text-black tracking-wide bg-gray-50 px-2 py-1 rounded border border-gray-200/60">
          Smart Learning
        </span>
      </div>

      {/* RIGHT SIDE: Compact Profile Layout */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar Profile Initials Bubble */}
          <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-gray-100 shrink-0">
            S
          </div>

          {/* User Text Meta */}
          <div className="hidden xs:block text-left">
            <h2 className="text-xs font-bold tracking-wide text-gray-900 leading-none mb-0.5">
              Salman
            </h2>
            <p className="text-[10px] text-gray-400 font-medium">
              Premium Tier
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav;