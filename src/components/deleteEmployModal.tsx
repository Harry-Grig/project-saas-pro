// src/app/admin/users/components/modals/DeleteEmployeeModal.tsx
'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import { Employee } from '../components/AdminDashboardClient'; // Import Employee type

type DeleteEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  onConfirmDelete: (employeeId: number) => void;
};

const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
  onConfirmDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Delete Employee</h3>
              <p className="text-neutral-500">This action cannot be undone</p>
            </div>
          </div>
          <p className="text-neutral-700 mb-6">
            Are you sure you want to remove <strong>{employee.name}</strong> from your team?
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirmDelete(employee.id)}
              className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
            >
              Delete Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;