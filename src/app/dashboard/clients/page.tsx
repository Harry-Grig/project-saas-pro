import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, Building, FolderOpen, Mail, Phone } from "lucide-react";
import { getCurrentUser } from "@/auth/currentUser";
import { getUserClients } from "@/actions/clients";
import ClientFilters from "@/components/clientFilters";
import EmptyStateClients from "@/components/emptyStateClient";
import ClientTable from "@/components/clientTable";

export default async function ClientsPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div>Please log in to view your clients.</div>;
  }

  const clients = await getUserClients();

  // Calculate stats from real data
  const stats = [
    { 
      label: "Total Clients", 
      value: clients.length, 
      color: "blue", 
      icon: <Users className="text-blue-600" /> 
    },
    { 
      label: "Active Projects", 
      value: clients.reduce((acc, client) => acc + client.projects.filter(p => p.status === 'ACTIVE').length, 0), 
      color: "green", 
      icon: <FolderOpen className="text-green-600" /> 
    },
    { 
      label: "With Email", 
      value: clients.filter(c => c.email).length, 
      color: "purple", 
      icon: <Mail className="text-purple-600" /> 
    },
    { 
      label: "With Phone", 
      value: clients.filter(c => c.phone).length, 
      color: "orange", 
      icon: <Phone className="text-orange-600" /> 
    },
  ];

  // Empty state
  if (clients.length === 0) {
    return <EmptyStateClients />;
  }

  return (
    <div className="px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-7 h-7 text-rose-600" />
          <h1 className="text-3xl font-extrabold tracking-tight">Clients</h1>
        </div>
        <p className="text-neutral-500 mb-2">View and manage all your clients</p>
        <nav className="text-sm text-neutral-400 mb-4">
          Dashboard <span className="mx-1">/</span> Clients
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
      <ClientFilters />

      {/* Client Table */}
      <Card className="rounded-lg shadow-sm overflow-x-auto">
        <div className="p-4 font-semibold text-lg">My Clients ({clients.length})</div>
        <Separator />
        <ClientTable clients={clients} />
      </Card>
    </div>
  );
}
