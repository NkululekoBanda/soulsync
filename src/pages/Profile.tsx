import { useParams, useNavigate } from "react-router-dom";
import { MOCK_MATCHES } from "@/lib/mock-data";
import { useGame } from "@/contexts/GameContext";
import { isFeatureUnlocked } from "@/lib/xp";
import { ArrowLeft, Lock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { xp } = useGame();
  const profile = MOCK_MATCHES.find((m) => m.id === id);
  const canSeePartial = isFeatureUnlocked(xp, 2);
  const canChat = isFeatureUnlocked(xp, 3);
  const canSeeFull = isFeatureUnlocked(xp, 5);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-hero px-6 pt-12 pb-16 rounded-b-3xl shadow-soft relative">
        <button onClick={() => navigate(-1)} className="absolute top-12 left-4 p-2 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
          <ArrowLeft className="w-5 h-5 text-primary-foreground" />
        </button>
        <div className="text-center pt-4">
          <div className="w-20 h-20 rounded-2xl gradient-hero border-4 border-primary-foreground/30 flex items-center justify-center text-4xl mx-auto mb-3 shadow-glow">
            {profile.avatar}
          </div>
          <h1 className="text-2xl font-black text-primary-foreground">{profile.name}, {profile.age}</h1>
          <span className="text-sm text-primary-foreground/80 font-semibold">Level {profile.level}</span>
        </div>
      </div>

      <div className="px-6 -mt-6 space-y-4">
        {/* Bio */}
        <div className="bg-card rounded-2xl p-5 shadow-card animate-fade-in">
          <h2 className="text-sm font-bold text-foreground mb-2">About</h2>
          {canSeePartial ? (
            <p className="text-sm text-muted-foreground">{canSeeFull ? profile.bio : profile.bio.slice(0, 50) + "..."}</p>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Earn 50 XP to unlock</span>
            </div>
          )}
        </div>

        {/* Interests */}
        <div className="bg-card rounded-2xl p-5 shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-sm font-bold text-foreground mb-3">Interests</h2>
          {canSeePartial ? (
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, i) => {
                const locked = !canSeeFull && i >= 2;
                return (
                  <span
                    key={interest}
                    className={`text-sm px-3 py-1.5 rounded-full font-semibold ${
                      locked ? "gradient-locked text-muted-foreground blur-[2px]" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {interest}
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="gradient-locked rounded-xl p-6 text-center">
              <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Unlock at Level 2</p>
            </div>
          )}
        </div>

        {/* Match reason */}
        {profile.matchReason && canSeePartial && (
          <div className="bg-secondary rounded-2xl p-4 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <p className="text-sm font-medium text-secondary-foreground">💡 {profile.matchReason}</p>
          </div>
        )}

        {/* Chat button */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {canChat ? (
            <Button
              className="w-full h-12 rounded-xl gradient-hero text-primary-foreground font-bold shadow-soft hover:opacity-90 transition-opacity"
              onClick={() => navigate(`/chat/${profile.id}`)}
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Start Chat
            </Button>
          ) : (
            <div className="gradient-locked rounded-xl p-4 text-center">
              <Lock className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
              <p className="text-sm font-semibold text-muted-foreground">Reach Level 3 to chat</p>
              <p className="text-xs text-muted-foreground">Earn 150 XP to unlock</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
