"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Building, Mail, Phone, FolderOpen, ListChecks } from "lucide-react";
import { Client, Project, User as PrismaUser, Task, ProjectStatus, TaskStatus } from "@/generated/prisma";

// Proper typing
type ClientDetails = Client & {
  projects: (Project & {
    owner: PrismaUser | null;
    tasks: (Task & {
      assignedTo: PrismaUser | null;
    })[];
  })[];
};

interface ClientModalProps {
  client: ClientDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientModal({ client, isOpen, onClose }: ClientModalProps) {
  if (!client) return null;

  const getProjectStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Active</Badge>;
      case ProjectStatus.PENDING:
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">Pending</Badge>;
      case ProjectStatus.COMPLETED:
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalTasks = client.projects.reduce((acc, project) => acc + project.tasks.length, 0);
  const completedTasks = client.projects.reduce((acc, project) => 
    acc + project.tasks.filter(task => task.status === TaskStatus.COMPLETED).length, 0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Building className="w-6 h-6 text-rose-600" />
            {client.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h4 className="font-medium mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {client.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm">{client.email}</span>
                </div>
              )}
              {client.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm">{client.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <span className="text-sm">Client since {new Date(client.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{client.projects.length}</div>
              <div className="text-sm text-neutral-500">Total Projects</div>
            </div>
            <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {client.projects.filter(p => p.status === ProjectStatus.ACTIVE).length}
              </div>
              <div className="text-sm text-neutral-500">Active Projects</div>
            </div>
            <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{totalTasks}</div>
              <div className="text-sm text-neutral-500">Total Tasks</div>
            </div>
            <div className="text-center p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{completedTasks}</div>
              <div className="text-sm text-neutral-500">Completed Tasks</div>
            </div>
          </div>

          <Separator />

          {/* Projects */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Projects ({client.projects.length})
            </h4>
            <div className="space-y-3">
              {client.projects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-medium">{project.title}</h5>
                      {project.description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                    {getProjectStatusBadge(project.status)}
                  </div>
                  <div className="flex items-center justify-between text-sm text-neutral-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ListChecks className="w-3 h-3" />
                        {project.tasks.length} tasks
                      </div>
                      {project.owner && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {project.owner.name}
                        </div>
                      )}
                    </div>
                    <div>
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
