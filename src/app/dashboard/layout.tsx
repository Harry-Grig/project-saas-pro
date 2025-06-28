import DashboardNavbar from "@/components/dashboardNavbar";
import DashboardSidebar from "@/components/dashboardSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-300 dark:from-neutral-900 dark:to-neutral-800 transition-colors duration-700">
      {/* Sidebar */}
      <DashboardSidebar />    

      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <DashboardNavbar />
        {/* Main dashboard content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}