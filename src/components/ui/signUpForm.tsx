"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideLock, LucideMail, LucideUser } from "lucide-react";
import { signUpSchema } from "@/utils/validation";
import { signUp } from "@/auth/action";
import { useState } from "react";

export default function SignUpForm() {
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

    

async function onSubmit(data: z.infer<typeof signUpSchema>) {
    try {
        setError(''); 
        const result = await signUp(data);

        if (result && !result.success) {
            setError(result.error);
            return; 
        }
        
        
    } catch (err: any) {
        console.error('SignUp error:', err);
        if (err?.message?.includes("NEXT_REDIRECT")) {
            return; 
        }
        setError("An unexpected error occurred");
    }
}



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 px-2"
      autoComplete="off"
    >
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
          Name
        </label>
        <div className="relative flex items-center">
          <LucideUser className="absolute left-3 w-5 h-5 text-neutral-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Your name"
            autoComplete="off"
            className="pl-10 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all w-full max-w-md"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">
            {errors.name.message as string}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
          Email
        </label>
        <div className="relative flex items-center">
          <LucideMail className="absolute left-3 w-5 h-5 text-neutral-400 pointer-events-none" />
          <Input
            type="email"
            placeholder="you@email.com"
            autoComplete="new-email"
            className="pl-10 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all w-full max-w-md"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">
            {errors.email.message as string}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
          Password
        </label>
        <div className="relative flex items-center">
          <LucideLock className="absolute left-3 w-5 h-5 text-neutral-400 pointer-events-none" />
          <Input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className="pl-10 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all w-full max-w-md"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">
            {errors.password.message as string}
          </p>
        )}
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-1">
          Confirm Password
        </label>
        <div className="relative flex items-center">
          <LucideLock className="absolute left-3 w-5 h-5 text-neutral-400 pointer-events-none" />
          <Input
            type="password"
            placeholder="Confirm password"
            autoComplete="new-password"
            className="pl-10 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all w-full max-w-md"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.confirmPassword.message as string}
          </p>
        )}
      </div>
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full max-w-md bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition-colors duration-300 shadow-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
}