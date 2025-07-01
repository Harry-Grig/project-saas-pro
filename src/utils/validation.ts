// utils/validation.ts
import z from "zod";
import { PROJECT_STATUS } from "./contsants";

// Project Status Enum from constants
export const ProjectStatusEnum = z.enum([
  PROJECT_STATUS.PENDING,
  PROJECT_STATUS.ACTIVE,
  PROJECT_STATUS.COMPLETED
]);

// Project Schema for creation form
export const createProjectSchema = z.object({
  title: z.string().min(1, { message: "Project name is required." }),
  description: z.string().optional(), // Remains optional (string | undefined)
  clientId: z.string().optional(),    // Remains optional (string | undefined)
  // IMPORTANT CHANGE: Removed .default([]) from here.
  // The type will now be string[] (non-optional array).
  // Default value will be provided in useForm's defaultValues.
  assignedTo: z.array(z.string()),
  ownerId: z.string().optional(),     // Remains optional (string | undefined)
  // IMPORTANT CHANGE: Removed .default(PROJECT_STATUS.PENDING) from here.
  // The type will now be "PENDING" | "ACTIVE" | "COMPLETED" (non-optional enum).
  // Default value will be provided in useForm's defaultValues.
  status: ProjectStatusEnum,
});

// Define the exact shape of the form values for CreateProjectFormValues
// By directly inferring from the schema, we ensure type consistency with zodResolver.
// This type will now correctly reflect that assignedTo and status are NOT optional.
export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;

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

// General Project Schema for other uses
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

// Task Schema (if needed)
export const TaskStatusEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);
export const PriorityEnum = z.enum(["LOW", "NORMAL", "HIGH"]);

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
  name: z.string().min(1, { message: "Client name is required." }),
  email: z.string().email({ message: "Invalid email address." }).optional().or(z.literal("")),
  phone: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

// User Schema
export const RoleEnum = z.enum(["ADMIN", "USER"]);

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: RoleEnum.default("USER"),
});

export type UserFormValues = z.infer<typeof userSchema>;
