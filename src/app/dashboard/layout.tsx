"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { 
  LayoutDashboard, 
  Video, 
  BrainCircuit, 
  Store, 
  User, 
  Users,
  Sun,
  Moon,
  Flame,
  Coins,
  GraduationCap
} from "lucide-react";
import { useUserStore } from "@/lib/store";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Webinars", href: "/dashboard/webinars", icon: Video },
  { name: "AI Diagnostic", href: "/dashboard/diagnostic", icon: BrainCircuit },
  { name: "Store", href: "/dashboard/store", icon: Store },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Referrals", href: "/dashboard/referrals", icon: Users },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { coins, level, streak } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-green flex items-center justify-center">
            <GraduationCap className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">StudyBridge</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                  isActive
                    ? "text-brand-purple font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-5 h-5 relative z-10 ${isActive ? "text-brand-purple" : ""}`} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-20 border-b border-border bg-card flex items-center justify-between px-6 lg:px-10 shrink-0">
          <h2 className="text-2xl font-bold hidden sm:block">
            {navItems.find((item) => item.href === pathname)?.name || "Dashboard"}
          </h2>

          <div className="flex items-center gap-4 ml-auto">
            {mounted && (
              <div className="flex items-center gap-4 bg-muted/50 p-2 rounded-2xl border border-border">
                {/* Level */}
                <div className="flex items-center gap-2 px-3">
                  <div className="w-6 h-6 rounded-full bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30">
                    <span className="text-xs font-bold text-brand-purple">{level}</span>
                  </div>
                  <span className="text-sm font-medium hidden lg:block">Lvl {level}</span>
                </div>

                <div className="w-px h-6 bg-border" />

                {/* Streak */}
                <div className="flex items-center gap-2 px-3 text-orange-500">
                  <Flame className="w-5 h-5 fill-orange-500" />
                  <span className="text-sm font-bold">{streak}</span>
                </div>

                <div className="w-px h-6 bg-border" />

                {/* Coins */}
                <div className="flex items-center gap-2 px-3 text-brand-green">
                  <Coins className="w-5 h-5" />
                  <span className="text-sm font-bold">{coins}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors border border-border"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-brand-purple" />
                )
              ) : (
                <div className="w-5 h-5" />
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
