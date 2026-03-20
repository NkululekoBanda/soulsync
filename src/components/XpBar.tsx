import { getLevel, getNextLevel, getProgress } from "@/lib/xp";
import { useGame } from "@/contexts/GameContext";
import { Progress } from "@/components/ui/progress";

export function XpBar() {
  const { xp } = useGame();
  const level = getLevel(xp);
  const next = getNextLevel(xp);
  const progress = getProgress(xp);

  return (
    <div className="w-full space-y-2 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="gradient-hero text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            Lvl {level.level}
          </span>
          <span className="text-sm font-semibold text-foreground">{level.label}</span>
        </div>
        <span className="text-xs font-semibold text-muted-foreground">
          {xp} XP {next ? `/ ${next.xpRequired}` : "MAX"}
        </span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden bg-muted">
        <div
          className="h-full gradient-xp rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
