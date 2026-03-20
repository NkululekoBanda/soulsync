import { useGame } from "@/contexts/GameContext";
import { XpBar } from "@/components/XpBar";
import { getLevel, UNLOCKS, isFeatureUnlocked } from "@/lib/xp";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, Flame, Trophy, Brain, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const { xp, userName, dailyStreak, quizzesCompleted, logout } = useGame();
  const level = getLevel(xp);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-6 pt-12 pb-16 rounded-b-3xl shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate("/")} className="p-2 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <button onClick={handleLogout} className="p-2 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
            <LogOut className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl gradient-hero border-4 border-primary-foreground/30 flex items-center justify-center text-4xl mx-auto mb-3 shadow-glow">
            🌟
          </div>
          <h1 className="text-2xl font-black text-primary-foreground">{userName}</h1>
          <p className="text-primary-foreground/80 text-sm font-semibold mt-1">{level.label} • Level {level.level}</p>
        </div>
        <div className="mt-6">
          <XpBar />
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-4">
        <div className="grid grid-cols-3 gap-3 animate-fade-in">
          <div className="bg-card rounded-2xl p-4 text-center shadow-card">
            <Flame className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-black text-foreground">{dailyStreak}</p>
            <p className="text-xs text-muted-foreground">Streak</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-card">
            <Trophy className="w-5 h-5 text-xp mx-auto mb-1" />
            <p className="text-lg font-black text-foreground">{xp}</p>
            <p className="text-xs text-muted-foreground">XP</p>
          </div>
          <div className="bg-card rounded-2xl p-4 text-center shadow-card">
            <Brain className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-lg font-black text-foreground">{quizzesCompleted}</p>
            <p className="text-xs text-muted-foreground">Quizzes</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-bold text-foreground mb-3">Achievements</h2>
          <div className="space-y-3">
            {Object.entries(UNLOCKS).map(([lvl, features]) => {
              const unlocked = isFeatureUnlocked(xp, Number(lvl));
              return (
                <div key={lvl} className={`flex items-center gap-3 p-3 rounded-xl ${unlocked ? "bg-success/10" : "gradient-locked"}`}>
                  {unlocked ? <span>✅</span> : <Lock className="w-4 h-4 text-muted-foreground" />}
                  <div>
                    <p className={`text-sm font-semibold ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                      {features.join(", ")}
                    </p>
                    <p className="text-xs text-muted-foreground">Level {lvl}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
