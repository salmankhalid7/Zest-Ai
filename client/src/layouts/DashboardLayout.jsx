import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";
import DashboardNav from "../components/DashboardNav";

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      
      {/* SIDEBAR */}
      <SideBar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* MAIN CONTENT AREA */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${isSidebarCollapsed ? "md:pl-[76px]" : "md:pl-[260px]"}
        `}
      >
        
        {/* TOP NAVBAR */}
        <DashboardNav />

        {/* PAGE CONTENT */}
        <main className="flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;