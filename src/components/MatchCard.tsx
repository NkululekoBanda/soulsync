import { UserProfile } from "@/lib/mock-data";
import { isFeatureUnlocked } from "@/lib/xp";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MatchCard({ profile, userXp }: { profile: UserProfile; userXp: number }) {
  const navigate = useNavigate();
  const canSeePartial = isFeatureUnlocked(userXp, 2);
  const canSeeFull = isFeatureUnlocked(userXp, 5);

  return (
    <div
      className="bg-card rounded-2xl p-4 shadow-card cursor-pointer hover:shadow-soft transition-all active:scale-[0.98]"
      onClick={() => navigate(`/profile/${profile.id}`)}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center text-2xl shadow-soft">
          {profile.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground">{profile.name}</h3>
            <span className="text-xs bg-accent/15 text-accent font-semibold px-2 py-0.5 rounded-full">Lvl {profile.level}</span>
          </div>
          {canSeePartial ? (
            <p className="text-sm text-muted-foreground truncate">{canSeeFull ? profile.bio : profile.bio.slice(0, 40) + "..."}</p>
          ) : (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span className="text-xs">Unlock at Level 2</span>
            </div>
          )}
        </div>
      </div>
      {profile.matchReason && canSeePartial && (
        <div className="mt-3 bg-secondary rounded-xl px-3 py-2">
          <p className="text-xs text-secondary-foreground font-medium">
            💡 Why you matched: {profile.matchReason}
          </p>
        </div>
      )}
      {canSeePartial && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {profile.interests.slice(0, canSeeFull ? undefined : 2).map((i) => (
            <span key={i} className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">{i}</span>
          ))}
          {!canSeeFull && profile.interests.length > 2 && (
            <span className="text-xs text-muted-foreground font-medium">+{profile.interests.length - 2} more</span>
          )}
        </div>
      )}
    </div>
  );
}
