// components/ClientSelect.tsx
"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl }  from '../components/ui/form';
// import useClients from "@/hooks/useClients"; // Φέρτε τους clients από το backend

// Παράδειγμα τύπου για Client (πρέπει να αντιστοιχεί στο backend model σας)
interface Client {
  id: string;
  name: string;
}

interface ClientSelectProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ClientSelect({ value, onChange, disabled }: ClientSelectProps) {
  
  const clients: Client[] = [
    { id: "client1", name: "ACME Corp" },
    { id: "client2", name: "Beta Ltd" },
    { id: "client3", name: "Gamma Innovations" },
  ];
  const isLoading = false;
  const error = null;

  if (isLoading) return <p>Φόρτωση πελατών...</p>;
  if (error) return <p>Σφάλμα φόρτωσης πελατών: {(error as Error).message}</p>;

  return (
    <Select onValueChange={onChange} defaultValue={value} disabled={disabled}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Επιλέξτε πελάτη" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {clients.map((client) => (
          <SelectItem key={client.id} value={client.id}>
            {client.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
  }