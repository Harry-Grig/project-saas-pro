import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CheckCircle, Users, ClipboardList, LayoutDashboard, ShieldCheck, UserCog, ArrowRight, LogIn, UserPlus, BarChart3, FileText, LockKeyhole, Star, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-20 px-4 bg-gradient-to-b from-rose-600/90 to-rose-700 text-white text-center flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Manage Projects & Clients in One Place</h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">Collaborate with your team, manage clients, track progress — all in one secure app.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-white text-rose-700 hover:bg-rose-600 hover:text-white transition-colors duration-200 font-semibold cursor-pointer shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
            >
              Get Started
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              size="lg"
              variant="outline"
              className="border-rose-100 text-rose-700 bg-white hover:bg-rose-600 hover:text-white transition-colors duration-200 font-semibold cursor-pointer shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
            >
              Log In
            </Button>
          </Link>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-zinc-900">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="flex flex-col items-center p-6 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
            <Users className="text-rose-600 mb-3" size={36} />
            <span className="font-semibold text-lg mb-1">Client Management</span>
            <span className="text-muted-foreground text-sm text-center">Easily manage all your clients in one place.</span>
          </Card>
          <Card className="flex flex-col items-center p-6 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
            <LayoutDashboard className="text-rose-600 mb-3" size={36} />
            <span className="font-semibold text-lg mb-1">Project Assignment</span>
            <span className="text-muted-foreground text-sm text-center">Assign projects and keep everything organized.</span>
          </Card>
          <Card className="flex flex-col items-center p-6 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
            <ClipboardList className="text-rose-600 mb-3" size={36} />
            <span className="font-semibold text-lg mb-1">Task Tracking</span>
            <span className="text-muted-foreground text-sm text-center">Track tasks and progress with ease.</span>
          </Card>
          <Card className="flex flex-col items-center p-6 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
            <BarChart3 className="text-rose-600 mb-3" size={36} />
            <span className="font-semibold text-lg mb-1">Real-time Collaboration</span>
            <span className="text-muted-foreground text-sm text-center">Work together with your team in real time.</span>
          </Card>
          <Card className="flex flex-col items-center p-6 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
            <UserCog className="text-rose-600 mb-3" size={36} />
            <span className="font-semibold text-lg mb-1">Role-based Access</span>
            <span className="text-muted-foreground text-sm text-center">Admin/User roles for secure access control.</span>
          </Card>
          <Card className="flex flex-col items-center p-6 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
            <ShieldCheck className="text-rose-600 mb-3" size={36} />
            <span className="font-semibold text-lg mb-1">Secure & Scalable</span>
            <span className="text-muted-foreground text-sm text-center">Your data is safe and the app grows with you.</span>
          </Card>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-white dark:bg-zinc-950">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">How it Works</h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto justify-center">
          <Card className="flex-1 flex flex-col items-center p-8 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
            <FileText className="text-rose-600 mb-4" size={40} />
            <span className="font-semibold text-lg mb-2">1. Create a Project</span>
            <span className="text-muted-foreground text-center">Start by creating a new project for your client or team.</span>
          </Card>
          <Card className="flex-1 flex flex-col items-center p-8 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
            <Users className="text-rose-600 mb-4" size={40} />
            <span className="font-semibold text-lg mb-2">2. Assign Tasks & Collaborators</span>
            <span className="text-muted-foreground text-center">Add tasks and invite team members to collaborate.</span>
          </Card>
          <Card className="flex-1 flex flex-col items-center p-8 transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
            <BarChart3 className="text-rose-600 mb-4" size={40} />
            <span className="font-semibold text-lg mb-2">3. Track Progress in Real-Time</span>
            <span className="text-muted-foreground text-center">Monitor progress and keep everyone aligned.</span>
          </Card>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-zinc-900">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="flex items-center gap-4 p-6">
            <CheckCircle className="text-rose-600" size={32} />
            <div>
              <span className="font-semibold">All-in-one for client & team</span>
              <p className="text-muted-foreground text-sm">No more switching between Excel, Notion, Trello, or manual work.</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4 p-6">
            <LockKeyhole className="text-rose-600" size={32} />
            <div>
              <span className="font-semibold">Self-hosted Option</span>
              <p className="text-muted-foreground text-sm">Host on your own infrastructure for full control (if available).</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4 p-6">
            <ShieldCheck className="text-rose-600" size={32} />
            <div>
              <span className="font-semibold">Total Data Control & Security</span>
              <p className="text-muted-foreground text-sm">Your data stays private and secure, always.</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4 p-6">
            <Star className="text-rose-600" size={32} />
            <div>
              <span className="font-semibold">Built for Modern Teams</span>
              <p className="text-muted-foreground text-sm">Designed for agencies, freelancers, and businesses.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-white dark:bg-zinc-950">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          <Card className="p-6 flex flex-col gap-4">
            <MessageCircle className="text-rose-600" size={28} />
            <blockquote className="italic">“Thanks to this app, we organize all our projects with ease!”</blockquote>
            <span className="text-sm font-semibold">– Michael P., Digital Agency Owner</span>
          </Card>
          <Card className="p-6 flex flex-col gap-4">
            <MessageCircle className="text-rose-600" size={28} />
            <blockquote className="italic">“Our team collaborates better and we track progress in real time.”</blockquote>
            <span className="text-sm font-semibold">– Helen K., Project Manager</span>
          </Card>
        </div>
      </section>

      {/* Call to Action Footer Section */}
      <section className="py-12 px-4 bg-rose-700 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">🚀 Start your first project now!</h2>
        <p className="mb-6">Sign up – it’s free!</p>
        <Link href="/sign-up">
          <Button size="lg" className="bg-white text-rose-700 hover:bg-rose-100 font-semibold">Sign Up</Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-slate-900 text-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-lg font-bold">
          <LayoutDashboard className="text-rose-600" size={28} />
          ProjectSaaS
        </div>
        <nav className="flex gap-6 text-sm">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
        </nav>
        <div className="flex gap-4">
          <a href="#" aria-label="Twitter" className="hover:text-rose-400">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 8.99 4.07 7.13 1.64 4.16c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.28 0-.56-.02-.83-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 24 4.59a8.36 8.36 0 0 1-2.54.7z"/>
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-rose-400">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}