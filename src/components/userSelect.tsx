// components/UserSelect.tsx
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

interface User {
  id: string;
  name: string;
}

interface UserSelectProps {
  value?: string; // The ID of the selected user
  onChange: (value: string) => void;
  // In a real application, users would be fetched from an API
  // For now, we'll use mock data.
  users?: User[];
  placeholder?: string;
}

export function UserSelect({ value, onChange, users = [], placeholder = "Select an employee" }: UserSelectProps) {
  return (
    <Select onValueChange={onChange} value={value || ""}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {/* Option for no selection */}
        <SelectItem value="" className="text-muted-foreground">
          {placeholder} (Optional)
        </SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
