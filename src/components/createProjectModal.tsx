// components/CreateProjectModal.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
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

import { projectSchema, ProjectFormValues, ProjectStatusEnum } from "../utils/validation";
import { ClientSelect } from "../components/clientSelect";
import { UserMultiSelect } from "./UserMultiSelect";
import { OwnerSelect } from "./OwnerSelect";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ProjectFormValues) => void;
  isLoading: boolean; // Για να δείχνει loading κατά την υποβολή
}

export function CreateProjectModal({ isOpen, onClose, onSubmit, isLoading }: CreateProjectModalProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      clientId: undefined,
      assignedTo: [],
      ownerId: undefined,
      status: "PENDING", // Default status
    },
  });

  const handleSubmit = (values: ProjectFormValues) => {
    onSubmit(values);
  };

  React.useEffect(() => {
    if (!isOpen) {
      form.reset(); // Επαναφορά της φόρμας όταν κλείνει το modal
    }
  }, [isOpen, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Δημιουργία Νέου Project</DialogTitle>
          <DialogDescription>
            Συμπληρώστε τα στοιχεία για να δημιουργήσετε ένα νέο project.
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
                  <FormLabel>Τίτλος Project <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Π.χ. Website redesign" {...field} />
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
                  <FormLabel>Περιγραφή</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Προσθέστε μια σύντομη περιγραφή του project..."
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
                  <FormLabel>Πελάτης</FormLabel>
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
                  <FormLabel>Ανατεθειμένοι Υπάλληλοι</FormLabel>
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
                  <FormLabel>Κατάσταση</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Επιλέξτε κατάσταση" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ProjectStatusEnum.options.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
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
                Ακύρωση
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Δημιουργία..." : "Δημιουργία Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}