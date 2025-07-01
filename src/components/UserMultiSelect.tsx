// components/UserMultiSelect.tsx
"use client";

import * as React from "react";
import { X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
// import useUsers from "@/hooks/useUsers"; // Φέρτε τους users από το backend

// Παράδειγμα τύπου για User (πρέπει να αντιστοιχεί στο backend model σας)
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserMultiSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export function UserMultiSelect({ value, onChange, disabled }: UserMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  // const { data: users, isLoading, error } = useUsers(); // Χρησιμοποιήστε το hook σας
  // Mock data για παράδειγμα
  const users: User[] = [
    { id: "user1", name: "John Doe", email: "john@example.com" },
    { id: "user2", name: "Jane Smith", email: "jane@example.com" },
    { id: "user3", name: "Peter Jones", email: "peter@example.com" },
  ];
  const isLoading = false;
  const error = null;


  if (isLoading) return <p>Φόρτωση χρηστών...</p>;
  if (error) return <p>Σφάλμα φόρτωσης χρηστών: {(error as Error).message}</p>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-[40px]"
            disabled={disabled}
          >
            {value.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {value.map((userId) => {
                  const user = users.find((u) => u.id === userId);
                  return (
                    <Badge key={userId} variant="secondary" className="pr-1">
                      {user?.name || userId}
                      <button
                        type="button"
                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={() => {
                          onChange(value.filter((id) => id !== userId));
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            ) : (
              "Επιλέξτε υπαλλήλους..."
            )}
            <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Αναζήτηση χρηστών..." />
          <CommandList>
            <CommandEmpty>Δεν βρέθηκαν χρήστες.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={() => {
                    onChange(
                      value.includes(user.id)
                        ? value.filter((id) => id !== user.id)
                        : [...value, user.id]
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(user.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}