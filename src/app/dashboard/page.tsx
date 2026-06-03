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
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">Welcome back, Scholar!</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          You're in the top 15% of your cohort. Keep the streak alive!
        </p>
      </div>

      {/* Main Webinar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            {/* Video Player Placeholder */}
            <div className="aspect-[16/9] md:aspect-video bg-zinc-950 relative flex items-center justify-center group">
              {/* Fake video background */}
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-brand-purple to-brand-green" />
              
              {!isPlaying ? (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-transform group-hover:bg-brand-purple/50 z-10"
                >
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                </button>
              ) : (
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-medium">LIVE</span>
                  </div>
                  <span className="text-xs font-medium">Advanced SAT Math Strategies</span>
                </div>
              )}
            </div>

            <div className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-1">Advanced SAT Math Strategies</h3>
              <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
                Learn the hidden patterns behind the toughest SAT math questions. Join Instructor Sarah as she breaks down the hardest problems from last year's exam.
              </p>

              {/* Watch & Earn Tracker */}
              <div className="space-y-2 bg-muted/50 p-3 md:p-4 rounded-xl border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium text-sm">
                    <Coins className="w-4 h-4 text-brand-green" />
                    <span>Watch & Earn Tracker</span>
                  </div>
                  <span className="text-xs font-bold text-brand-green">+50 Coins</span>
                </div>
                
                <div className="h-2 md:h-3 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand-purple to-brand-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <div className="text-[10px] md:text-xs text-right text-muted-foreground font-medium">
                  {progress}% Completed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4 md:space-y-6">
          <div className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-3 md:mb-4">
              <BrainCircuit className="w-6 h-6 md:w-8 md:h-8 text-brand-purple" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">AI Reality Check</h3>
            <p className="text-muted-foreground text-xs md:text-sm mb-4 md:mb-6">
              Complete today's webinar to unlock the diagnostic quiz.
            </p>

            <Link
              href={progress === 100 ? "/dashboard/diagnostic" : "#"}
              className={`w-full flex items-center justify-center gap-2 h-10 md:h-12 rounded-xl font-bold text-sm transition-all ${
                progress === 100
                  ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/25 hover:bg-brand-purple/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {progress === 100 ? (
                <>
                  Take AI Quiz <ArrowRight className="w-4 h-4" />
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
                className="rounded-2xl border border-brand-green/30 bg-brand-green/10 p-4 md:p-6 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-green/20 flex items-center justify-center mb-2">
                  <Coins className="w-5 h-5 md:w-6 md:h-6 text-brand-green" />
                </div>
                <h4 className="font-bold mb-1 text-brand-green text-sm">Reward Unlocked!</h4>
                <p className="text-xs opacity-80 mb-3">You've completed the webinar.</p>
                <button
                  onClick={handleClaimReward}
                  className="bg-brand-green text-zinc-950 font-bold py-2 px-6 rounded-lg w-full hover:bg-brand-green/90 transition-colors text-sm"
                >
                  Claim 50 Coins
                </button>
              </motion.div>
            )}

            {rewardClaimed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-border bg-card p-3 flex items-center justify-center gap-2 text-brand-green font-medium text-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                Reward Claimed!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
