// utils/validation.ts
import z from "zod";
import { PROJECT_STATUS, TASK_STATUS, PRIORITY } from "./contsants"; // Import new constants

// Project Status Enum from constants (from previous context)
export const ProjectStatusEnum = z.enum([
  PROJECT_STATUS.PENDING,
  PROJECT_STATUS.ACTIVE,
  PROJECT_STATUS.COMPLETED
]);

// Project Schema for creation form (from previous context)
export const createProjectSchema = z.object({
  title: z.string().min(1, { message: "Project name is required." }),
  description: z.string().optional().or(z.literal("")),
  clientId: z.string().optional().or(z.literal("")),
  assignedTo: z.array(z.string()), // Removed .default([]) as per previous fix
  ownerId: z.string().optional().or(z.literal("")),
  status: ProjectStatusEnum, // Removed .default() as per previous fix
});

// Define the exact shape of the form values for CreateProjectFormValues (from previous context)
export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;

// Sign Up Schema (from previous context)
export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Sign In Schema (from previous context)
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

// General Project Schema for other uses (from previous context)
export const projectSchema = z.object({
  title: z.string().min(1, { message: "Project name is required." }),
  description: z.string().optional(),
  clientId: z.string().optional(), // Client ID can be string (UUID)
  assignedTo: z.array(z.string()).default([]), // Array of User IDs
  ownerId: z.string().optional(), // Owner ID can be string (UUID)
  status: ProjectStatusEnum.default(PROJECT_STATUS.PENDING),
  // startDate: z.string().optional(), // If you decide to add these
  // dueDate: z.string().optional(),
});

// Original z.infer for other schemas remains useful for runtime validation types
export type ProjectFormValues = z.infer<typeof projectSchema>;

// Task Status Enum (aligned with constants)
export const TaskStatusEnum = z.enum([
  TASK_STATUS.PENDING,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.COMPLETED,
  TASK_STATUS.TODO,
  TASK_STATUS.DONE,
  TASK_STATUS.BLOCKED,
]);

// Priority Enum (aligned with constants)
export const PriorityEnum = z.enum([
  String(PRIORITY.LOW), // Zod enum expects string literals
  String(PRIORITY.NORMAL),
  String(PRIORITY.HIGH),
]);

// Task Schema (UPDATED to match Prisma schema and fix types)
export const taskSchema = z.object({
  title: z.string().min(1, { message: "Task title is required." }),
  description: z.string().optional().or(z.literal("")), // Optional string, can be empty
  dueDate: z.date().optional().nullable(), // For DateTime? in Prisma
  status: TaskStatusEnum, // No .default() here, manage in defaultValues
  priority: z.number().int().min(1, "Priority must be at least 1").max(3, "Priority cannot exceed 3"), // No .default() here
  tags: z.string().optional().or(z.literal("")), // Prisma has `tags String`, so it's a single string field
  projectId: z.string().min(1, { message: "Project is required." }),
  assignedToId: z.string().optional().or(z.literal("")), // For assignedToId String? in Prisma
});

// Infer TaskFormValues directly from the updated taskSchema
export type TaskFormValues = z.infer<typeof taskSchema>;

// Client Schema (from previous context)
export const clientSchema = z.object({
  name: z.string().min(1, { message: "Client name is required." }),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal("")),
  phone: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

// User Schema (from previous context)
export const RoleEnum = z.enum(["ADMIN", "USER"]);

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: RoleEnum.default("USER"),
});

export type UserFormValues = z.infer<typeof userSchema>;
