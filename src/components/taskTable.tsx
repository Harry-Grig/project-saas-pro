// components/taskTable.tsx
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, CheckCircle, Loader2 } from "lucide-react";
import { getTaskDetails, updateTaskStatus } from "@/actions/tasks";
import TaskModal from "./taskModal";
import { Task, Project, Client, User, TaskStatus, Priority } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Προσθήκη toast notifications

// Proper typing
type TaskWithIncludes = Task & {
  project: Project & {
    client: Client | null;
  };
  assignedTo: User | null;
};

type TaskDetails = Task & {
  project: Project & {
    client: Client | null;
    owner: User | null;
  };
  assignedTo: User | null;
};

interface TaskTableProps {
  tasks: TaskWithIncludes[];
}

export default function TaskTable({ tasks }: TaskTableProps) {
  const [selectedTask, setSelectedTask] = useState<TaskDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleViewDetails = async (taskId: string) => {
    setLoading(taskId);
    try {
      const taskDetails = await getTaskDetails(taskId);
      setSelectedTask(taskDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching task details:', error);
      toast.error('Failed to load task details');
    } finally {
      setLoading(null);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    startTransition(async () => {
      try {
        await updateTaskStatus(taskId, newStatus);
        router.refresh(); // Better than window.location.reload()
        toast.success('Task status updated successfully');
      } catch (error) {
        console.error('Error updating task status:', error);
        toast.error('Failed to update task status');
      }
    });
  };

  // Helper functions με fixed colors
  const getStatusBadgeClass = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case TaskStatus.PENDING:
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case TaskStatus.IN_PROGRESS:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getPriorityBadgeClass = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      case Priority.NORMAL:
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case Priority.LOW:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const statusBadge = (status: TaskStatus) => (
    <Badge className={getStatusBadgeClass(status)}>
      {status.replace('_', ' ')}
    </Badge>
  );

  const priorityBadge = (priority: Priority) => (
    <Badge className={getPriorityBadgeClass(priority)}>
      {priority}
    </Badge>
  );

  const isOverdue = (dueDate: Date | null, status: TaskStatus) => {
    return dueDate && new Date(dueDate) < new Date() && status !== TaskStatus.COMPLETED;
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-neutral-100 dark:bg-neutral-800">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Project</th>
              <th className="px-4 py-2 text-left">Client</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Priority</th>
              <th className="px-4 py-2 text-left">Due Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr 
                key={task.id} 
                className={`border-b last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors ${
                  isOverdue(task.dueDate, task.status) ? 'bg-red-50 dark:bg-red-950/10' : ''
                }`}
              >
                <td className="px-4 py-2">
                  <div className="font-medium">{task.title}</div>
                  {task.description && (
                    <div className="text-xs text-neutral-500 truncate max-w-48">
                      {task.description}
                    </div>
                  )}
                </td>
                <td className="px-4 py-2">{task.project.title}</td>
                <td className="px-4 py-2">{task.project.client?.name || 'No Client'}</td>
                <td className="px-4 py-2">{statusBadge(task.status)}</td>
                <td className="px-4 py-2">{priorityBadge(task.priority)}</td>
                <td className="px-4 py-2">
                  {task.dueDate ? (
                    <div className={isOverdue(task.dueDate, task.status) ? 'text-red-600 font-medium' : ''}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  ) : (
                    'No due date'
                  )}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleViewDetails(task.id)}
                      disabled={loading === task.id}
                    >
                      {loading === task.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                    
                    {task.status !== TaskStatus.COMPLETED && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(
                          task.id, 
                          task.status === TaskStatus.PENDING ? TaskStatus.IN_PROGRESS : TaskStatus.COMPLETED
                        )}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : task.status === TaskStatus.PENDING ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TaskModal 
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
      />
    </>
  );
}