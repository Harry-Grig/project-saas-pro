"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder, Plus } from "lucide-react";
import { CreateProjectModal } from "./createProjectModal"; // Adjust the import path if needed

export default function ProjectEmptyState() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy submit handler, replace with your actual logic
  const handleCreateProject = (values: any) => {
    // ...create project logic
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Folder className="w-16 h-16 text-neutral-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">You have no projects yet</h2>
      <p className="text-neutral-500 mb-4">Create your first project to get started!</p>
      <Button onClick={() => setIsModalOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Create your first project
      </Button>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
        isLoading={false}
      />
    </div>
  );
}