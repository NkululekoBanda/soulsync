import { useState } from "react";
import { useGame } from "@/contexts/GameContext";
import { QUESTIONS } from "@/lib/quiz-data";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

export function DailyChallenge() {
  const { addXp } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = QUESTIONS[currentIndex % QUESTIONS.length];

  const handleAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === question.correctIndex) {
      addXp(20, "Quiz correct answer 🧠");
    }
  };

  const nextQuestion = () => {
    setCurrentIndex((p) => p + 1);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="bg-card rounded-2xl p-5 shadow-card">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-accent bg-accent/15 px-2 py-0.5 rounded-full">{question.category}</span>
        <span className="text-xs text-muted-foreground font-medium">+20 XP</span>
      </div>
      <h3 className="text-base font-bold text-foreground mt-3 mb-4">{question.question}</h3>
      <div className="space-y-2">
        {question.options.map((opt, i) => {
          let variant = "outline" as const;
          let extraClass = "border-border/60 text-foreground";
          
          if (isAnswered) {
            if (i === question.correctIndex) {
              extraClass = "border-success bg-success/10 text-success";
            } else if (i === selectedAnswer) {
              extraClass = "border-destructive bg-destructive/10 text-destructive";
            } else {
              extraClass = "opacity-50 border-border/30";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={isAnswered}
              className={`w-full text-left p-3 rounded-xl border text-sm font-medium transition-all active:scale-[0.98] ${extraClass}`}
            >
              <div className="flex items-center gap-2">
                <span className="flex-1">{opt}</span>
                {isAnswered && i === question.correctIndex && <CheckCircle className="w-4 h-4 text-success" />}
                {isAnswered && i === selectedAnswer && i !== question.correctIndex && <XCircle className="w-4 h-4 text-destructive" />}
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
              <span className="text-destructive">Not quite! The correct answer was highlighted.</span>
            )}
          </p>
          <Button onClick={nextQuestion} className="w-full h-11 rounded-xl gradient-hero text-primary-foreground font-bold shadow-soft hover:opacity-90 transition-opacity">
            Next Question <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
