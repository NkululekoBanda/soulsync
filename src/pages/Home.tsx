import { useGame } from "@/contexts/GameContext";
import { XpBar } from "@/components/XpBar";
import { MatchCard } from "@/components/MatchCard";
import { DailyChallenge } from "@/components/DailyChallenge";
import { MOCK_MATCHES } from "@/lib/mock-data";
import { getLevel, UNLOCKS, isFeatureUnlocked } from "@/lib/xp";
import { Flame, Trophy, Zap, Lock } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const { xp, userName, dailyStreak, quizzesCompleted, claimDailyLogin } = useGame();
  const level = getLevel(xp);

  useEffect(() => {
    claimDailyLogin();
  }, []);

  return (
    <div className="min-h-screen pb-28"
      style={{ background: 'linear-gradient(180deg, hsl(30,15%,97%) 0%, hsl(0,0%,100%) 100%)' }}
    >
      {/* Header */}
      <div className="px-6 pt-12 pb-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, hsl(358,72%,38%) 0%, hsl(20,80%,45%) 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 20%, white 0%, transparent 60%)`,
          }}
        />
        <div className="relative">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-white/70 text-xs font-body tracking-widest uppercase mb-1">
                Good to see you
              </p>
              <h1 className="font-display text-3xl text-white"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
              >
                {userName}
              </h1>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-200" />
              <span className="text-xs font-body font-semibold text-white">
                {dailyStreak} day streak
              </span>
            </div>
          </div>
          <XpBar />
        </div>
      </div>

      <div className="px-5 space-y-7 mt-6">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in"
          style={{ animationDelay: '0.05s' }}
        >
          <StatCard
            icon={<Trophy className="w-4 h-4" style={{ color: 'hsl(358,72%,42%)' }} />}
            value={`Lvl ${level.level}`}
            label="Level"
          />
          <StatCard
            icon={<Zap className="w-4 h-4 text-accent" />}
            value={`${xp}`}
            label="Total XP"
          />
          <StatCard
            icon={<Flame className="w-4 h-4 text-orange-400" />}
            value={`${quizzesCompleted}`}
            label="Quizzes"
          />
        </div>

        {/* Daily Challenge */}
        <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full"
              style={{ background: 'hsl(358,72%,42%)' }}
            />
            <h2 className="font-display text-xl text-foreground"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Daily Challenge
            </h2>
          </div>
          <DailyChallenge />
        </section>

        {/* Unlocks */}
        <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full"
              style={{ background: 'hsl(358,72%,42%)' }}
            />
            <h2 className="font-display text-xl text-foreground"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Unlocks
            </h2>
          </div>
          <div className="space-y-2">
            {Object.entries(UNLOCKS).map(([lvl, features]) => {
              const unlocked = isFeatureUnlocked(xp, Number(lvl));
              return (
                <div
                  key={lvl}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all card-hover ${
                    unlocked
                      ? 'bg-white border border-green-100'
                      : 'bg-secondary/50 border border-border/40'
                  }`}
                >
                  {unlocked ? (
                    <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">✓</span>
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-body font-medium truncate ${
                      unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {features.join(', ')}
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">
                      Level {lvl} required
                    </p>
                  </div>
                  {unlocked && (
                    <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Matches */}
        <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 rounded-full"
              style={{ background: 'hsl(358,72%,42%)' }}
            />
            <h2 className="font-display text-xl text-foreground"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Your Matches
            </h2>
          </div>
          {isFeatureUnlocked(xp, 2) ? (
            <div className="space-y-3">
              {MOCK_MATCHES.map((match) => (
                <MatchCard key={match.id} profile={match} userXp={xp} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl p-8 text-center border border-border/40"
              style={{ background: 'linear-gradient(135deg, hsl(30,15%,95%), hsl(30,15%,92%))' }}
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-body font-semibold text-foreground mb-1">
                Matches unlock at Level 2
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Earn 50 XP to reveal your first match
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 text-center shadow-card card-hover border border-border/30">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-lg font-body font-bold text-foreground leading-none">
        {value}
      </p>
      <p className="text-xs text-muted-foreground font-body mt-1 tracking-wide">
        {label}
      </p>
    </div>
  );
}
