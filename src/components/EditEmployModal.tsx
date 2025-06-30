// src/app/admin/users/components/modals/EditEmployeeModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { type Employee } from '../components/AdminDashboardClient'// Import Employee type

type EditEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee;
  onSave: (updatedEmployee: Employee) => void;
};

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
  onSave,
}) => {
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [role, setRole] = useState<'USER' | 'ADMIN'>(employee.role);
  const [active, setActive] = useState(employee.active);

  // Update state when the employee prop changes (e.g., when a new employee is selected for edit)
  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setEmail(employee.email);
      setRole(employee.role);
      setActive(employee.active);
    }
  }, [employee]);

  const handleSubmit = () => {
    if (name && email) {
      onSave({ ...employee, name, email, role, active });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h3 className="text-xl font-semibold text-neutral-900">Edit Employee</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'USER' | 'ADMIN')}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Assigned Projects
            </label>
            <div className="px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-600">
              {employee.assignedProjects} projects assigned
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">Active Status</span>
            <button
              onClick={() => setActive(!active)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                active ? 'bg-indigo-600' : 'bg-neutral-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  active ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-neutral-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;