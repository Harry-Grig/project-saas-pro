import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <>
      {/* Welcome Banner */}
      <div className="px-6 py-6">
        <Card className="rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-rose-100/80 to-indigo-100/80 dark:from-neutral-800 dark:to-neutral-900 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back, Χρήστη!</h2>
            <p className="text-neutral-600 dark:text-neutral-300">Here's your activity overview today</p>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="rounded-lg p-4 flex flex-col items-center shadow-sm">
            <span className="text-3xl font-bold text-blue-600">42</span>
            <span className="text-sm text-neutral-500">Assigned Tasks</span>
          </Card>
          <Card className="rounded-lg p-4 flex flex-col items-center shadow-sm">
            <span className="text-3xl font-bold text-green-600">30</span>
            <span className="text-sm text-neutral-500">Completed</span>
          </Card>
          <Card className="rounded-lg p-4 flex flex-col items-center shadow-sm">
            <span className="text-3xl font-bold text-yellow-500">8</span>
            <span className="text-sm text-neutral-500">In Progress</span>
          </Card>
          <Card className="rounded-lg p-4 flex flex-col items-center shadow-sm">
            <span className="text-3xl font-bold text-rose-600">5</span>
            <span className="text-sm text-neutral-500">Projects</span>
          </Card>
        </div>

        {/* Assigned Tasks Table */}
        <Card className="rounded-lg shadow-sm mb-8 overflow-x-auto">
          <div className="p-4 font-semibold text-lg">Latest Assigned Tasks</div>
          <Separator />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="px-4 py-2 text-left">Task</th>
                  <th className="px-4 py-2 text-left">Project</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Due</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Design homepage</td>
                  <td className="px-4 py-2">Website Redesign</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Completed</span>
                  </td>
                  <td className="px-4 py-2">2025-07-01</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Create user interface</td>
                  <td className="px-4 py-2">Mobile App</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">In Progress</span>
                  </td>
                  <td className="px-4 py-2">2025-07-05</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Database migration</td>
                  <td className="px-4 py-2">System Upgrade</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-700 text-xs">Pending</span>
                  </td>
                  <td className="px-4 py-2">2025-07-10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Projects List */}
        <Card className="rounded-lg shadow-sm mb-8 overflow-x-auto">
          <div className="p-4 font-semibold text-lg">My Projects</div>
          <Separator />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="px-4 py-2 text-left">Project</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Client</th>
                  <th className="px-4 py-2 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Website Redesign</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">Active</span>
                  </td>
                  <td className="px-4 py-2">Acme Corp</td>
                  <td className="px-4 py-2">Designer</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Mobile App Development</td>
                  <td className="px-4 py-2">
                    <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Planning</span>
                  </td>
                  <td className="px-4 py-2">TechStart Inc</td>
                  <td className="px-4 py-2">Lead Developer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Clients List */}
        <Card className="rounded-lg shadow-sm mb-8 overflow-x-auto">
          <div className="p-4 font-semibold text-lg">Clients</div>
          <Separator />
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-neutral-800">
                  <th className="px-4 py-2 text-left">Client</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Projects</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Acme Corp</td>
                  <td className="px-4 py-2">info@acme.com</td>
                  <td className="px-4 py-2">123-456-7890</td>
                  <td className="px-4 py-2">2</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">TechStart Inc</td>
                  <td className="px-4 py-2">contact@techstart.io</td>
                  <td className="px-4 py-2">098-765-4321</td>
                  <td className="px-4 py-2">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="default" className="rounded-lg">View all tasks</Button>
          <Button variant="secondary" className="rounded-lg">View all projects</Button>
          <Button variant="outline" className="rounded-lg">View all clients</Button>
        </div>
      </div>
    </>
  );
}