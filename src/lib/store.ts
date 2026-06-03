import { create } from "zustand";

interface UserState {
  coins: number;
  level: number;
  streak: number;
  targetUniversity: string;
  isPremium: boolean;
  addCoins: (amount: number) => void;
  setPremium: (status: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  coins: 1250,
  level: 12,
  streak: 5,
  targetUniversity: "MIT - Computer Science",
  isPremium: false,
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  setPremium: (status) => set({ isPremium: status }),
}));
