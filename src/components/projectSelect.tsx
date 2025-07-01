// components/ProjectSelect.tsx
"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";

interface Project {
  id: string;
  name: string;
}

interface ProjectSelectProps {
  value?: string; // The ID of the selected project
  onChange: (value: string) => void;
  // In a real application, projects would be fetched from an API
  // For now, we'll use mock data.
  projects?: Project[];
  placeholder?: string;
}

export function ProjectSelect({ value, onChange, projects = [], placeholder = "Select a project" }: ProjectSelectProps) {
  return (
    <Select onValueChange={onChange} value={value || ""}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {/* Option for no selection (if project is optional) */}
        {/* <SelectItem value="" className="text-muted-foreground">
          {placeholder} (Optional)
        </SelectItem> */}
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
