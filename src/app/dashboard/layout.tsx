'use client';
import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/dashboardNavbar";
import DashboardSidebar from "@/components/dashboardSideBar";
import { User, UserProvider } from "@/contexts/userConext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          credentials: 'include', // importan for cookies
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser({ user: null });
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setUser({ user: null });
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <UserProvider user={user}>
      <div className="flex h-screen bg-gray-100">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <DashboardSidebar 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Navbar */}
          <DashboardNavbar 
            setSidebarOpen={setSidebarOpen} 
          />

          {/* Main dashboard content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </UserProvider>
  );
}