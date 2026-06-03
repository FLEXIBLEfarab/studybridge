"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share2, Users, Coins, CheckCircle2, Clock } from "lucide-react";

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const refCode = "study_hero_99";
  const refLink = `https://studybridge.app/ref/${refCode}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-3xl font-extrabold tracking-tight">Рефералы</h1>

      {/* Main Invite Card */}
      <div className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Share2 className="w-5 h-5" />
          <h2 className="text-sm font-bold uppercase tracking-wider">Приглашай и зарабатывай</h2>
        </div>

        <p className="text-lg font-medium">За каждого приглашенного друга:</p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-brand-purple/10 border border-brand-purple/20 px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="font-bold text-brand-purple">+1,000 🪙</span>
            <span className="text-sm text-muted-foreground">после регистрации</span>
          </div>
          <div className="bg-brand-green/10 border border-brand-green/20 px-4 py-2 rounded-xl flex items-center gap-2">
            <span className="font-bold text-brand-green">+5,000 🪙</span>
            <span className="text-sm text-muted-foreground">при покупке Premium</span>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">ВАШ РЕФЕРАЛЬНЫЙ КОД</label>
            <div className="flex gap-4">
              <div className="flex-1 bg-muted rounded-xl p-4 font-mono text-lg flex items-center border border-border">
                {refCode}
              </div>
              <button 
                onClick={() => handleCopy(refCode)}
                className="px-6 rounded-xl bg-card border border-border hover:bg-muted transition-colors flex items-center gap-2 font-medium"
              >
                <Copy className="w-5 h-5" />
                <span className="hidden sm:block">{copied ? "Скопировано!" : "Скопировать"}</span>
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 bg-muted rounded-xl p-4 font-mono text-sm sm:text-base text-muted-foreground overflow-x-auto whitespace-nowrap border border-border">
              {refLink}
            </div>
            <button 
              onClick={() => handleCopy(refLink)}
              className="px-6 rounded-xl bg-brand-purple text-white hover:bg-brand-purple/90 transition-colors flex items-center gap-2 font-medium shadow-lg shadow-brand-purple/20"
            >
              <Share2 className="w-5 h-5" />
              <span className="hidden sm:block">Поделиться</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-6 rounded-3xl flex flex-col justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Приглашено</p>
          <p className="text-4xl font-extrabold">6</p>
        </div>
        <div className="bg-card border border-border p-6 rounded-3xl flex flex-col justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center mb-2">
            <Coins className="w-5 h-5 text-brand-green" />
          </div>
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Выплачено</p>
          <p className="text-4xl font-extrabold">12,000 🪙</p>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Приглашённые</h2>
        
        <div className="space-y-3">
          {[
            { name: "Лина", tag: "АКТИВНЫЙ", tagColor: "text-brand-green bg-brand-green/10", details: "@xzilxna • 1 тест • вступил 4 дня назад", reward: "6,000", pending: false },
            { name: "Амина", tag: "АКТИВНЫЙ", tagColor: "text-brand-green bg-brand-green/10", details: "@aminxwmee • 1 тест • вступил 10 дней назад", reward: "6,000", pending: false },
            { name: "Ясин", tag: "ОЖИДАЕТ", tagColor: "text-orange-500 bg-orange-500/10", details: "@nbandh • 0 тестов • вступил 3 дня назад", reward: "0", pending: true },
          ].map((user, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="bg-card border border-border p-5 rounded-2xl flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-lg border border-border">
                  {user.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold">{user.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${user.tagColor}`}>
                      {user.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{user.details}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-lg">{user.reward} 🪙</div>
                {user.pending ? (
                  <div className="flex items-center justify-end gap-1 text-xs text-orange-500 mt-1">
                    <Clock className="w-3 h-3" />
                    <span>Ждет действий</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-end gap-1 text-xs text-brand-green mt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Выплачено</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
