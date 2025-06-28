"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Moon, Sun, Menu, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { useTheme } from "next-themes";

interface DashboardNavbarProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function DashboardNavbar({ setSidebarOpen }: DashboardNavbarProps) {
  const { theme, setTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        {/* Logo - hidden on mobile when sidebar is present */}
        <span className="text-lg lg:text-xl font-bold tracking-tight text-rose-600 hidden lg:block">
          ProjectManager
        </span>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <TooltipProvider>
          {/* Notifications */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 lg:h-10 lg:w-10">
                <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>

          {/* Theme toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 lg:h-10 lg:w-10"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? 
                  <Sun className="w-4 h-4 lg:w-5 lg:h-5" /> : 
                  <Moon className="w-4 h-4 lg:w-5 lg:h-5" />
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle dark mode</TooltipContent>
          </Tooltip>

          {/* User menu */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-9 lg:h-10 px-2 lg:px-3 gap-1 lg:gap-2"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <Avatar className="h-6 w-6 lg:h-8 lg:w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs lg:text-sm">U</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 hidden sm:block" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Account</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}