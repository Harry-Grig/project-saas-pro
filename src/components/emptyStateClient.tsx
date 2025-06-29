"use client";

import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

export default function EmptyStateClients() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Users className="w-16 h-16 text-neutral-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">You have no clients yet</h2>
      <p className="text-neutral-500 mb-4">Add your first client to get started!</p>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add your first client
      </Button>
    </div>
  )
};