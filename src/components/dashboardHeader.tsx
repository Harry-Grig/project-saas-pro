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
    </div>
  );
};

export default DashboardHeader;