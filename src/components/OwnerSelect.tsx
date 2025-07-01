// components/OwnerSelect.tsx
"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
// import useUsers from "@/hooks/useUsers"; // Φέρτε τους users από το backend

// Παράδειγμα τύπου για User
interface User {
  id: string;
  name: string;
  email: string;
}

interface OwnerSelectProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function OwnerSelect({ value, onChange, disabled }: OwnerSelectProps) {
  // const { data: users, isLoading, error } = useUsers(); // Χρησιμοποιήστε το hook σας, ίσως με φίλτρο για ADMIN users
  // Mock data για παράδειγμα
  const users: User[] = [
    { id: "user1", name: "John Doe", email: "john@example.com" },
    { id: "user2", name: "Jane Smith", email: "jane@example.com" },
    { id: "user3", name: "Peter Jones", email: "peter@example.com" },
  ];
  const isLoading = false;
  const error = null;

  if (isLoading) return <p>Φόρτωση owners...</p>;
  if (error) return <p>Σφάλμα φόρτωσης owners: {(error as Error).message}</p>;

  return (
    <Select onValueChange={onChange} defaultValue={value} disabled={disabled}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Επιλέξτε owner" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}