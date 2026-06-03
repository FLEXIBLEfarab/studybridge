"use client";

import { useUserStore } from "@/lib/store";
import { Zap, Users, Shield, ArrowRight, Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function StorePage() {
  const { isPremium, setPremium } = useUserStore();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 bg-brand-purple/10 text-brand-purple px-4 py-2 rounded-full font-bold border border-brand-purple/20">
          <Zap className="w-4 h-4" />
          StudyBridge Premium
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">
          Supercharge Your <br /> Scholarship Journey
        </h1>
        <p className="text-muted-foreground text-lg">
          Unlock exclusive perks, multiply your earnings, and get access to the hidden referral system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Economic Booster Card */}
        <div className="bg-card border border-border p-8 rounded-3xl shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-brand-green/20 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-brand-green" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Economic Booster</h3>
            <p className="text-muted-foreground mb-8">
              Earn BridgeCoins 3x faster from watching webinars, completing quizzes, and maintaining your streak.
            </p>

            <div className="bg-background rounded-2xl p-4 border border-border space-y-4">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-muted-foreground">Normal Earnings</span>
                <span className="text-foreground">+50 Coins / webinar</span>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">VS</span>
                </div>
              </div>

              <div className="flex items-center justify-between font-bold text-brand-green bg-brand-green/10 p-3 rounded-xl border border-brand-green/20">
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  X3 Booster Activated
                </span>
                <span>+150 Coins / webinar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Locked Referral System Card */}
        <div className="bg-card border border-border rounded-3xl shadow-sm relative overflow-hidden">
          <div className="p-8">
            <div className="w-14 h-14 bg-brand-purple/20 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-brand-purple" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Elite Referral Network</h3>
            <p className="text-muted-foreground mb-8">
              Invite your friends to StudyBridge and earn massive rewards when they sign up and start learning.
            </p>

            <div className="bg-gradient-to-r from-brand-purple to-brand-green p-px rounded-2xl">
              <div className="bg-background rounded-[15px] p-6 text-center">
                <h4 className="text-3xl font-extrabold mb-1">1,000 Coins</h4>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Per Successful Invite</p>
              </div>
            </div>
          </div>

          {/* Blur Overlay for Free Users */}
          {!isPremium && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-md flex items-center justify-center p-8 text-center z-20">
              <div className="bg-card border border-border p-6 rounded-2xl shadow-xl max-w-sm w-full">
                <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-bold mb-2">Available only for Premium Subscribers</h4>
                <p className="text-sm text-muted-foreground mb-6">Upgrade now to invite your squad and earn massive rewards.</p>
                <button
                  onClick={() => setPremium(true)}
                  className="w-full h-10 bg-brand-purple text-white rounded-lg font-bold text-sm hover:bg-brand-purple/90 transition-colors"
                >
                  Upgrade to Unlock
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subscription CTA Bottom */}
      {!isPremium ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gradient-to-r from-brand-purple/10 to-brand-green/10 border border-brand-purple/20 rounded-3xl p-8 md:p-12 text-center"
        >
          <Shield className="w-12 h-12 text-brand-purple mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to lock in?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Join the elite tier of students for just 5,000 ₸ / month and get access to all VIP features.
          </p>
          <button
            onClick={() => setPremium(true)}
            className="h-14 px-8 bg-brand-purple text-white rounded-xl font-bold text-lg hover:bg-brand-purple/90 transition-all flex items-center justify-center gap-2 mx-auto shadow-lg shadow-brand-purple/25"
          >
            Upgrade for 5,000 ₸ / month
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-12 bg-brand-green/10 border border-brand-green/30 rounded-3xl p-8 text-center"
        >
          <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-brand-green mb-2">You are a Premium Member</h2>
          <p className="text-muted-foreground">All VIP features are active on your account.</p>
        </motion.div>
      )}
    </div>
  );
}
