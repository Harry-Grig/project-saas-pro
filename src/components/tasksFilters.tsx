"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

export default function TaskFilters() {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div className="relative">
        <Input placeholder="Search tasks..." className="pl-10 w-56" />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
      </div>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="inprogress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="overdue">Overdue</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Projects</SelectItem>
          <SelectItem value="website">Website Redesign</SelectItem>
          <SelectItem value="acme">Acme Onboarding</SelectItem>
          <SelectItem value="api">API Project</SelectItem>
          <SelectItem value="ecommerce">E-commerce</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="default" className="ml-auto">
        <Plus className="mr-2 h-4 w-4" />
        New Task
      </Button>
    </div>
  );
}