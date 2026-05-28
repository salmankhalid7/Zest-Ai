import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "../Pages/dashboard/SideBar";
import DashboardNav from "../Pages/dashboard/DashboardNav";

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black flex">

      {/* SIDEBAR (fixed on desktop) */}
      <SideBar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* MAIN AREA */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out
        ${isSidebarCollapsed ? "md:ml-[76px]" : "md:ml-[260px]"}
      `}
      >
        {/* TOP NAV */}
        <div className="hidden md:block">
          <DashboardNav />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;