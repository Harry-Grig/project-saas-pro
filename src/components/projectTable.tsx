// components/projectTable.tsx
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, CheckCircle, Loader2, Users } from "lucide-react";
import { getProjectDetails, updateProjectStatus } from "@/actions/projects";
import ProjectModal from "./projectModal";
import { Project, Client, User, ProjectStatus, Task } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Proper typing
type ProjectWithIncludes = Project & {
  client: Client | null;
  owner: User | null;
  assignedTo: User[];
  tasks: {
    id: string;
    status: import("@/generated/prisma").TaskStatus;
  }[];
};

type ProjectDetails = Project & {
  client: Client | null;
  owner: User | null;
  assignedTo: User[];
  tasks: (Task & {
    assignedTo: User | null;
  })[];
};

interface ProjectTableProps {
  projects: ProjectWithIncludes[];
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleViewDetails = async (projectId: string) => {
    setLoading(projectId);
    try {
      const projectDetails = await getProjectDetails(projectId);
      setSelectedProject(projectDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching project details:', error);
      toast.error('Failed to load project details');
    } finally {
      setLoading(null);
    }
  };

  const handleStatusChange = async (projectId: string, newStatus: ProjectStatus) => {
    startTransition(async () => {
      try {
        await updateProjectStatus(projectId, newStatus);
        router.refresh();
        toast.success('Project status updated successfully');
      } catch (error) {
        console.error('Error updating project status:', error);
        toast.error('Failed to update project status');
      }
    });
  };

  // Helper functions με fixed colors
  const getStatusBadgeClass = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.COMPLETED:
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case ProjectStatus.PENDING:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case ProjectStatus.ACTIVE:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const statusBadge = (status: ProjectStatus) => (
    <Badge className={getStatusBadgeClass(status)}>
      {status.replace('_', ' ')}
    </Badge>
  );

  // Calculate task completion percentage
  const getTaskProgress = (tasks: { id: string; status: import("@/generated/prisma").TaskStatus }[]) => {
    if (tasks.length === 0) return { completed: 0, total: 0, percentage: 0 };
    
    const completed = tasks.filter(t => t.status === 'COMPLETED').length;
    const total = tasks.length;
    const percentage = Math.round((completed / total) * 100);
    
    return { completed, total, percentage };
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-neutral-100 dark:bg-neutral-800">
              <th className="px-4 py-2 text-left">Project</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Owner</th>
              <th className="px-4 py-2 text-left">Team</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Progress</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const taskProgress = getTaskProgress(project.tasks);
              
              return (
                <tr 
                  key={project.id} 
                  className="border-b last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <td className="px-4 py-2">
                    <div className="font-medium">{project.title}</div>
                    {project.description && (
                      <div className="text-xs text-neutral-500 truncate max-w-48">
                        {project.description}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {project.client ? (
                      <div>
                        <div className="font-medium">{project.client.name}</div>
                        {project.client.email && (
                          <div className="text-xs text-neutral-500">{project.client.email}</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-neutral-400">No Client</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {project.owner ? project.owner.name : 'No Owner'}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-neutral-500" />
                      <span>{project.assignedTo.length}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">{statusBadge(project.status)}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${taskProgress.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-neutral-500">
                        {taskProgress.completed}/{taskProgress.total}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleViewDetails(project.id)}
                        disabled={loading === project.id}
                      >
                        {loading === project.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      
                      {project.status !== ProjectStatus.COMPLETED && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStatusChange(
                            project.id, 
                            project.status === ProjectStatus.PENDING ? ProjectStatus.ACTIVE : ProjectStatus.COMPLETED
                          )}
                          disabled={isPending}
                        >
                          {isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </>
  );
}