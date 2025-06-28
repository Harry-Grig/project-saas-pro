"use client";

import { useState } from "react";
import DashboardNavbar from "@/components/dashboardNavbar";
import DashboardSidebar from "@/components/dashboardSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-300 dark:from-neutral-900 dark:to-neutral-800 transition-colors duration-700">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <DashboardSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />    

      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Navbar */}
        <DashboardNavbar 
          setSidebarOpen={setSidebarOpen}
        />
        
        {/* Main dashboard content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}