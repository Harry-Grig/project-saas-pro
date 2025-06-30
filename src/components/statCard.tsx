// src/app/admin/users/ui/StatCard.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">{title}</p>
        <p className="text-3xl font-bold text-neutral-900 mt-2">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default StatCard;