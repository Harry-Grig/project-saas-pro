export interface Employee {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  joined: string;
  assignedProjects: number;
  avatar: string;
  active: boolean;
}

export interface Stats {
  totalEmployees: number;
  activeEmployees: number;
  admins: number;
  newHires: number;
}

export type RoleFilter = 'ALL' | 'ADMIN' | 'USER';
export type SortBy = 'newest' | 'oldest' | 'name';