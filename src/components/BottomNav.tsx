import { useLocation, useNavigate } from "react-router-dom";
import { Home, Brain, User, MessageCircle } from "lucide-react";
import { isFeatureUnlocked } from "@/lib/xp";
import { useGame } from "@/contexts/GameContext";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/quiz", icon: Brain, label: "Quiz" },
  { path: "/chats", icon: MessageCircle, label: "Chat", requiredLevel: 3 },
  { path: "/me", icon: User, label: "Profile" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { xp } = useGame();

  // Hide nav on auth pages and individual chat
  if (["/login", "/signup", "/onboarding"].includes(location.pathname) || location.pathname.startsWith("/chat/")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Blur container */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-t border-border/40 shadow-lg" />
      
      <div className="relative max-w-md mx-auto flex items-center justify-around py-3 px-2 pb-6">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          const locked = item.requiredLevel && !isFeatureUnlocked(xp, item.requiredLevel);
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => !locked && navigate(item.path)}
              disabled={locked}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 relative group ${
                active ? "text-primary" : locked ? "text-muted-foreground/30" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`relative p-1 transition-transform duration-300 ${active ? "translate-y-[-2px]" : ""}`}>
                <Icon className={`w-6 h-6 ${active ? "stroke-[2.5px]" : "stroke-2"}`} />
                {active && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </div>
              <span className={`text-[10px] font-medium font-body transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
