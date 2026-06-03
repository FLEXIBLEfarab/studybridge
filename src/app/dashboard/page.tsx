"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Coins, ArrowRight, CheckCircle2, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/lib/store";

export default function DashboardPage() {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const { addCoins } = useUserStore();

  // Simulate webinar watching
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 5, 100));
      }, 500); // 5% every 0.5s for fast demo purposes
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const handleClaimReward = () => {
    if (!rewardClaimed && progress === 100) {
      addCoins(50);
      setRewardClaimed(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, Scholar!</h1>
          <p className="text-muted-foreground">
            You're in the top 15% of your cohort. Keep the streak alive!
          </p>
        </div>
      </div>

      {/* Main Webinar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Video Player Placeholder */}
            <div className="aspect-video bg-zinc-950 relative flex items-center justify-center group">
              {/* Fake video background */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-brand-purple to-brand-green" />
              
              {!isPlaying ? (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-transform group-hover:bg-brand-purple/50 z-10"
                >
                  <Play className="w-8 h-8 text-white ml-2" />
                </button>
              ) : (
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10 text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm font-medium">LIVE</span>
                  </div>
                  <span className="text-sm font-medium">Advanced SAT Math Strategies</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Advanced SAT Math Strategies</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Learn the hidden patterns behind the toughest SAT math questions. Join Instructor Sarah as she breaks down the hardest problems from last year's exam.
              </p>

              {/* Watch & Earn Tracker */}
              <div className="space-y-3 bg-muted/50 p-4 rounded-xl border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium">
                    <Coins className="w-5 h-5 text-brand-green" />
                    <span>Watch & Earn Tracker</span>
                  </div>
                  <span className="text-sm font-bold text-brand-green">+50 Coins</span>
                </div>
                
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-purple to-brand-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="text-xs text-right text-muted-foreground font-medium">
                  {progress}% Completed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-4">
              <BrainCircuit className="w-8 h-8 text-brand-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">AI Reality Check</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Unlock the diagnostic quiz by completing today's webinar to see where you stand.
            </p>

            <Link
              href={progress === 100 ? "/dashboard/diagnostic" : "#"}
              className={`w-full flex items-center justify-center gap-2 h-12 rounded-xl font-bold transition-all ${
                progress === 100
                  ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/25 hover:bg-brand-purple/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {progress === 100 ? (
                <>
                  Take AI Quiz <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                "Watch Webinar to Unlock"
              )}
            </Link>
          </div>

          <AnimatePresence>
            {progress === 100 && !rewardClaimed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="rounded-2xl border border-brand-green/30 bg-brand-green/10 p-6 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green/20 flex items-center justify-center mb-3">
                  <Coins className="w-6 h-6 text-brand-green" />
                </div>
                <h4 className="font-bold mb-1 text-brand-green">Reward Unlocked!</h4>
                <p className="text-sm opacity-80 mb-4">You've completed the webinar.</p>
                <button
                  onClick={handleClaimReward}
                  className="bg-brand-green text-zinc-950 font-bold py-2 px-6 rounded-lg w-full hover:bg-brand-green/90 transition-colors"
                >
                  Claim 50 Coins
                </button>
              </motion.div>
            )}

            {rewardClaimed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-border bg-card p-4 flex items-center justify-center gap-2 text-brand-green font-medium"
              >
                <CheckCircle2 className="w-5 h-5" />
                Reward Claimed!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
