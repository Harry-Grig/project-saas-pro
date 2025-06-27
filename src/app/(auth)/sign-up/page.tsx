import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LucideUserPlus } from "lucide-react";
import SignUpForm from "@/components/ui/signUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-300 dark:from-neutral-900 dark:to-neutral-800 transition-colors duration-700">
      <div className="w-full max-w-md p-4 md:p-6">
        <Card className="shadow-xl border-none bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg transition-colors duration-500 rounded-xl">
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="rounded-full bg-neutral-200 dark:bg-neutral-800 p-3 mb-2 shadow-md transition-transform duration-200 hover:scale-105 hover:rotate-2">
              <LucideUserPlus className="w-8 h-8 text-neutral-700 dark:text-neutral-200" />
            </div>
            <h1 className="text-2xl font-extrabold text-neutral-800 dark:text-neutral-100 mb-1 tracking-tight text-center">
              Create your account
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-2 text-center max-w-xs">
              Join us and unlock exclusive features.
            </p>
          </div>
          <Separator className="mb-6" />
          <div className="px-1 md:px-3 pb-1">
            <SignUpForm />
          </div>
          <div className="flex justify-center mt-6">
            <Button
              variant="ghost"
              className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors duration-300 text-base font-medium"
              asChild
            >
              <a href="/auth/sign-in">
                Already have an account?{" "}
                <span className="underline underline-offset-2">Sign in</span>
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}