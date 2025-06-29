import React from 'react';
import {
  Users,
  FolderOpen,
  CheckSquare,
  UserCheck,
  Plus,
  TrendingUp,
  Calendar,
  Clock,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

// Type definitions
interface TaskTrendData {
  name: string;
  completed: number;
  pending: number;
  inprogress: number;
}

interface TaskStatusData {
  name: string;
  value: number;
  color: string;
}

interface UserGrowthData {
  name: string;
  users: number;
}

interface RecentActivityItem {
  id: number;
  name: string;
  type: string;
  action: string;
  date: string;
  status: string;
}

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onClick: () => void;
}

// Constants
const CHART_COLORS = {
  completed: '#10B981',
  inProgress: '#F59E0B',
  pending: '#EF4444',
  primary: '#3B82F6'
} as const;

const TOOLTIP_STYLE = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "8px",
  color: "#000000"
} as const;

// Mock data for charts
const taskTrendData: TaskTrendData[] = [
  { name: 'Jan', completed: 45, pending: 23, inprogress: 12 },
  { name: 'Feb', completed: 52, pending: 28, inprogress: 15 },
  { name: 'Mar', completed: 61, pending: 35, inprogress: 18 },
  { name: 'Apr', completed: 58, pending: 31, inprogress: 22 },
  { name: 'May', completed: 67, pending: 29, inprogress: 19 },
  { name: 'Jun', completed: 71, pending: 33, inprogress: 25 }
];

const taskStatusData: TaskStatusData[] = [
  { name: 'Completed', value: 71, color: CHART_COLORS.completed },
  { name: 'In Progress', value: 25, color: CHART_COLORS.inProgress },
  { name: 'Pending', value: 33, color: CHART_COLORS.pending }
];

const userGrowthData: UserGrowthData[] = [
  { name: 'Week 1', users: 12 },
  { name: 'Week 2', users: 19 },
  { name: 'Week 3', users: 15 },
  { name: 'Week 4', users: 23 }
];

const recentActivity: RecentActivityItem[] = [
  { id: 1, name: 'John Doe', type: 'User', action: 'Registered', date: '2025-06-28', status: 'Active' },
  { id: 2, name: 'Website Redesign', type: 'Project', action: 'Created', date: '2025-06-27', status: 'In Progress' },
  { id: 3, name: 'Fix Login Bug', type: 'Task', action: 'Completed', date: '2025-06-27', status: 'Completed' },
  { id: 4, name: 'Jane Smith', type: 'User', action: 'Updated Profile', date: '2025-06-26', status: 'Active' },
  { id: 5, name: 'API Documentation', type: 'Task', action: 'Created', date: '2025-06-26', status: 'Pending' }
];

const statsData = [
  { title: "Total Users", value: "1,247", change: 12, icon: Users, color: "bg-indigo-500" },
  { title: "Active Projects", value: "34", change: 8, icon: FolderOpen, color: "bg-rose-500" },
  { title: "Total Tasks", value: "892", change: -3, icon: CheckSquare, color: "bg-slate-500" },
  { title: "New Clients", value: "23", change: 15, icon: UserCheck, color: "bg-rose-400" }
];

const quickActions = [
  { title: "Add User", description: "Create new user account", icon: Users, color: "bg-indigo-500", action: "ADD_USER" },
  { title: "Create Project", description: "Start a new project", icon: FolderOpen, color: "bg-rose-500", action: "CREATE_PROJECT" },
  { title: "Add Task", description: "Create new task", icon: CheckSquare, color: "bg-slate-500", action: "ADD_TASK" },
  { title: "Add Client", description: "Register new client", icon: UserCheck, color: "bg-rose-400", action: "ADD_CLIENT" }
];

// Utility functions
const getStatusClassName = (status: string): string => {
  const statusClasses = {
    'Active': 'bg-green-100 text-green-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'In Progress': 'bg-yellow-100 text-yellow-800'
  } as const;
  
  return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800';
};

// Components
const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
  <div className="p-6 rounded-xl border bg-white border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-500">{title}</p>
        <p className="text-2xl font-bold mt-2 text-neutral-900">{value}</p>
        <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}% από την προηγούμενη εβδομάδα
        </p>
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon: Icon, color, onClick }) => (
  <button
    onClick={onClick}
    className="p-4 rounded-lg border text-left transition-all hover:shadow-md hover:bg-neutral-100 bg-white border-neutral-200 w-full"
  >
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 className="font-medium text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  </button>
);

const HeroSection: React.FC = () => (
  <div className="p-6 rounded-xl bg-gradient-to-r from-rose-100 to-indigo-100 text-neutral-900">
    <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
    <p className="text-neutral-500">Here's what's happening with your projects today.</p>
    <div className="flex items-center space-x-4 mt-4 text-sm">
      <div className="flex items-center space-x-1">
        <Calendar className="w-4 h-4 text-rose-600" />
        <span>Today: Sunday, June 29, 2025</span>
      </div>
      <div className="flex items-center space-x-1">
        <Clock className="w-4 h-4 text-indigo-600" />
        <span>5 tasks due today</span>
      </div>
    </div>
  </div>
);

const TaskTrendsChart: React.FC = () => (
  <div className="p-6 rounded-xl border bg-white border-neutral-200 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 text-neutral-900">Task Trends</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={taskTrendData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="name" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Line type="monotone" dataKey="completed" stroke={CHART_COLORS.completed} strokeWidth={2} />
        <Line type="monotone" dataKey="inprogress" stroke={CHART_COLORS.inProgress} strokeWidth={2} />
        <Line type="monotone" dataKey="pending" stroke={CHART_COLORS.pending} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const TaskStatusChart: React.FC = () => (
  <div className="p-6 rounded-xl border bg-white border-neutral-200 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 text-neutral-900">Task Status Distribution</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={taskStatusData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {taskStatusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={TOOLTIP_STYLE} />
      </PieChart>
    </ResponsiveContainer>
    <div className="flex justify-center space-x-4 mt-4">
      {taskStatusData.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
          <span className="text-sm text-neutral-600">{item.name}</span>
        </div>
      ))}
    </div>
  </div>
);

const UserGrowthChart: React.FC = () => (
  <div className="p-6 rounded-xl border bg-white border-neutral-200 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 text-neutral-900">User Growth This Month</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={userGrowthData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="name" stroke="#6B7280" />
        <YAxis stroke="#6B7280" />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Bar dataKey="users" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const ActivityTable: React.FC = () => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-neutral-200">
          {['Name', 'Type', 'Action', 'Date', 'Status', 'Actions'].map((header) => (
            <th key={header} className="text-left py-3 px-4 font-medium text-sm text-neutral-600">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {recentActivity.map((item) => (
          <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
            <td className="py-3 px-4 text-neutral-900">{item.name}</td>
            <td className="py-3 px-4 text-neutral-600">{item.type}</td>
            <td className="py-3 px-4 text-neutral-600">{item.action}</td>
            <td className="py-3 px-4 text-neutral-600">{item.date}</td>
            <td className="py-3 px-4">
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusClassName(item.status)}`}>
                {item.status}
              </span>
            </td>
            <td className="py-3 px-4">
              <div className="flex space-x-2">
                {[
                  { icon: Eye, className: "hover:bg-neutral-100 text-neutral-600" },
                  { icon: Edit, className: "hover:bg-neutral-100 text-neutral-600" },
                  { icon: Trash2, className: "hover:bg-red-50 text-red-500" }
                ].map(({ icon: Icon, className }, index) => (
                  <button key={index} className={`p-1 rounded ${className}`}>
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AdminDashboardPage: React.FC = () => {
  const handleAction = (action: string): void => {
    console.log(`Action: ${action}`);
  };

  return (
    <div className="p-6 space-y-6 bg-neutral-50 min-h-full">
      <HeroSection />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskTrendsChart />
        <TaskStatusChart />
      </div>

      <UserGrowthChart />

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="p-6 rounded-xl border bg-white border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <QuickActionCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                color={action.color}
                onClick={() => handleAction(action.action)}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 p-6 rounded-xl border bg-white border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900">Recent Activity</h3>
          <ActivityTable />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;