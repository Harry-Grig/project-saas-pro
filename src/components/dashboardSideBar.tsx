"use client";

import { logOut } from "@/auth/action";
import { Button } from "@/components/ui/button";
import { Home, ListChecks, Settings, Users, Folder, X, LogOut } from "lucide-react";
import { useState } from "react";

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardSidebar({ sidebarOpen, setSidebarOpen }: DashboardSidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "My Projects", icon: Folder, href: "/projects" },
    { name: "My Tasks", icon: ListChecks, href: "/tasks" },
    { name: "Clients", icon: Users, href: "/clients" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

 

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 h-screen bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-r border-neutral-200 dark:border-neutral-800 flex-col fixed lg:relative z-30">
        <div className="p-6">
          <h1 className="text-xl font-bold text-rose-600">ProjectManager</h1>
        </div>
        
        <nav className="flex-1 px-4 pb-6 flex flex-col">
          <div className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-12 ${
                    isActive 
                      ? "bg-rose-600 text-white hover:bg-rose-700" 
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                  onClick={() => handleItemClick(item.name)}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Button>
              );
            })}
          </div>
          
          {/* Logout Button */}
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-12 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/20 dark:hover:text-red-300"
              onClick={logOut}
            >
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">Log Out</span>
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-r border-neutral-200 dark:border-neutral-800 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <h1 className="text-lg font-bold text-rose-600">ProjectManager</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <nav className="flex-1 px-4 py-6 flex flex-col">
          <div className="space-y-2 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-11 ${
                    isActive 
                      ? "bg-rose-600 text-white hover:bg-rose-700" 
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                  onClick={() => handleItemClick(item.name)}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Button>
              );
            })}
          </div>
          
          {/* Logout Button */}
          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-11 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/20 dark:hover:text-red-300"
              onClick={logOut}
            >
              <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">Log Out</span>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}