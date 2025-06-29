"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

export default function ClientFilters() {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <div className="relative">
        <Input placeholder="Search clients..." className="pl-10 w-56" />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
      </div>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by projects" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Has Active Projects</SelectItem>
          <SelectItem value="completed">Completed Projects Only</SelectItem>
          <SelectItem value="none">No Projects</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Contact info" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="email">Has Email</SelectItem>
          <SelectItem value="phone">Has Phone</SelectItem>
          <SelectItem value="both">Has Both</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="default" className="ml-auto">
        <Plus className="mr-2 h-4 w-4" />
        New Client
      </Button>
    </div>
  );
}