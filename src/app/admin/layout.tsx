'use client';
import React, { useState } from 'react';
import AdminSidebar from '@/components/adminSidebar';
import AdminNavbar from '@/components/adminNavbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <AdminSidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
        />
        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Navbar */}
          <AdminNavbar setSidebarOpen={setSidebarOpen} />
          {/* Page content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;