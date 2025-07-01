export interface Employee {
  id: string; // should match Prisma's String
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  joined: string; // should be a string (e.g. ISO date)
  assignedProjects: number;
  avatar: string;
}

export interface Stats {
  totalEmployees: number;
  activeEmployees: number;
  admins: number;
  newHires: number;
}

export type RoleFilter = 'ALL' | 'ADMIN' | 'USER';
export type SortBy = 'newest' | 'oldest' | 'name';