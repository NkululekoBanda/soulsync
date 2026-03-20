import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGame } from "@/contexts/GameContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useGame();
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    login(name || "User");
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, hsl(20,30%,96%) 0%, hsl(358,20%,94%) 100%)'
      }}
    >
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, hsl(24,85%,53%), transparent)' }}
      />
      <div className="absolute bottom-[-5%] right-[-8%] w-72 h-72 rounded-full opacity-8"
        style={{ background: 'radial-gradient(circle, hsl(358,72%,42%), transparent)' }}
      />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm animate-scale-pop">

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
              style={{ background: 'linear-gradient(145deg, hsl(358,72%,42%), hsl(24,85%,53%))' }}
            >
              <Heart className="w-7 h-7 text-white" />
            </div>
            <h1 className="font-display text-4xl text-foreground mb-2"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300 }}
            >
              Begin your story
            </h1>
            <p className="text-muted-foreground text-sm font-body tracking-wide">
              Learn who you are. Find who you need.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 shadow-card space-y-4">
            <form onSubmit={handleSignUp} className="space-y-3">
              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 rounded-xl border-border/60 bg-secondary/40 font-body text-sm placeholder:text-muted-foreground/60"
              />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl border-border/60 bg-secondary/40 font-body text-sm placeholder:text-muted-foreground/60"
              />
              <Input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl border-border/60 bg-secondary/40 font-body text-sm placeholder:text-muted-foreground/60"
              />

              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-body font-semibold text-sm text-white tracking-wide shadow-soft hover:opacity-90 transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, hsl(358,72%,42%), hsl(24,85%,53%))' }}
              >
                Create Account
              </Button>
            </form>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border/60" />
              <span className="text-xs text-muted-foreground font-body">or</span>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 rounded-xl font-body font-medium text-sm border-border/60 hover:bg-secondary/50 transition-all"
            onClick={handleSignUp}
            >
              <Sparkles className="w-4 h-4 mr-2 text-accent" />
              Sign up with Google
            </Button>
          </div>

          <p className="text-center text-muted-foreground text-sm font-body mt-6">
            Already have an account?{" "}
            <Link to="/login"
              className="font-semibold hover:underline"
              style={{ color: 'hsl(358, 72%, 42%)' }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
