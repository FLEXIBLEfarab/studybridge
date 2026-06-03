"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, AlertTriangle } from "lucide-react";
import { FortuneWheel } from "@/components/FortuneWheel";

const questions = [
  {
    id: 1,
    question: "If 3x - y = 12 and y = 3, what is the value of x?",
    options: ["3", "4", "5", "6"],
    answer: "5",
  },
  {
    id: 2,
    question: "Which of the following is equivalent to (x^2 - 4) / (x - 2)?",
    options: ["x - 2", "x + 2", "x^2", "x"],
    answer: "x + 2",
  },
  {
    id: 3,
    question: "A store sells shirts for $20 each. If a customer buys 3 shirts, they get a 10% discount on the total. How much do they pay?",
    options: ["$60", "$50", "$54", "$58"],
    answer: "$54",
  },
];

export default function DiagnosticPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [wheelOpen, setWheelOpen] = useState(false);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">The Reality Check</h1>
          <p className="text-xl text-muted-foreground">Here is where you stand right now.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Comparison Chart */}
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm space-y-8">
            <h3 className="text-xl font-bold">Your Progress</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Your Current Level</span>
                  <span className="text-red-500">35%</span>
                </div>
                <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span className="text-muted-foreground">Target for Scholarship</span>
                  <span className="text-brand-green">90%</span>
                </div>
                <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-brand-green"
                    initial={{ width: 0 }}
                    animate={{ width: "90%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-3 text-orange-500 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">You have a 55% gap to close before the exam date.</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Verdict & CTA */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-brand-purple/20 to-brand-green/20 border border-brand-purple/30 p-8 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Brain className="w-24 h-24" />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-purple" />
                AI Verdict
              </h3>
              <p className="text-lg leading-relaxed font-medium">
                "With these scores, your chance of getting a scholarship is like surviving a zombie apocalypse with a water gun. But don't panic, we have an escape plan."
              </p>
            </div>

            <button
              onClick={() => setWheelOpen(true)}
              className="w-full h-16 bg-brand-purple text-white rounded-2xl font-bold text-xl hover:bg-brand-purple/90 transition-all flex items-center justify-center gap-3 animate-pulse shadow-[0_0_30px_-5px_rgba(139,92,246,0.6)]"
            >
              Claim Your Escape Plan
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <FortuneWheel isOpen={wheelOpen} onClose={() => setWheelOpen(false)} />
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-brand-purple">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-muted-foreground text-sm">Diagnostic Quiz</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-purple transition-all duration-300"
            style={{ width: `${((currentQ) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <motion.div
        key={currentQ}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-card border border-border p-8 rounded-3xl shadow-sm"
      >
        <h2 className="text-2xl font-bold mb-8">{q.question}</h2>
        
        <div className="space-y-4">
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="w-full p-4 rounded-xl border-2 border-border text-left hover:border-brand-purple hover:bg-brand-purple/5 transition-all font-medium text-lg"
            >
              {opt}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Dummy Sparkles component for the diagnostic page since we didn't export it from lucide
function Sparkles(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>;
}
