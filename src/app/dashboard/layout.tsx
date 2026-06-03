"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  GraduationCap,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <header className="h-20 border-b border-border bg-card flex items-center justify-between px-4 lg:px-10 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl md:text-2xl font-bold">
              {navItems.find((item) => item.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

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
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 pb-24 md:pb-6">
          {children}
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex items-center justify-around p-3 z-40">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                  isActive ? "text-brand-purple" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Drawer (Hamburger Menu) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="fixed inset-y-0 left-0 w-64 bg-card border-r border-border z-50 flex flex-col md:hidden shadow-2xl"
              >
                <div className="p-6 flex items-center justify-between border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-green flex items-center justify-center">
                      <GraduationCap className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">StudyBridge</span>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                          isActive
                            ? "text-brand-purple font-medium bg-brand-purple/10"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? "text-brand-purple" : ""}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
