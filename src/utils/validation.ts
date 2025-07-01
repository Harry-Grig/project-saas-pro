import z from "zod";
import { PROJECT_STATUS } from "./contsants";

// Sign Up Schema
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

// Sign In Schema
export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

// Project Status Enum from constants
export const ProjectStatusEnum = z.enum([
  PROJECT_STATUS.PENDING,
  PROJECT_STATUS.ACTIVE,
  PROJECT_STATUS.COMPLETED,
]);

// Project Schema
export const projectSchema = z.object({
  title: z.string().min(1, { message: "Project name is required." }),
  description: z.string().optional(),
  clientId: z.string().optional(), // Client ID can be a string (UUID)
  assignedTo: z.array(z.string()).default([]), // Array of User IDs
  ownerId: z.string().optional(), // Owner ID can be a string (UUID)
  status: ProjectStatusEnum.default(PROJECT_STATUS.PENDING),
  // startDate: z.string().optional(), // Uncomment if you decide to add
  // dueDate: z.string().optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

// Task Status and Priority Enums
export const TaskStatusEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);
export const PriorityEnum = z.enum(["LOW", "NORMAL", "HIGH"]);

// Task Schema
export const taskSchema = z.object({
  title: z.string().min(1, { message: "Task title is required." }),
  description: z.string().optional(),
  priority: PriorityEnum.default("NORMAL"),
  status: TaskStatusEnum.default("PENDING"),
  dueDate: z.string().optional(),
  projectId: z.string().min(1, { message: "Project is required." }),
  assignedToId: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

// Client Schema
export const clientSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal("")),
  phone: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

// User Role Enum
export const RoleEnum = z.enum(["ADMIN", "USER"]);

// User Schema
export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: RoleEnum.default("USER"),
});

export type UserFormValues = z.infer<typeof userSchema>;