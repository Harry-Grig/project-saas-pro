"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface Task {
  title: string;
  project: string;
  status: string;
  priority: string;
  due: string;
}

interface TaskTableProps {
  tasks: Task[];
}

export default function TaskTable({ tasks }: TaskTableProps) {
  // Helper for status badge
  const statusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-700">In Progress</Badge>;
      case "Overdue":
        return <Badge className="bg-red-100 text-red-700">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper for priority badge
  const priorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge className="bg-red-100 text-red-700">High</Badge>;
      case "Normal":
        return <Badge className="bg-blue-100 text-blue-700">Normal</Badge>;
      case "Low":
        return <Badge className="bg-neutral-200 text-neutral-700">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-neutral-100 dark:bg-neutral-800">
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Project</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Due Date</th>
            <th className="px-4 py-2 text-left">See Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="px-4 py-2">{task.title}</td>
              <td className="px-4 py-2">{task.project}</td>
              <td className="px-4 py-2">{statusBadge(task.status)}</td>
              <td className="px-4 py-2">{priorityBadge(task.priority)}</td>
              <td className="px-4 py-2">{task.due}</td>
              <td className="px-4 py-2 flex gap-2">
                <Button size="icon" variant="ghost">
                  <Eye className="w-4 h-4" />
                </Button>
                {/* Add status dropdown/toggle here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}