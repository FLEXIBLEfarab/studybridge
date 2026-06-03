"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Trophy, Target, ArrowRight, User, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Side - Motivational Graphics (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 p-12 flex-col justify-between relative overflow-hidden text-white">
        {/* Abstract background elements */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-purple/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-brand-green/20 rounded-full blur-[100px]" />

        <div className="z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-green flex items-center justify-center">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">StudyBridge</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 max-w-xl"
          >
            <h1 className="text-5xl font-extrabold leading-tight">
              Your Scholarship <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-green">
                Starts Here.
              </span>
            </h1>
            <p className="text-zinc-400 text-lg">
              Join thousands of students who gamified their exam prep and won full-ride scholarships to their dream universities.
            </p>
          </motion.div>
        </div>

        <div className="z-10 grid grid-cols-2 gap-6 mt-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <Trophy className="w-8 h-8 text-brand-purple mb-4" />
            <h3 className="text-3xl font-bold mb-1">87%</h3>
            <p className="text-zinc-400 text-sm">Success Rate for Premium Users</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <Target className="w-8 h-8 text-brand-green mb-4" />
            <h3 className="text-3xl font-bold mb-1">5M+</h3>
            <p className="text-zinc-400 text-sm">Practice Questions Answered</p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              {isSignUp ? "Create an account" : "Welcome back"}
            </h2>
            <p className="text-muted-foreground">
              {isSignUp
                ? "Enter your details to start your journey."
                : "Enter your credentials to access your account."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium leading-none">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                />
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-sm font-medium leading-none">
                    Target University & Major
                  </label>
                  <select
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  >
                    <option value="">Select your dream destination...</option>
                    <option value="mit-cs">MIT - Computer Science</option>
                    <option value="harvard-law">Harvard - Law</option>
                    <option value="stanford-biz">Stanford - Business</option>
                    <option value="oxford-med">Oxford - Medicine</option>
                    <option value="other">Other / Undecided</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 h-10 rounded-md bg-brand-purple text-white px-4 py-2 text-sm font-medium hover:bg-brand-purple/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ring-offset-2 ring-offset-background"
            >
              {isSignUp ? "Start Journey" : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center h-10 rounded-md border border-input bg-background hover:bg-muted transition-colors font-medium text-sm">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center h-10 rounded-md border border-input bg-background hover:bg-muted transition-colors font-medium text-sm">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.81 3.82-.74 1.34.01 2.52.56 3.25 1.51-2.8 1.54-2.3 5.43.46 6.64-1.31 3.12-3.8 6.43-5.26 6.19zM12.03 2.13c1.09.07 2.45-.63 3.18-1.53-.74 1.09-2.2 1.94-3.4 1.83-.06-.11-.06-.21-.06-.3z" />
              </svg>
              Apple
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="font-medium text-brand-purple hover:underline focus:outline-none"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
