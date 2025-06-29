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
  { name: 'Completed', value: 71, color: '#10B981' },
  { name: 'In Progress', value: 25, color: '#F59E0B' },
  { name: 'Pending', value: 33, color: '#EF4444' }
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
    className="p-4 rounded-lg border text-left transition-all hover:shadow-md hover:bg-neutral-100 bg-white border-neutral-200"
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

const AdminDashboardPage: React.FC = () => {
  const handleAddUser = (): void => {
    console.log('Add user');
  };

  const handleCreateProject = (): void => {
    console.log('Create project');
  };

  const handleAddTask = (): void => {
    console.log('Add task');
  };

  const handleAddClient = (): void => {
    console.log('Add client');
  };

  const getStatusClassName = (status: string): string => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-neutral-50 min-h-full">
      {/* Hero Section */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="1,247" change={12} icon={Users} color="bg-indigo-500" />
        <StatCard title="Active Projects" value="34" change={8} icon={FolderOpen} color="bg-rose-500" />
        <StatCard title="Total Tasks" value="892" change={-3} icon={CheckSquare} color="bg-slate-500" />
        <StatCard title="New Clients" value="23" change={15} icon={UserCheck} color="bg-rose-400" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Trends Chart */}
        <div className="p-6 rounded-xl border bg-white border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900">Task Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={taskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  color: "#000000"
                }}
              />
              <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="inprogress" stroke="#F59E0B" strokeWidth={2} />
              <Line type="monotone" dataKey="pending" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Task Status Pie Chart */}
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
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  color: "#000000"
                }}
              />
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
      </div>

      {/* User Growth Chart */}
      <div className="p-6 rounded-xl border bg-white border-neutral-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-neutral-900">User Growth This Month</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                color: "#000000"
              }}
            />
            <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="p-6 rounded-xl border bg-white border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900">Quick Actions</h3>
          <div className="space-y-3">
            <QuickActionCard
              title="Add User"
              description="Create new user account"
              icon={Users}
              color="bg-indigo-500"
              onClick={handleAddUser}
            />
            <QuickActionCard
              title="Create Project"
              description="Start a new project"
              icon={FolderOpen}
              color="bg-rose-500"
              onClick={handleCreateProject}
            />
            <QuickActionCard
              title="Add Task"
              description="Create new task"
              icon={CheckSquare}
              color="bg-slate-500"
              onClick={handleAddTask}
            />
            <QuickActionCard
              title="Add Client"
              description="Register new client"
              icon={UserCheck}
              color="bg-rose-400"
              onClick={handleAddClient}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 p-6 rounded-xl border bg-white border-neutral-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-neutral-900">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4 font-medium text-sm text-neutral-600">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-neutral-600">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-neutral-600">Action</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-neutral-600">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-neutral-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-sm text-neutral-600">Actions</th>
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
                        <button className="p-1 rounded hover:bg-neutral-100 text-neutral-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 rounded hover:bg-neutral-100 text-neutral-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 rounded hover:bg-red-50 text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;