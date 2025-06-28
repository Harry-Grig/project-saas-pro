import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ListChecks, CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import TaskFilters from "@/components/tasksFilters";
import EmptyState from "@/components/emptyState";
import TaskTable from "@/components/taskTable";

export default function TasksPage() {
  // Dummy data for illustration
  const stats = [
    { label: "Completed", value: 12, color: "green", icon: <CheckCircle className="text-green-600" /> },
    { label: "In Progress", value: 5, color: "blue", icon: <Clock className="text-blue-600" /> },
    { label: "Pending", value: 3, color: "yellow", icon: <AlertTriangle className="text-yellow-500" /> },
    { label: "Overdue", value: 1, color: "red", icon: <XCircle className="text-red-600" /> },
  ];

  const tasks = [
    {
      title: "Design login page",
      project: "Website Redesign",
      status: "In Progress",
      priority: "High",
      due: "2025-07-01",
    },
    {
      title: "Client kickoff call",
      project: "Acme Onboarding",
      status: "Pending",
      priority: "Normal",
      due: "2025-07-03",
    },
    {
      title: "Write documentation",
      project: "API Project",
      status: "Completed",
      priority: "Low",
      due: "2025-06-25",
    },
    {
      title: "Fix payment bug",
      project: "E-commerce",
      status: "Overdue",
      priority: "High",
      due: "2025-06-20",
    },
  ];

  // Empty state
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <ListChecks className="w-7 h-7 text-rose-600" />
          <h1 className="text-3xl font-extrabold tracking-tight">Tasks</h1>
        </div>
        <p className="text-neutral-500 mb-2">View, filter and manage all your tasks</p>
        {/* Breadcrumb (optional) */}
        <nav className="text-sm text-neutral-400 mb-4">
          Dashboard <span className="mx-1">/</span> Tasks
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              {stat.icon}
              <span className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</span>
            </CardHeader>
            <CardContent>
              <span className="text-sm text-neutral-500">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters & Actions - Client Component */}
      <TaskFilters />

      {/* Task Table - Client Component */}
      <Card className="rounded-lg shadow-sm overflow-x-auto">
        <div className="p-4 font-semibold text-lg">My Tasks</div>
        <Separator />
        <TaskTable tasks={tasks} />
      </Card>
    </div>
  );
}