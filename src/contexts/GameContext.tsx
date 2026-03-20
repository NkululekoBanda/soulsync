import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { getLevel, getNextLevel } from "@/lib/xp";
import { useToast } from "@/hooks/use-toast";

interface GameState {
  xp: number;
  isLoggedIn: boolean;
  userName: string;
  dailyStreak: number;
  quizzesCompleted: number;
  lastLoginDate: string | null;
  addXp: (amount: number, reason: string) => void;
  login: (name: string) => void;
  logout: () => void;
  claimDailyLogin: () => boolean;
}

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [dailyStreak, setDailyStreak] = useState(0);
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);
  const [lastLoginDate, setLastLoginDate] = useState<string | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const { toast } = useToast();

  const addXp = useCallback((amount: number, reason: string) => {
    toast({
      title: `+${amount} XP earned! ✨`,
      description: reason,
    });

    if (reason.toLowerCase().includes("quiz")) {
      setQuizzesCompleted((p) => p + 1);
    }

    setXp((prev) => {
      const newXp = prev + amount;
      const oldLevel = getLevel(prev);
      const newLevel = getLevel(newXp);

      if (newLevel.level > oldLevel.level) {
        setTimeout(() => {
          toast({
            title: `🎉 Level Up!`,
            description: `You're now Level ${newLevel.level} — ${newLevel.label}!`,
          });
        }, 600);
      }

      return newXp;
    });
  }, [toast]);

  const login = useCallback((name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserName("");
    setXp(0);
    setDailyStreak(0);
    setQuizzesCompleted(0);
    setLastLoginDate(null);
  }, []);

  const claimDailyLogin = useCallback(() => {
    const today = new Date().toDateString();
    if (lastLoginDate === today) return false;
    setLastLoginDate(today);
    setDailyStreak((p) => p + 1);
    addXp(10, "Daily login streak 🔥");
    return true;
  }, [lastLoginDate, addXp]);

  return (
    <GameContext.Provider
      value={{ xp, isLoggedIn, userName, dailyStreak, quizzesCompleted, lastLoginDate, addXp, login, logout, claimDailyLogin }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
