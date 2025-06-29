"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail, Phone, Loader2 } from "lucide-react";
import { getClientDetails } from "@/actions/clients";
import ClientModal from "./clientModal";
import { Client, Project, User, Task, ProjectStatus } from "@/generated/prisma";

// Typing
type ClientWithIncludes = Client & {
  projects: (Project & {
    owner: User | null;
    tasks: Task[];
  })[];
};

type ClientDetails = Client & {
  projects: (Project & {
    owner: User | null;
    tasks: (Task & {
      assignedTo: User | null;
    })[];
  })[];
};

interface ClientTableProps {
  clients: ClientWithIncludes[];
}

export default function ClientTable({ clients }: ClientTableProps) {
  const [selectedClient, setSelectedClient] = useState<ClientDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleViewDetails = async (clientId: string) => {
    setLoading(clientId);
    try {
      const clientDetails = await getClientDetails(clientId);
      setSelectedClient(clientDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching client details:', error);
    } finally {
      setLoading(null);
    }
  };

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

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-neutral-100 dark:bg-neutral-800">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Projects</th>
              <th className="px-4 py-2 text-left">Active Projects</th>
              <th className="px-4 py-2 text-left">Total Tasks</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              const activeProjects = client.projects.filter(p => p.status === ProjectStatus.ACTIVE).length;
              const totalTasks = client.projects.reduce((acc, project) => acc + project.tasks.length, 0);
              
              return (
                <tr 
                  key={client.id} 
                  className="border-b last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <td className="px-4 py-2">
                    <div className="font-medium">{client.name}</div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col gap-1">
                      {client.email && (
                        <div className="flex items-center gap-1 text-xs text-neutral-600">
                          <Mail className="w-3 h-3" />
                          {client.email}
                        </div>
                      )}
                      {client.phone && (
                        <div className="flex items-center gap-1 text-xs text-neutral-600">
                          <Phone className="w-3 h-3" />
                          {client.phone}
                        </div>
                      )}
                      {!client.email && !client.phone && (
                        <span className="text-xs text-neutral-400">No contact info</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-medium">{client.projects.length}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-medium text-green-600">{activeProjects}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className="font-medium">{totalTasks}</span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleViewDetails(client.id)}
                      disabled={loading === client.id}
                    >
                      {loading === client.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ClientModal 
        client={selectedClient}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedClient(null);
        }}
      />
    </>
  );
}
