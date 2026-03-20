import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_MATCHES, CHAT_PROMPTS, ChatMessage } from "@/lib/mock-data";
import { useGame } from "@/contexts/GameContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Lightbulb, Zap } from "lucide-react";

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addXp } = useGame();
  const profile = MOCK_MATCHES.find((m) => m.id === id);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", text: `Hey! I'm ${profile?.name}. What did you learn today? 😊`, sender: "other", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [showPrompts, setShowPrompts] = useState(false);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Chat not found</p>
      </div>
    );
  }

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const myMsg: ChatMessage = { id: Date.now().toString(), text, sender: "me", timestamp: new Date() };
    setMessages((p) => [...p, myMsg]);
    setInput("");

    setTimeout(() => {
      const replies = [
        "That's really interesting! 😄",
        "I love how you think about that!",
        "Tell me more! 🤔",
        "I totally agree! We should explore that topic together.",
        "That's a great perspective! 💕",
      ];
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: replies[Math.floor(Math.random() * replies.length)],
        sender: "other",
        timestamp: new Date(),
      };
      setMessages((p) => [...p, reply]);
    }, 1200);
  };

  const startTrivia = () => {
    addXp(20, "Trivia challenge in chat 🎮");
    const msg: ChatMessage = {
      id: Date.now().toString(),
      text: "🎯 Trivia Challenge! You earned +20 XP! Let's keep learning together!",
      sender: "other",
      timestamp: new Date(),
    };
    setMessages((p) => [...p, msg]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 shadow-card">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center text-lg">
          {profile.avatar}
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-foreground text-sm">{profile.name}</h2>
          <p className="text-xs text-muted-foreground">Level {profile.level}</p>
        </div>
        <Button size="sm" variant="outline" className="rounded-lg text-xs gap-1" onClick={startTrivia}>
          <Zap className="w-3 h-3" /> Trivia
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} animate-fade-in`}>
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium ${
                msg.sender === "me"
                  ? "gradient-hero text-primary-foreground rounded-br-md"
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Prompts */}
      {showPrompts && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto animate-fade-in">
          {CHAT_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => { sendMessage(prompt); setShowPrompts(false); }}
              className="whitespace-nowrap text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full font-medium hover:bg-accent/20 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="bg-card border-t border-border px-4 py-3 flex items-center gap-2">
        <button
          onClick={() => setShowPrompts(!showPrompts)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Lightbulb className="w-5 h-5 text-xp" />
        </button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Type a message..."
          className="flex-1 h-10 rounded-xl bg-secondary/50 border-border/50"
        />
        <button
          onClick={() => sendMessage(input)}
          className="p-2.5 rounded-xl gradient-hero shadow-soft active:scale-95 transition-transform"
        >
          <Send className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>
    </div>
  );
}
