// app/dashboard/projects/page.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FolderOpen, CheckCircle, Clock, AlertTriangle, Users } from "lucide-react";
import { getCurrentUser } from "@/auth/currentUser";
import { getUserProjects } from "@/actions/projects";
import ProjectFilters from "@/components/projectFilters";
import ProjectEmptyState from "@/components/emptyProjectState";
import ProjectTable from "@/components/projectTable";
import { ProjectStatus } from "@/generated/prisma";

export default async function ProjectsPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Please log in to view your projects.</div>;
  }

  const projects = await getUserProjects();

  // Calculate stats from real data
  const stats = [
    { 
      label: "Active", 
      value: projects.filter(p => p.status === ProjectStatus.ACTIVE).length, 
      color: "blue", 
      icon: <Clock className="text-blue-600" /> 
    },
    { 
      label: "Completed", 
      value: projects.filter(p => p.status === ProjectStatus.COMPLETED).length, 
      color: "green", 
      icon: <CheckCircle className="text-green-600" /> 
    },
    { 
      label: "Pending", 
      value: projects.filter(p => p.status === ProjectStatus.PENDING).length, 
      color: "yellow", 
      icon: <AlertTriangle className="text-yellow-500" /> 
    },
    { 
      label: "Total Team", 
      value: projects.reduce((acc, p) => acc + p.assignedTo.length, 0), 
      color: "purple", 
      icon: <Users className="text-purple-600" /> 
    },
  ];

  // Empty state
  if (projects.length === 0) {
    return <ProjectEmptyState />;
  }

  return (
    <div className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <FolderOpen className="w-7 h-7 text-rose-600" />
          <h1 className="text-3xl font-extrabold tracking-tight">Projects</h1>
        </div>
        <p className="text-neutral-500 mb-2">View, filter and manage all your projects</p>
        <nav className="text-sm text-neutral-400 mb-4">
          Dashboard <span className="mx-1">/</span> Projects
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
      <ProjectFilters />

      {/* Projects Table */}
      <Card className="rounded-lg shadow-sm overflow-x-auto">
        <div className="p-4 font-semibold text-lg">My Projects ({projects.length})</div>
        <Separator />
        <ProjectTable projects={projects} />
      </Card>
    </div>
  );
}