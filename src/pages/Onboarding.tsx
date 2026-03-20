import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, Timer, Sparkles } from "lucide-react";

interface IllusionQuestion {
  key: string;
  title: string;
  description: string;
  optionA: string;
  optionB: string;
  dimension: string;
}

const illusions: IllusionQuestion[] = [
  {
    key: "duck-rabbit",
    title: "What do you see first?",
    description: "Look at this image and go with your gut reaction.",
    optionA: "A duck",
    optionB: "A rabbit",
    dimension: "ambiguityTolerance",
  },
  {
    key: "rubin-vase",
    title: "Faces or vase?",
    description: "Don't overthink it — first impression only.",
    optionA: "A vase",
    optionB: "Two faces",
    dimension: "conformity",
  },
  {
    key: "old-young-woman",
    title: "Who do you see?",
    description: "Focus on the image and answer honestly.",
    optionA: "A young woman",
    optionB: "An old woman",
    dimension: "empathy",
  },
  {
    key: "necker-cube",
    title: "Which way does it face?",
    description: "The cube can be seen from two angles.",
    optionA: "Facing down-left",
    optionB: "Facing up-right",
    dimension: "rigidity",
  },
  {
    key: "spinning-dancer",
    title: "Which direction is she spinning?",
    description: "Watch for a moment, then answer.",
    optionA: "Clockwise",
    optionB: "Counter-clockwise",
    dimension: "creativity",
  },
];

const illusionImages: Record<string, string> = {
  "duck-rabbit": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/02/14/12/duck-rabbit.png",
  "rubin-vase": "https://a.storyblok.com/f/253271/630x480/990db67c9e/rubin2.jpg/m/",
  "old-young-woman": "https://images.7news.com.au/publication/C-11983088/987ff3a6b224d090b65182ca912612cf2a0c3cae-16x9-x0y1w4075h2292.jpg?imwidth=1200",
  "necker-cube": "https://media.sciencephoto.com/image/c0555541/800wm/C0555541-Necker_cube_optical_illusion,_illustration.jpg",
  "spinning-dancer": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Spinning_Dancer.gif/250px-Spinning_Dancer.gif",
};

const generateInsight = (answers: Record<string, string>) => {
  const traits: string[] = [];
  const matchTraits: string[] = [];

  if (answers["duck-rabbit"] === "A duck") {
    traits.push("instinctive and action-oriented");
    matchTraits.push("decisive");
  } else {
    traits.push("thoughtful and detail-focused");
    matchTraits.push("reflective");
  }

  if (answers["rubin-vase"] === "A vase") {
    traits.push("independent and self-directed");
    matchTraits.push("someone who values personal space");
  } else {
    traits.push("deeply people-aware");
    matchTraits.push("emotionally expressive partners");
  }

  if (answers["old-young-woman"] === "A young woman") {
    traits.push("optimistic and future-focused");
    matchTraits.push("ambitious and growth-minded");
  } else {
    traits.push("wise and experience-driven");
    matchTraits.push("grounded and emotionally mature");
  }

  if (answers["necker-cube"] === "Facing down-left") {
    traits.push("grounded and practical");
    matchTraits.push("stable and reliable");
  } else {
    traits.push("visionary and big-picture thinking");
    matchTraits.push("creative and open-minded");
  }

  if (answers["spinning-dancer"] === "Clockwise") {
    traits.push("intuitive and emotionally driven");
    matchTraits.push("empathetic and feeling-led");
  } else {
    traits.push("logical and analytically sharp");
    matchTraits.push("rational and solution-focused");
  }

  const top2Traits = traits.slice(0, 2).join(" and ");
  const top2Match = matchTraits.slice(0, 2).join(" and ");

  return {
    headline: `You are ${top2Traits}.`,
    body: `Your mind naturally gravitates toward ${top2Match} people. That tension between how you see the world and how others do is exactly what makes your connections either electric or flat. SoulSync will use this to find you matches who challenge you in the right ways.`,
    portrait: { traits, matchTraits, answers },
  };
};

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const current = illusions[step];
  const isComplete = step >= illusions.length;

  const handleAnswer = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [current.key]: answer }));
    if (step < illusions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(illusions.length);
    }
  };

  const insight = isComplete ? generateInsight(answers) : null;

  useEffect(() => {
    if (isComplete && insight) {
      localStorage.setItem("soulsync_portrait_seed", JSON.stringify(insight.portrait));
    }
  }, [isComplete, insight]);

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-3">
            {insight?.headline}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            {insight?.body}
          </p>
          <div className="bg-secondary rounded-2xl p-4 mb-8 text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">
              Your personality seeds
            </p>
            <div className="flex flex-wrap gap-2">
              {insight?.portrait.traits.map((trait, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate("/")}
          >
            Build My Portrait
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!current) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md mb-10">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted-foreground">
            <Eye className="inline h-4 w-4 mr-1" />
            Illusion {step + 1} of {illusions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            <Timer className="inline h-4 w-4 mr-1" />
            Go with your gut
          </span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((step + 1) / illusions.length) * 100}%`,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <div className="w-full rounded-2xl overflow-hidden mb-8 bg-white flex items-center justify-center"
          style={{ minHeight: '280px' }}>
            <img
              src={illusionImages[current.key]}
              alt={current.title}
              style={{
                width: '100%',
                height: '280px',
                objectFit: 'contain',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {current.title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {current.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleAnswer(current.optionA)}
              className="h-14 text-base"
            >
              {current.optionA}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleAnswer(current.optionB)}
              className="h-14 text-base"
            >
              {current.optionB}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Onboarding;