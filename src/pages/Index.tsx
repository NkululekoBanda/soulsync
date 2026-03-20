import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Brain, Sparkles, Trophy, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 flex flex-col items-center justify-center px-6 text-white overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-pink-300/20 blur-3xl animate-pulse" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mb-4 shadow-lg">
          <Heart className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-2">
          SoulSync
        </h1>
        <p className="text-white/80 text-lg font-medium">
          The dating app that learns who you are
        </p>
      </motion.div>

      {/* Feature pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {[
          { icon: Brain, text: "Personality AI" },
          { icon: Trophy, text: "Earn XP" },
          { icon: Sparkles, text: "Smart Matches" },
          { icon: Star, text: "Daily Challenges" },
        ].map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold"
          >
            <Icon className="w-4 h-4" />
            {text}
          </div>
        ))}
      </motion.div>

      {/* Main tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center mb-10 max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-3 leading-snug">
          Every swipe teaches you something.
          Every match makes you better.
        </h2>
        <p className="text-white/70 text-base leading-relaxed">
          Answer optical illusions, earn XP, unlock matches, and discover who you truly are — one dilemma at a time.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-sm space-y-3"
      >
        <Button
          onClick={() => navigate("/signup")}
          className="w-full h-14 rounded-2xl bg-white text-purple-600 font-black text-lg hover:bg-white/90 transition-all shadow-xl"
        >
          Get Started Free
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Button
          onClick={() => navigate("/login")}
          variant="outline"
          className="w-full h-14 rounded-2xl border-2 border-white/40 text-white font-bold text-base bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
        >
          I already have an account
        </Button>
      </motion.div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 text-white/50 text-xs text-center"
      >
        Free to join. No credit card required.
      </motion.p>

    </div>
  );
}
