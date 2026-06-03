"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useUserStore } from "@/lib/store";
import { useRouter } from "next/navigation";

interface FortuneWheelProps {
  isOpen: boolean;
  onClose: () => void;
}

const prizes = [
  "50% Off Subscription",
  "Free Mentor Session",
  "X3 Coin Booster",
  "Exclusive Border",
];

export function FortuneWheel({ isOpen, onClose }: FortuneWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);
  const { setPremium } = useUserStore();
  const [showCheckout, setShowCheckout] = useState(false);
  const router = useRouter();

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    
    // Simulate API call and spinning calculation
    const extraSpins = 5 * 360; // 5 full rotations
    const randomDegree = Math.floor(Math.random() * 360);
    const newRotation = rotation + extraSpins + randomDegree;
    
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      // Calculate which prize won based on rotation
      const normalizedDegree = newRotation % 360;
      // Wheel colors start at 45deg, so we offset by -45deg when calculating the slice
      const pointerAngleOnWheel = (360 - normalizedDegree - 45 + 360) % 360;
      const prizeIndex = Math.floor(pointerAngleOnWheel / 90);
      setWonPrize(prizes[prizeIndex]);
      
      setTimeout(() => setShowCheckout(true), 1000);
    }, 4000); // match transition duration
  };

  const handleCheckout = () => {
    setPremium(true);
    setShowCheckout(false);
    onClose();
    router.push("/dashboard/store");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={!spinning ? onClose : undefined}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
          >
            <div className="p-8 text-center space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold tracking-tight">Your Escape Plan</h2>
                {!spinning && !showCheckout && (
                  <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {!showCheckout ? (
                <>
                  <p className="text-muted-foreground">
                    Spin the wheel to lock in a special bonus for your scholarship journey.
                  </p>

                  <div className="relative w-64 h-64 mx-auto my-8">
                    {/* Wheel pointer */}
                    <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-6 h-8 bg-brand-purple z-20 pointer-polygon" style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }} />
                    
                    <motion.div
                      className="w-full h-full rounded-full border-4 border-border overflow-hidden relative"
                      animate={{ rotate: rotation }}
                      transition={{ duration: 4, type: "tween", ease: "circOut" }}
                    >
                      {/* Wheel Slices - Simulated with conic gradient */}
                      <div className="absolute inset-0" 
                        style={{
                          background: "conic-gradient(from 45deg, #8b5cf6 0deg 90deg, #10b981 90deg 180deg, #3b82f6 180deg 270deg, #f59e0b 270deg 360deg)"
                        }}
                      />
                      {/* Prize Text */}
                      {prizes.map((prize, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 flex items-center justify-end"
                          style={{ transform: `rotate(${i * 90}deg)` }}
                        >
                          <span className="text-white font-bold text-[11px] leading-tight w-1/2 text-right pr-6 drop-shadow-md">
                            {prize}
                          </span>
                        </div>
                      ))}
                      {/* Divider lines */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full h-1 bg-border/50 absolute rotate-[45deg]" />
                        <div className="w-full h-1 bg-border/50 absolute rotate-[135deg]" />
                      </div>
                      <div className="absolute inset-0 rounded-full shadow-inner pointer-events-none" />
                    </motion.div>
                  </div>

                  <button
                    onClick={spinWheel}
                    disabled={spinning || wonPrize !== null}
                    className="w-full h-14 bg-gradient-to-r from-brand-purple to-brand-green text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {spinning ? "Spinning..." : wonPrize ? `You won: ${wonPrize}!` : "Spin the Wheel!"}
                    {!spinning && !wonPrize && <Sparkles className="w-5 h-5" />}
                  </button>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="w-20 h-20 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-10 h-10 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">You won: {wonPrize}!</h3>
                    <p className="text-muted-foreground">
                      Upgrade to StudyBridge Premium now to claim your prize and unlock all VIP features.
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-xl border border-brand-purple/30 text-left space-y-2">
                    <h4 className="font-bold">Premium Subscription</h4>
                    <p className="text-sm text-muted-foreground">5,000 ₸ / month</p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li className="flex items-center gap-2"><span>✨</span> Your Prize: {wonPrize}</li>
                      <li className="flex items-center gap-2"><span>🚀</span> X3 Coin Booster</li>
                      <li className="flex items-center gap-2"><span>🤝</span> Unlock Referrals</li>
                    </ul>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full h-14 bg-brand-purple text-white rounded-xl font-bold text-lg hover:bg-brand-purple/90 transition-colors"
                  >
                    Lock in Prize & Subscribe
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
