// src/app/admin/users/components/EmployeeFilters.tsx
'use client';

import React from 'react';
import { Search } from 'lucide-react';

type EmployeeFiltersProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  roleFilter: 'ALL' | 'ADMIN' | 'USER';
  setRoleFilter: (role: 'ALL' | 'ADMIN' | 'USER') => void;
  sortBy: 'newest' | 'oldest' | 'name';
  setSortBy: (sort: 'newest' | 'oldest' | 'name') => void;
};

const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as 'ALL' | 'ADMIN' | 'USER')}
            className="px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'name')}
            className="px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFilters;