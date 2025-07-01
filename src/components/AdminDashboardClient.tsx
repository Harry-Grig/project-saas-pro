'use client';

import React, { useState } from 'react';
import { Users, Shield, CalendarPlus } from 'lucide-react';

import DashboardHeader from './dashboardHeader';
import StatCard from '../components/statCard';
import EmployeeFilters from './serachAndFilters';
import EmployeesTable from '../components/employsTable';
import Pagination from '../components/pagination';
import EditEmployeeModal from '../components/EditEmployModal';
import DeleteEmployeeModal from '../components/deleteEmployModal';

// Define types for better type safety
export type Employee = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  joined: string; // ISO date string (e.g., 'YYYY-MM-DD')
  assignedProjects: number;
  avatar: string; // Initials for the avatar
};

type AdminDashboardClientProps = {
  initialUsers: Employee[];
  initialStats: {
    totalEmployees: number;
    activeEmployees: number;
    admins: number;
    newHires: number;
  };
};

const AdminDashboardClient: React.FC<AdminDashboardClientProps> = ({
  initialUsers,
  initialStats,
}) => {
  const [employees, setEmployees] = useState<Employee[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'ADMIN' | 'USER'>('ALL');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');

  // State for modal visibility and selected employee
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Derived state (filters and sorts without useMemo for simplicity with small data)
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.joined).getTime() - new Date(a.joined).getTime();
      case 'oldest':
        return new Date(a.joined).getTime() - new Date(b.joined).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  // Handlers for modal interactions and data manipulation
  const handleAddEmployee = (newEmployeeData: Omit<Employee, 'id' | 'joined' | 'avatar'>) => {
    const newEmployee: Employee = {
      ...newEmployeeData,
      id: crypto.randomUUID(), // Use a string ID
      joined: new Date().toISOString().split('T')[0], // Current date for "joined"
      avatar: newEmployeeData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2), // Initials
    };
    setEmployees((prev) => [...prev, newEmployee]);
    setShowAddModal(false);
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
    setShowEditModal(false);
    setSelectedEmployee(null); // Clear selected employee after edit
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== employeeId));
    setShowDeleteModal(false);
    setSelectedEmployee(null); // Clear selected employee after delete
  };

  const handleOpenEditModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleOpenDeleteModal = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  // Re-calculate stats based on current employees state
  const currentStats = {
    totalEmployees: employees.length,
    activeEmployees: employees.length, // or your own logic for active
    admins: employees.filter((emp) => emp.role === 'ADMIN').length,
    newHires: employees.filter(
      (emp) => new Date(emp.joined) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  };

  return (
    <>
      <DashboardHeader onAddEmployee={() => setShowAddModal(true)} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Employees"
          value={currentStats.totalEmployees}
          icon={Users}
          color="bg-indigo-500"
        />
        <StatCard
          title="Admins"
          value={currentStats.admins}
          icon={Shield}
          color="bg-rose-500"
        />
        <StatCard
          title="New Hires (Month)"
          value={currentStats.newHires}
          icon={CalendarPlus}
          color="bg-orange-500"
        />
      </div>

      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <EmployeesTable
        employees={paginatedEmployees}
        onEdit={handleOpenEditModal}
        onDelete={handleOpenDeleteModal}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalResults={sortedEmployees.length}
          itemsPerPage={itemsPerPage}
        />
      )}

      {selectedEmployee && (
        <>
          <EditEmployeeModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            employee={selectedEmployee}
            onSave={handleEditEmployee}
          />
          <DeleteEmployeeModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            employee={selectedEmployee}
            onConfirmDelete={() => handleDeleteEmployee(selectedEmployee.id)}
          />
        </>
      )}
    </>
  );
};

export default AdminDashboardClient;