// src/app/admin/users/components/EmployeesTable.tsx
'use client';

import React from 'react';
import EmployeeRow from '../components/EmployRow';
import { Employee } from './AdminDashboardClient'; // Import the Employee type

type EmployeesTableProps = {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

const EmployeesTable: React.FC<EmployeesTableProps> = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-neutral-900">Name</th>
              <th className="text-left py-4 px-6 font-semibold text-neutral-900">Email</th>
              <th className="text-left py-4 px-6 font-semibold text-neutral-900">Role</th>
              <th className="text-left py-4 px-6 font-semibold text-neutral-900">Joined</th>
              <th className="text-left py-4 px-6 font-semibold text-neutral-900">Projects</th>
              <th className="text-left py-4 px-6 font-semibold text-neutral-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-neutral-500">
                  No employees found matching your criteria.
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <EmployeeRow
                  key={employee.id}
                  employee={employee}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesTable;