import React from 'react';
import { Users, UserCheck, Shield, CalendarPlus, LucideIcon } from 'lucide-react';
import { Stats } from '../utils/types';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

const StatCard: React.FC<StatCardProps> = React.memo(({ title, value, icon: Icon, color }) => (
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
));

StatCard.displayName = 'StatCard';

interface StatsCardsProps {
  stats: Stats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const statItems = [
    {
      title: "Total Employees",
      value: stats.totalEmployees,
      icon: Users,
      color: "bg-indigo-500"
    },
    {
      title: "Active Employees",
      value: stats.activeEmployees,
      icon: UserCheck,
      color: "bg-green-500"
    },
    {
      title: "Admins",
      value: stats.admins,
      icon: Shield,
      color: "bg-rose-500"
    },
    {
      title: "New Hires (Month)",
      value: stats.newHires,
      icon: CalendarPlus,
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsCards;