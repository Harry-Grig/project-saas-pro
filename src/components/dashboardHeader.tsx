// src/app/admin/users/components/DashboardHeader.tsx
'use client';

import React from 'react';
import { Plus } from 'lucide-react';

type DashboardHeaderProps = {
  onAddEmployee: () => void;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onAddEmployee }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Employees</h1>
        <p className="text-neutral-500 mt-1">Manage your team and their access rights</p>
      </div>
      <button
        onClick={onAddEmployee}
        className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add New Employee
      </button>
    </div>
  );
};

export default DashboardHeader;