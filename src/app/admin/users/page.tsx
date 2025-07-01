import AdminDashboardClient from "@/components/AdminDashboardClient";
import { db } from "@/utils/prisma";

// If you have a shared Employee type, import it. Otherwise, define it here:
export interface Employee {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
  joined: string;
  assignedProjects: number;
  avatar: string;
}

const getUsers = async () => {
  const users = await db.user.findMany({
    include: {
      assignedProjects: true,
    },
  });
  return users;
};

export default async function AdminUsersPage() {
  const users = await getUsers();

  const stats = {
    totalEmployees: users.length,
    activeEmployees: users.length, // or your own logic for active
    admins: users.filter((user) => user.role === "ADMIN").length,
    newHires: users.filter(
      (user) =>
        new Date(user.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  // Map users to Employee type
  const mappedUsers: Employee[] = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    joined: user.createdAt.toISOString(), // or format as needed
    assignedProjects: user.assignedProjects.length,
    avatar: user.name
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "",
  }));

  return (
    <main className="p-6 md:p-10 bg-neutral-50 min-h-screen">
      <AdminDashboardClient initialUsers={mappedUsers} initialStats={stats} />
    </main>
  );
}