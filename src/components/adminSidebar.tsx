"use client";

import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, Users, CheckSquare, FolderOpen, UserCheck, Settings, X } from "lucide-react";
import Link from "next/link";
import { logOut } from "@/auth/action";
import { useState } from "react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const sidebarItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Tasks", icon: CheckSquare, href: "/admin/tasks" },
    { name: "Projects", icon: FolderOpen, href: "/admin/projects" },
    { name: "Clients", icon: UserCheck, href: "/admin/clients" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 h-screen bg-white/90 backdrop-blur-md border-r border-neutral-200 flex-col fixed lg:relative z-30">
        <div className="p-6">
          <h1 className="text-xl font-bold text-rose-600">AdminPanel</h1>
        </div>
        <nav className="flex-1 px-4 pb-6 flex flex-col">
          <div className="space-y-2 flex-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              return (
                <Button
                  key={item.name}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-12 ${
                    isActive
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "hover:bg-neutral-100"
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleItemClick(item.name)}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
          {/* Logout Button */}
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-12 text-red-600 hover:bg-red-50 hover:text-red-700"
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
        lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-md border-r border-neutral-200 transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h1 className="text-lg font-bold text-rose-600">AdminPanel</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col">
          <div className="space-y-2 flex-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              return (
                <Button
                  key={item.name}
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start text-left h-11 ${
                    isActive
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "hover:bg-neutral-100"
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleItemClick(item.name)}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
          {/* Logout Button */}
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-11 text-red-600 hover:bg-red-50 hover:text-red-700"
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