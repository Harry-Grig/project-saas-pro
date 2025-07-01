// src/app/admin/users/page.tsx
import AdminDashboardClient from "@/components/AdminDashboardClient";
import { Employee } from "@/utils/types";

// Mock data (could be fetched from an API in a real application)
const getEmployees = async (): Promise<Employee[]> => {
  // In a real app, this would be an API call, e.g.,
  // const res = await fetch('https://your-api.com/employees', { cache: 'no-store' }); // Disable caching if data is highly dynamic
  // const employees = await res.json();
  const employees: Employee[] = [
    {
      id: 1,
      name: 'Γιάννης Παπαδόπουλος',
      email: 'giannis@company.com',
      role: 'ADMIN',
      joined: '2024-01-15',
      assignedProjects: 5,
      avatar: 'GP',
      active: true,
    },
    {
      id: 2,
      name: 'Μαρία Αντωνίου',
      email: 'maria@company.com',
      role: 'USER',
      joined: '2024-02-20',
      assignedProjects: 3,
      avatar: 'ΜΑ',
      active: true,
    },
    {
      id: 3,
      name: 'Νίκος Κωνσταντίνου',
      email: 'nikos@company.com',
      role: 'USER',
      joined: '2024-03-10',
      assignedProjects: 2,
      avatar: 'ΝΚ',
      active: false,
    },
    {
      id: 4,
      name: 'Σοφία Δημητρίου',
      email: 'sofia@company.com',
      role: 'USER',
      joined: '2024-06-01',
      assignedProjects: 1,
      avatar: 'ΣΔ',
      active: true,
    },
    {
      id: 5,
      name: 'Αλέξανδρος Γεωργίου',
      email: 'alex@company.com',
      role: 'ADMIN',
      joined: '2023-12-05',
      assignedProjects: 7,
      avatar: 'ΑΓ',
      active: true,
    },
    { id: 6, name: 'Ελένη Παπά', email: 'eleni@company.com', role: 'USER', joined: '2024-01-01', assignedProjects: 2, avatar: 'ΕΠ', active: true },
    { id: 7, name: 'Κώστας Βλάχος', email: 'kostas@company.com', role: 'USER', joined: '2024-03-22', assignedProjects: 4, avatar: 'ΚΒ', active: true },
    { id: 8, name: 'Δήμητρα Καραμπά', email: 'dimitra@company.com', role: 'ADMIN', joined: '2023-11-11', assignedProjects: 6, avatar: 'ΔΚ', active: true },
    { id: 9, name: 'Γιώργος Φωτίου', email: 'giorgos@company.com', role: 'USER', joined: '2024-05-18', assignedProjects: 1, avatar: 'ΓΦ', active: false },
    { id: 10, name: 'Άννα Νικολάου', email: 'anna@company.com', role: 'USER', joined: '2024-02-29', assignedProjects: 3, avatar: 'ΑΝ', active: true },
    { id: 11, name: 'Παναγιώτης Ρήγας', email: 'panos@company.com', role: 'USER', joined: '2024-04-05', assignedProjects: 2, avatar: 'ΠΡ', active: true },
    { id: 12, name: 'Ιωάννα Πούλου', email: 'ioanna@company.com', role: 'ADMIN', joined: '2023-10-01', assignedProjects: 8, avatar: 'ΙΠ', active: true },
  ];
  return employees;
};

export default async function AdminUsersPage() {
  const employees = await getEmployees();

  // Stats are calculated on the server and passed as initial values
  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter((emp) => emp.active).length,
    admins: employees.filter((emp) => emp.role === 'ADMIN').length,
    newHires: employees.filter(
      (emp) => new Date(emp.joined) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  return (
    <main className="p-6 md:p-10 bg-neutral-50 min-h-screen">
      {/* AdminDashboardClient is a Client Component */}
      <AdminDashboardClient initialEmployees={employees} initialStats={stats} />
    </main>
  );
}