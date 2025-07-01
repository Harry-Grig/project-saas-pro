// utils/constants.ts

// Project Status Constants (from previous context)
export const PROJECT_STATUS = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
} as const;

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS];

// English labels for Project Status
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  [PROJECT_STATUS.PENDING]: "Pending",
  [PROJECT_STATUS.ACTIVE]: "Active",
  [PROJECT_STATUS.COMPLETED]: "Completed"
};

// Options array for select components
export const PROJECT_STATUS_OPTIONS = Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => ({
  value: value as ProjectStatus,
  label
}));

// Task Status Constants (aligned with your Prisma enum)
export const TASK_STATUS = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  TODO: "TODO", // Added TODO as per the provided Prisma schema's default
  DONE: "DONE", // Added DONE
  BLOCKED: "BLOCKED" // Added BLOCKED
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];

// English labels for Task Status
export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TASK_STATUS.PENDING]: "Pending",
  [TASK_STATUS.IN_PROGRESS]: "In Progress",
  [TASK_STATUS.COMPLETED]: "Completed",
  [TASK_STATUS.TODO]: "To Do",
  [TASK_STATUS.DONE]: "Done",
  [TASK_STATUS.BLOCKED]: "Blocked"
};

// Options array for select components
export const TASK_STATUS_OPTIONS = Object.entries(TASK_STATUS_LABELS).map(([value, label]) => ({
  value: value as TaskStatus,
  label
}));

// Priority Constants (aligned with your Prisma enum)
export const PRIORITY = {
  LOW: 1,    // Changed to numbers to match Prisma Int type
  NORMAL: 2,
  HIGH: 3
} as const;

export type Priority = typeof PRIORITY[keyof typeof PRIORITY];

// English labels for Priority
export const PRIORITY_LABELS: Record<Priority, string> = {
  [PRIORITY.LOW]: "Low",
  [PRIORITY.NORMAL]: "Normal",
  [PRIORITY.HIGH]: "High"
};

// Options array for select components
export const PRIORITY_OPTIONS = Object.entries(PRIORITY_LABELS).map(([value, label]) => ({
  value: parseInt(value) as Priority, // Convert value back to number for type safety
  label
}));

// Role Constants (from previous context)
export const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER"
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];

// English labels for Roles
export const ROLE_LABELS: Record<Role, string> = {
  [ROLE.ADMIN]: "Administrator",
  [ROLE.USER]: "User"
};
