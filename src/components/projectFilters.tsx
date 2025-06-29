"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

export default function ProjectFilters() {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div className="relative">
        <Input placeholder="Search projects..." className="pl-10 w-56" />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
      </div>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by client" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Clients</SelectItem>
          <SelectItem value="acme">Acme Corp</SelectItem>
          <SelectItem value="techstart">TechStart Inc</SelectItem>
          <SelectItem value="designco">DesignCo</SelectItem>
          <SelectItem value="noclient">No Client</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
          <SelectItem value="name">Name A-Z</SelectItem>
          <SelectItem value="progress">Progress</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="default" className="ml-auto">
        <Plus className="mr-2 h-4 w-4" />
        New Project
      </Button>
    </div>
  );
}