import { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { QUESTIONS } from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight, Brain } from "lucide-react";

export default function Quiz() {
  const { addXp } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const question = QUESTIONS[currentIndex % QUESTIONS.length];
  const round = Math.floor(currentIndex / QUESTIONS.length) + 1;

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === question.correctIndex) {
      setScore((p) => p + 1);
      addXp(20, "Quiz correct answer 🧠");
    }
  };

  const nextQuestion = () => {
    setCurrentIndex((p) => p + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="gradient-hero px-6 pt-12 pb-8 rounded-b-3xl shadow-soft">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-7 h-7 text-primary-foreground" />
          <h1 className="text-2xl font-black text-primary-foreground">Daily Trivia</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-xs text-primary-foreground/70 font-medium">Score</p>
            <p className="text-xl font-black text-primary-foreground">{score}</p>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-xs text-primary-foreground/70 font-medium">Question</p>
            <p className="text-xl font-black text-primary-foreground">{(currentIndex % QUESTIONS.length) + 1}/{QUESTIONS.length}</p>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-xs text-primary-foreground/70 font-medium">Round</p>
            <p className="text-xl font-black text-primary-foreground">{round}</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 animate-fade-in">
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <span className="text-xs font-semibold text-accent bg-accent/15 px-2 py-0.5 rounded-full">{question.category}</span>
          <h3 className="text-base font-bold text-foreground mt-3 mb-4">{question.question}</h3>
          <div className="space-y-2">
            {question.options.map((opt, i) => {
              let extraClass = "border-border/60 text-foreground hover:bg-secondary/50";
              if (isAnswered) {
                if (i === question.correctIndex) extraClass = "border-success bg-success/10 text-success";
                else if (i === selectedAnswer) extraClass = "border-destructive bg-destructive/10 text-destructive";
                else extraClass = "opacity-50 border-border/30";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all active:scale-[0.98] ${extraClass}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1">{opt}</span>
                    {isAnswered && i === question.correctIndex && <CheckCircle className="w-4 h-4" />}
                    {isAnswered && i === selectedAnswer && i !== question.correctIndex && <XCircle className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <div className="mt-4 animate-fade-in">
              <p className="text-sm font-semibold mb-3">
                {selectedAnswer === question.correctIndex ? (
                  <span className="text-success">✨ Correct! +20 XP</span>
                ) : (
                  <span className="text-destructive">Not quite! Keep learning 💪</span>
                )}
              </p>
              <Button onClick={nextQuestion} className="w-full h-11 rounded-xl gradient-hero text-primary-foreground font-bold shadow-soft hover:opacity-90 transition-opacity">
                Next Question <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
