// components/taskModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Building, Clock } from "lucide-react";
import { Task, Project, Client, User as PrismaUser, TaskStatus, Priority } from "@/generated/prisma";

// Proper typing
type TaskDetails = Task & {
  project: Project & {
    client: Client | null;
    owner: PrismaUser | null;
  };
  assignedTo: PrismaUser | null;
};

interface TaskModalProps {
  task: TaskDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  if (!task) return null;

  // Helper functions με σωστά colors
  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            Completed
          </Badge>
        );
      case TaskStatus.PENDING:
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
            Pending
          </Badge>
        );
      case TaskStatus.IN_PROGRESS:
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            In Progress
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return (
          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
            High
          </Badge>
        );
      case Priority.NORMAL:
        return (
          <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            Normal
          </Badge>
        );
      case Priority.LOW:
        return (
          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Low
          </Badge>
        );
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const isOverdue = (dueDate: Date | null, status: TaskStatus) => {
    return dueDate && new Date(dueDate) < new Date() && status !== TaskStatus.COMPLETED;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {task.title}
            {isOverdue(task.dueDate, task.status) && (
              <Badge className="bg-red-100 text-red-700 text-xs">
                Overdue
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {task.description && (
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          )}

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-neutral-500" />
                <span className="font-medium">Project:</span>
                <span className="text-sm">{task.project.title}</span>
              </div>
              
              {task.project.client && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-500" />
                  <span className="font-medium">Client:</span>
                  <span className="text-sm">{task.project.client.name}</span>
                </div>
              )}

              {task.assignedTo && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-500" />
                  <span className="font-medium">Assigned to:</span>
                  <span className="text-sm">{task.assignedTo.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                {getStatusBadge(task.status)}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">Priority:</span>
                {getPriorityBadge(task.priority)}
              </div>
              
              {task.dueDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-500" />
                  <span className="font-medium">Due Date:</span>
                  <span className={`text-sm ${
                    isOverdue(task.dueDate, task.status) ? 'text-red-600 font-medium' : ''
                  }`}>
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-500" />
                <span className="font-medium">Created:</span>
                <span className="text-sm">{new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {task.project.owner && (
            <>
              <Separator />
              <div className="text-sm text-neutral-500">
                <span className="font-medium">Project Owner:</span> {task.project.owner.name}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}