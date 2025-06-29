// components/projectModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Building, Clock, CheckCircle, AlertTriangle, Users } from "lucide-react";
import { Project, Client, User as PrismaUser, ProjectStatus, Task, TaskStatus } from "@/generated/prisma";

// Proper typing
type ProjectDetails = Project & {
  client: Client | null;
  owner: PrismaUser | null;
  assignedTo: PrismaUser[];
  tasks: (Task & {
    assignedTo: PrismaUser | null;
  })[];
};

interface ProjectModalProps {
  project: ProjectDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  // Helper functions με σωστά colors
  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.COMPLETED:
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            Completed
          </Badge>
        );
      case ProjectStatus.PENDING:
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
            Pending
          </Badge>
        );
      case ProjectStatus.ACTIVE:
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            Active
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Calculate task statistics
  const taskStats = {
    total: project.tasks.length,
    completed: project.tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
    inProgress: project.tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
    pending: project.tasks.filter(t => t.status === TaskStatus.PENDING).length,
    overdue: project.tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== TaskStatus.COMPLETED
    ).length
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {project.title}
            {getStatusBadge(project.status)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {project.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
          )}

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {project.client && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-neutral-500" />
                  <span className="font-medium">Client:</span>
                  <div className="text-sm">
                    <div>{project.client.name}</div>
                    {project.client.email && (
                      <div className="text-neutral-500">{project.client.email}</div>
                    )}
                  </div>
                </div>
              )}

              {project.owner && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-500" />
                  <span className="font-medium">Owner:</span>
                  <span className="text-sm">{project.owner.name}</span>
                </div>
              )}

              {project.assignedTo.length > 0 && (
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-neutral-500 mt-0.5" />
                  <span className="font-medium">Assigned to:</span>
                  <div className="text-sm">
                    {project.assignedTo.map((user, index) => (
                      <span key={user.id}>
                        {user.name}
                        {index < project.assignedTo.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <span className="font-medium">Created:</span>
                <span className="text-sm">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span className="font-medium">Last Updated:</span>
                <span className="text-sm">{new Date(project.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Task Statistics */}
          {taskStats.total > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-4">Task Statistics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
                    <div className="text-sm text-blue-600">Total Tasks</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
                    <div className="text-sm text-green-600">Completed</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{taskStats.pending}</div>
                    <div className="text-sm text-yellow-600">Pending</div>
                  </div>
                  {taskStats.overdue > 0 && (
                    <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{taskStats.overdue}</div>
                      <div className="text-sm text-red-600">Overdue</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Recent Tasks */}
          {project.tasks.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-4">Recent Tasks ({project.tasks.length})</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {project.tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800 rounded">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{task.title}</div>
                        {task.assignedTo && (
                          <div className="text-xs text-neutral-500">
                            Assigned to: {task.assignedTo.name}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.COMPLETED && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                        {task.status === TaskStatus.COMPLETED && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                        <Badge variant="outline" className="text-xs">
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {project.tasks.length > 5 && (
                    <div className="text-center text-sm text-neutral-500 py-2">
                      ... and {project.tasks.length - 5} more tasks
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}