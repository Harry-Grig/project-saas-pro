"use client";

import { Button } from "@/components/ui/button";
import { Home, ListChecks, Settings, Users, Folder } from "lucide-react";
import { useState } from "react";

export default function DashboardSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home, href: "/dashboard" },
    { name: "My Projects", icon: Folder, href: "/projects" },
    { name: "My Tasks", icon: ListChecks, href: "/tasks" },
    { name: "Clients", icon: Users, href: "/clients" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="w-64 h-screen bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-r border-neutral-200 dark:border-neutral-800 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-rose-600">ProjectManager</h1>
      </div>
      
      <nav className="flex-1 px-4 pb-6">
        <div className="space-y-2">
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
                onClick={() => setActiveItem(item.name)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}