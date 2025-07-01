// components/CreateProjectModal.tsx
"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form"; // Import SubmitHandler
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

import { createProjectSchema, CreateProjectFormValues } from "../utils/validation";
import { PROJECT_STATUS_OPTIONS, PROJECT_STATUS } from '../utils/contsants';
import { ClientSelect } from "../components/clientSelect";
import { UserMultiSelect } from "./UserMultiSelect";
import { OwnerSelect } from "./OwnerSelect";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  // The onSubmit prop's values type should match CreateProjectFormValues
  onSubmit: (values: CreateProjectFormValues) => void;
  isLoading: boolean; // To show loading during submission
}

// Define default values explicitly typed to CreateProjectFormValues
// This helps ensure type consistency with the form schema and resolver.
const defaultCreateProjectFormValues: CreateProjectFormValues = {
  title: "",
  description: "",
  clientId: "",
  assignedTo: [],
  ownerId: "",
  status: PROJECT_STATUS.PENDING,
};

export function CreateProjectModal({ isOpen, onClose, onSubmit, isLoading }: CreateProjectModalProps) {
  // Initialize useForm with the CreateProjectFormValues type and zodResolver
  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: defaultCreateProjectFormValues, // Use the explicitly typed default values
  });

  // Handle form submission, explicitly typing the handler
  const handleSubmit: SubmitHandler<CreateProjectFormValues> = (values) => {
    const {
      title,
      description,
      clientId,
      assignedTo,
      ownerId,
      status,
    } = values;

    // Transform empty strings to undefined for optional fields before submitting
    onSubmit({
      title,
      description: description === "" ? undefined : description,
      clientId: clientId === "" ? undefined : clientId,
      assignedTo,
      ownerId: ownerId === "" ? undefined : ownerId,
      status,
    });
  };

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      form.reset(defaultCreateProjectFormValues); // Reset to the defined default values
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Website redesign" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a brief description of the project..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client */}
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  {/* ClientSelect expects value and onChange */}
                  <ClientSelect value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assigned Users */}
            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Employees</FormLabel>
                  {/* UserMultiSelect expects value (array of strings) and onChange */}
                  <UserMultiSelect value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Owner */}
            <FormField
              control={form.control}
              name="ownerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner</FormLabel>
                  {/* OwnerSelect expects value and onChange */}
                  <OwnerSelect value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  {/* Select component for status. onValueChange updates the form field. */}
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PROJECT_STATUS_OPTIONS.map((option) => (
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

            <DialogFooter className="mt-6 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
