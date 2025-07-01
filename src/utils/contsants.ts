// utils/constants.ts

// Project Status Constants
export const PROJECT_STATUS = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE", 
  COMPLETED: "COMPLETED"
} as const;

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS];

// Greek labels for Project Status
export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  [PROJECT_STATUS.PENDING]: "PENDING",
  [PROJECT_STATUS.ACTIVE]: "ACTIVE",
  [PROJECT_STATUS.COMPLETED]: "COMPLETED"
};

// Options array for select components
export const PROJECT_STATUS_OPTIONS = Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => ({
  value: value as ProjectStatus,
  label
}));

// Task Status Constants
export const TASK_STATUS = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED"
} as const;

export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];

// Greek labels for Task Status
export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TASK_STATUS.PENDING]: "PENDING",
  [TASK_STATUS.IN_PROGRESS]: "IN_PROGRESS",
  [TASK_STATUS.COMPLETED]: "COMPLETED"
};

// Priority Constants
export const PRIORITY = {
  LOW: "LOW",
  NORMAL: "NORMAL",
  HIGH: "HIGH"
} as const;

export type Priority = typeof PRIORITY[keyof typeof PRIORITY];

// Greek labels for Priority
export const PRIORITY_LABELS: Record<Priority, string> = {
  [PRIORITY.LOW]: "LOW",
  [PRIORITY.NORMAL]: "NORMAL",
  [PRIORITY.HIGH]: "HIGH"
};

// Role Constants
export const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER"
} as const;

export type Role = typeof ROLE[keyof typeof ROLE];

// Greek labels for Roles
export const ROLE_LABELS: Record<Role, string> = {
  [ROLE.ADMIN]: "ADMIN",
  [ROLE.USER]: "USER"
};