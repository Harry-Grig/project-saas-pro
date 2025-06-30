// src/app/admin/users/components/modals/AddEmployeeModal.tsx
'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { type Employee } from '../components/AdminDashboardClient'; // Import Employee type

type AddEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newEmployee: Omit<Employee, 'id' | 'joined' | 'avatar'>) => void;
};

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');

  const handleSubmit = () => {
    if (name && email) {
      onSave({ name, email, role, assignedProjects: 0, active: true }); // Default values
      setName('');
      setEmail('');
      setRole('USER');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h3 className="text-xl font-semibold text-neutral-900">Add New Employee</h3>
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
              placeholder="Enter full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter email address"
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
            Save Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;