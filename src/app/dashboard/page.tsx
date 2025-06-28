import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/auth/currentUser";

export default async function DashboardPage() {
    const user = await getCurrentUser({ withFullUser: true });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }
  return (
    <>
      {/* Welcome Banner */}
      <div className="px-4 lg:px-6 py-4 lg:py-6">
        <Card className="rounded-xl shadow-md p-4 lg:p-6 flex flex-col md:flex-row items-start md:items-center justify-between bg-gradient-to-r from-rose-100/80 to-indigo-100/80 dark:from-neutral-800 dark:to-neutral-900 mb-6">
          <div className="w-full md:w-auto">
            <h2 className="text-xl lg:text-2xl font-bold mb-1">Welcome back, {user.name}!</h2>
            <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-300">Here's your activity overview today</p>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
          <Card className="rounded-lg p-3 lg:p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl lg:text-3xl font-bold text-blue-600">42</span>
            <span className="text-xs lg:text-sm text-neutral-500 text-center">Assigned Tasks</span>
          </Card>
          <Card className="rounded-lg p-3 lg:p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl lg:text-3xl font-bold text-green-600">30</span>
            <span className="text-xs lg:text-sm text-neutral-500 text-center">Completed</span>
          </Card>
          <Card className="rounded-lg p-3 lg:p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl lg:text-3xl font-bold text-yellow-500">8</span>
            <span className="text-xs lg:text-sm text-neutral-500 text-center">In Progress</span>
          </Card>
          <Card className="rounded-lg p-3 lg:p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl lg:text-3xl font-bold text-rose-600">5</span>
            <span className="text-xs lg:text-sm text-neutral-500 text-center">Projects</span>
          </Card>
        </div>

        {/* Assigned Tasks Table */}
        <Card className="rounded-lg shadow-sm mb-6 lg:mb-8">
          <div className="p-3 lg:p-4 font-semibold text-base lg:text-lg">Latest Assigned Tasks</div>
          <Separator />
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs lg:text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="px-2 lg:px-4 py-2 text-left font-medium">Task</th>
                  <th className="px-2 lg:px-4 py-2 text-left font-medium hidden sm:table-cell">Project</th>
                  <th className="px-2 lg:px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-2 lg:px-4 py-2 text-left font-medium hidden md:table-cell">Due</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="px-2 lg:px-4 py-2">
                    <div className="max-w-[120px] lg:max-w-none truncate">Design homepage</div>
                    <div className="text-xs text-neutral-500 sm:hidden">Website Redesign</div>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden sm:table-cell">Website Redesign</td>
                  <td className="px-2 lg:px-4 py-2">
                    <span className="inline-block px-1 lg:px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Completed</span>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden md:table-cell">2025-07-01</td>
                </tr>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="px-2 lg:px-4 py-2">
                    <div className="max-w-[120px] lg:max-w-none truncate">Create user interface</div>
                    <div className="text-xs text-neutral-500 sm:hidden">Mobile App</div>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden sm:table-cell">Mobile App</td>
                  <td className="px-2 lg:px-4 py-2">
                    <span className="inline-block px-1 lg:px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">In Progress</span>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden md:table-cell">2025-07-05</td>
                </tr>
                <tr>
                  <td className="px-2 lg:px-4 py-2">
                    <div className="max-w-[120px] lg:max-w-none truncate">Database migration</div>
                    <div className="text-xs text-neutral-500 sm:hidden">System Upgrade</div>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden sm:table-cell">System Upgrade</td>
                  <td className="px-2 lg:px-4 py-2">
                    <span className="inline-block px-1 lg:px-2 py-1 rounded bg-red-100 text-red-700 text-xs">Pending</span>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden md:table-cell">2025-07-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Projects List */}
        <Card className="rounded-lg shadow-sm mb-6 lg:mb-8">
          <div className="p-3 lg:p-4 font-semibold text-base lg:text-lg">My Projects</div>
          <Separator />
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs lg:text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="px-2 lg:px-4 py-2 text-left font-medium">Project</th>
                  <th className="px-2 lg:px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-2 lg:px-4 py-2 text-left font-medium hidden sm:table-cell">Client</th>
                  <th className="px-2 lg:px-4 py-2 text-left font-medium hidden md:table-cell">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="px-2 lg:px-4 py-2">
                    <div className="max-w-[120px] lg:max-w-none truncate">Website Redesign</div>
                    <div className="text-xs text-neutral-500 sm:hidden">Acme Corp • Designer</div>
                  </td>
                  <td className="px-2 lg:px-4 py-2">
                    <span className="inline-block px-1 lg:px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">Active</span>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden sm:table-cell">Acme Corp</td>
                  <td className="px-2 lg:px-4 py-2 hidden md:table-cell">Designer</td>
                </tr>
                <tr>
                  <td className="px-2 lg:px-4 py-2">
                    <div className="max-w-[120px] lg:max-w-none truncate">Mobile App Development</div>
                    <div className="text-xs text-neutral-500 sm:hidden">TechStart Inc • Lead Developer</div>
                  </td>
                  <td className="px-2 lg:px-4 py-2">
                    <span className="inline-block px-1 lg:px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Planning</span>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden sm:table-cell">TechStart Inc</td>
                  <td className="px-2 lg:px-4 py-2 hidden md:table-cell">Lead Developer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Clients List */}
        <Card className="rounded-lg shadow-sm mb-6 lg:mb-8">
          <div className="p-3 lg:p-4 font-semibold text-base lg:text-lg">Clients</div>
          <Separator />
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs lg:text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="px-2 lg:px-4 py-2 text-left font-medium">Client</th>
                  <th className="px-2 lg:px-4 py-2 text-left font-medium hidden sm:table-cell">Email</th>
                  <th className="px-2 lg:px-4 py-2 text-left font-medium hidden md:table-cell">Phone</th>
                  <th className="px-2 lg:px-4 py-2 text-left font-medium">Projects</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100 dark:border-neutral-800">
                  <td className="px-2 lg:px-4 py-2">
                    <div className="font-medium">Acme Corp</div>
                    <div className="text-xs text-neutral-500 sm:hidden">info@acme.com</div>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden sm:table-cell">info@acme.com</td>
                  <td className="px-2 lg:px-4 py-2 hidden md:table-cell">123-456-7890</td>
                  <td className="px-2 lg:px-4 py-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold">2</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-2 lg:px-4 py-2">
                    <div className="font-medium">TechStart Inc</div>
                    <div className="text-xs text-neutral-500 sm:hidden">contact@techstart.io</div>
                  </td>
                  <td className="px-2 lg:px-4 py-2 hidden sm:table-cell">contact@techstart.io</td>
                  <td className="px-2 lg:px-4 py-2 hidden md:table-cell">098-765-4321</td>
                  <td className="px-2 lg:px-4 py-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold">1</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-4 mb-6 lg:mb-8">
          <Button variant="default" className="rounded-lg flex-1 sm:flex-none">View all tasks</Button>
          <Button variant="secondary" className="rounded-lg flex-1 sm:flex-none">View all projects</Button>
          <Button variant="outline" className="rounded-lg flex-1 sm:flex-none">View all clients</Button>
        </div>
      </div>
    </>
  );
}