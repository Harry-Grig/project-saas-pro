"use client";
import { createContext, useContext } from 'react';

export type User = {
  user: {
    userId: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
  } | null;
};

// Ορίζουμε το context με σωστό type
const UserContext = createContext<User | null>(null);

export function UserProvider({ children, user }: { children: React.ReactNode; user: User | null }) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

// Hook για να χρησιμοποιούμε το context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}