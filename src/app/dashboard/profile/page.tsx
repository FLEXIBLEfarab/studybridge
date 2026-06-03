"use client";

import { useState } from "react";
import { useUserStore } from "@/lib/store";
import { User, Award, Shield, Image as ImageIcon, Lock, Coins } from "lucide-react";
import { motion } from "framer-motion";

const items = {
  borders: [
    { id: "b1", name: "Default", type: "border", price: 0, unlocked: true, style: "border-border border-4" },
    { id: "b2", name: "Neon Violet", type: "border", price: 500, unlocked: false, style: "border-brand-purple border-4 shadow-[0_0_15px_rgba(139,92,246,0.6)]" },
    { id: "b3", name: "Cyber Green", type: "border", price: 500, unlocked: false, style: "border-brand-green border-4 shadow-[0_0_15px_rgba(16,185,129,0.6)]" },
    { id: "b4", name: "Gold Scholar", type: "border", price: 1000, unlocked: false, style: "border-yellow-400 border-4 shadow-[0_0_15px_rgba(250,204,21,0.6)]" },
  ],
  badges: [
    { id: "bg1", name: "Early Bird", type: "badge", price: 0, unlocked: true, icon: Award },
    { id: "bg2", name: "Math Genius", type: "badge", price: 300, unlocked: false, icon: Award },
    { id: "bg3", name: "Streak Master", type: "badge", price: 600, unlocked: false, icon: Award },
  ],
  backgrounds: [
    { id: "bk1", name: "Classic Dark", type: "background", price: 0, unlocked: true, style: "bg-card" },
    { id: "bk2", name: "Purple Nebula", type: "background", price: 800, unlocked: false, style: "bg-gradient-to-br from-brand-purple/20 to-zinc-900" },
    { id: "bk3", name: "Matrix Green", type: "background", price: 800, unlocked: false, style: "bg-gradient-to-br from-brand-green/20 to-zinc-900" },
  ],
};

export default function ProfilePage() {
  const { coins, level, targetUniversity, addCoins } = useUserStore();
  
  const [activeTab, setActiveTab] = useState<"borders" | "badges" | "backgrounds">("borders");
  
  const [selectedBorder, setSelectedBorder] = useState(items.borders[0]);
  const [selectedBackground, setSelectedBackground] = useState(items.backgrounds[0]);
  
  const [unlockedItems, setUnlockedItems] = useState<Set<string>>(new Set(["b1", "bg1", "bk1"]));

  const handleEquipOrBuy = (item: any) => {
    if (unlockedItems.has(item.id)) {
      if (item.type === "border") setSelectedBorder(item);
      if (item.type === "background") setSelectedBackground(item);
    } else {
      if (coins >= item.price) {
        addCoins(-item.price);
        setUnlockedItems(new Set([...unlockedItems, item.id]));
        if (item.type === "border") setSelectedBorder(item);
        if (item.type === "background") setSelectedBackground(item);
      } else {
        alert("Not enough BridgeCoins!");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Profile Card & Preview */}
      <div className={`rounded-3xl border border-border overflow-hidden transition-all duration-300 ${selectedBackground.style}`}>
        <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar Preview */}
          <div className="relative">
            <div className={`w-32 h-32 rounded-full bg-muted flex items-center justify-center transition-all duration-300 ${selectedBorder.style}`}>
              <User className="w-16 h-16 text-muted-foreground" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-brand-purple text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-background">
              Lvl {level}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Scholar_01</h1>
            <p className="text-muted-foreground mb-4">"Grinding for that full-ride scholarship."</p>
            
            <div className="inline-flex items-center gap-2 bg-background/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-border">
              <Shield className="w-5 h-5 text-brand-green" />
              <span className="font-medium">Target: {targetUniversity}</span>
            </div>
          </div>

          <div className="bg-background/80 backdrop-blur-md p-4 rounded-2xl border border-border text-center min-w-[150px]">
            <span className="text-sm text-muted-foreground font-medium block mb-1">Balance</span>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-brand-green">
              <Coins className="w-6 h-6" />
              {coins}
            </div>
          </div>
        </div>
      </div>

      {/* Customization Shop */}
      <div className="bg-card border border-border rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Avatar Shop</h2>
          
          <div className="flex bg-muted p-1 rounded-xl">
            {(["borders", "badges", "backgrounds"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize ${
                  activeTab === tab ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items[activeTab].map((item) => {
            const isUnlocked = unlockedItems.has(item.id);
            const isEquipped = 
              (item.type === "border" && selectedBorder.id === item.id) ||
              (item.type === "background" && selectedBackground.id === item.id);

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-2xl border flex flex-col items-center text-center relative overflow-hidden ${
                  isEquipped ? "border-brand-purple bg-brand-purple/5" : "border-border bg-background"
                }`}
              >
                {!isUnlocked && (
                  <div className="absolute top-2 right-2 text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </div>
                )}

                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 mt-2">
                  {item.type === "border" && 'style' in item && <div className={`w-12 h-12 rounded-full bg-transparent ${item.style}`} />}
                  {item.type === "background" && <ImageIcon className="w-8 h-8 text-muted-foreground" />}
                  {item.type === "badge" && <Award className="w-8 h-8 text-muted-foreground" />}
                </div>

                <h3 className="font-bold mb-1">{item.name}</h3>
                
                <div className="mt-auto pt-4 w-full">
                  <button
                    onClick={() => handleEquipOrBuy(item)}
                    disabled={isEquipped || (!isUnlocked && coins < item.price)}
                    className={`w-full py-2 rounded-xl text-sm font-bold transition-colors ${
                      isEquipped
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : isUnlocked
                        ? "bg-brand-purple text-white hover:bg-brand-purple/90"
                        : coins >= item.price
                        ? "bg-brand-green text-zinc-950 hover:bg-brand-green/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {isEquipped ? (
                      "Equipped"
                    ) : isUnlocked ? (
                      "Equip"
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <Coins className="w-4 h-4" /> {item.price}
                      </span>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
