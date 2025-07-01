// components/AddTaskModal.tsx
"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";

// Import the correct task schema and types
import { taskSchema, TaskFormValues } from "../utils/validation";
import { TASK_STATUS_OPTIONS, PRIORITY_OPTIONS, TASK_STATUS } from '../utils/contsants';

// Assuming these components exist or you will create them
// import { MultiSelect } from "@/components/multi-select"; // Only if tags were array, now it's a string
import { ProjectSelect } from "@/components/projectSelect"; // Assuming you have a ProjectSelect component
import { UserSelect } from "../components/userSelect"; // New component for single user selection

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
  isLoading: boolean;
  // Optional: If you want to pre-select a project when opening the modal for a specific project
  initialProjectId?: string;
}

// Define default values for the task form
const defaultAddTaskFormValues: TaskFormValues = {
  title: "",
  description: "",
  dueDate: null, // Initialize with null for optional date
  status: TASK_STATUS.TODO, // Default status from constants
  priority: 2, // Default priority (e.g., NORMAL)
  tags: "", // Default for single string tags
  projectId: "", // Project ID is required, but can be empty initially if not pre-selected
  assignedToId: "", // Optional, can be empty
};

export function AddTaskModal({ isOpen, onClose, onSubmit, isLoading, initialProjectId }: AddTaskModalProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      ...defaultAddTaskFormValues,
      projectId: initialProjectId || "", // Use initialProjectId if provided
    },
  });

  // Handler for form submission
  const handleSubmit: SubmitHandler<TaskFormValues> = (values) => {
    const {
      title,
      description,
      dueDate,
      status,
      priority,
      tags,
      projectId,
      assignedToId,
    } = values;

    // Transform empty strings to undefined for optional fields before submitting
    onSubmit({
      title,
      description: description === "" ? undefined : description,
      dueDate: dueDate, // dueDate is already Date | null
      status,
      priority,
      tags: tags === "" ? undefined : tags, // Transform empty string to undefined for tags
      projectId,
      assignedToId: assignedToId === "" ? undefined : assignedToId,
    });
  };

  // Reset form when modal closes or initialProjectId changes
  React.useEffect(() => {
    if (!isOpen) {
      form.reset({
        ...defaultAddTaskFormValues,
        projectId: initialProjectId || "",
      });
    } else {
      // If modal opens with a new initialProjectId, update the form field
      if (initialProjectId && form.getValues("projectId") !== initialProjectId) {
        form.setValue("projectId", initialProjectId);
      }
    }
  }, [isOpen, form, initialProjectId]);

  // Mock data for select/multi-select options
  // In a real application, these would be fetched from an API
  const mockProjects = [
    { id: "proj1", name: "Website Redesign" },
    { id: "proj2", name: "Mobile App Development" },
    { id: "proj3", name: "Backend API Integration" },
  ];

  const mockUsers = [
    { id: "user1", name: "Alice Smith" },
    { id: "user2", name: "Bob Johnson" },
    { id: "user3", name: "Charlie Brown" },
  ];


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            {/* Title Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Implement user authentication" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Textarea */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description of the task (optional)"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Select */}
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project <span className="text-red-500">*</span></FormLabel>
                  {/* Assuming ProjectSelect is similar to ClientSelect/OwnerSelect */}
                  <ProjectSelect
                    value={field.value}
                    onChange={field.onChange}
                    projects={mockProjects} // Pass mock projects
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assigned To User Select */}
            <FormField
              control={form.control}
              name="assignedToId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <UserSelect
                    value={field.value}
                    onChange={field.onChange}
                    users={mockUsers} // Pass mock users
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Date Picker */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date (Optional)</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined} // Corrected syntax
                        onSelect={field.onChange}
                        initialFocus
                        // Example: Disable past dates
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Select */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select task status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TASK_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority Select */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} value={String(field.value)}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select task priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PRIORITY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={String(option.value)}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags Input (changed from MultiSelect to Input as per Prisma schema) */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., frontend, bug, critical" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Task"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
