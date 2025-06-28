"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Moon, Sun, Users, Folder, ListChecks, Settings, Home, ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { useTheme } from "next-themes";


export default function DashboardNavbar () {
    const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold tracking-tight text-rose-600">ProjectManager</span>
          </div>
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Bell className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle dark mode</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setOpen((o) => !o)}>
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Account</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* Dropdown menu for profile/settings/logout can go here */}
          </div>
        </div>
    )
}