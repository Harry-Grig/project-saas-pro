// src/app/admin/users/ui/RoleBadge.tsx
import React from 'react';

type RoleBadgeProps = {
  role: 'ADMIN' | 'USER';
};

const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-medium ${
      role === 'ADMIN' ? 'bg-indigo-100 text-indigo-800' : 'bg-rose-100 text-rose-800'
    }`}
  >
    {role}
  </span>
);

export default RoleBadge;