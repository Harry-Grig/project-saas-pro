// src/app/admin/users/components/EmployeeRow.tsx
'use client';

import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Avatar from '../components/Avatar';
import RoleBadge from '../components/roleBadge';
import { Employee } from './AdminDashboardClient'; // Import the Employee type

type EmployeeRowProps = {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
};

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-neutral-100 transition-colors">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <Avatar avatar={employee.avatar} />
          <div>
            <p className="font-medium text-neutral-900">{employee.name}</p>
            <p className={`text-sm ${employee.active ? 'text-green-600' : 'text-neutral-400'}`}>
              {employee.active ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 text-neutral-600">{employee.email}</td>
      <td className="py-4 px-6">
        <RoleBadge role={employee.role} />
      </td>
      <td className="py-4 px-6 text-neutral-600">
        {new Date(employee.joined).toLocaleDateString('el-GR')}
      </td>
      <td className="py-4 px-6">
        <span className="bg-neutral-100 text-neutral-800 px-2 py-1 rounded-full text-sm font-medium">
          {employee.assignedProjects}
        </span>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(employee)}
            className="p-2 text-neutral-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(employee)}
            className="p-2 text-neutral-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;