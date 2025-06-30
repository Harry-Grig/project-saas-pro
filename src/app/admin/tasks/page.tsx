// app/dashboard/tasks/page.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ListChecks, CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";
import { getCurrentUser } from "@/auth/currentUser";
import { getUserTasks } from "@/actions/tasks";
import TaskFilters from "@/components/tasksFilters";
import EmptyState from "@/components/emptyState";
import TaskTable from "@/components/taskTable";
import { TaskStatus } from "@/generated/prisma";


export default async function TasksPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Please log in to view your tasks.</div>;
  }

  const tasks = await getUserTasks();

  // Calculate stats from real data
  const stats = [
    { 
      label: "Completed", 
      value: tasks.filter(t => t.status === TaskStatus.COMPLETED).length, 
      color: "green", 
      icon: <CheckCircle className="text-green-600" /> 
    },
    { 
      label: "In Progress", 
      value: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length, 
      color: "blue", 
      icon: <Clock className="text-blue-600" /> 
    },
    { 
      label: "Pending", 
      value: tasks.filter(t => t.status === TaskStatus.PENDING).length, 
      color: "yellow", 
      icon: <AlertTriangle className="text-yellow-500" /> 
    },
    { 
      label: "Overdue", 
      value: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== TaskStatus.COMPLETED).length, 
      color: "red", 
      icon: <XCircle className="text-red-600" /> 
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

      {/* Filters & Actions */}
      <TaskFilters />

      {/* Task Table */}
      <Card className="rounded-lg shadow-sm overflow-x-auto">
        <div className="p-4 font-semibold text-lg">My Tasks ({tasks.length})</div>
        <Separator />
        <TaskTable tasks={tasks} />
      </Card>
    </div>
  );
}