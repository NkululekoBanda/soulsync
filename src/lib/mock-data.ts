export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  level: number;
  avatar: string;
  matchReason?: string;
}

export const MOCK_MATCHES: UserProfile[] = [
  {
    id: "1",
    name: "Luna",
    age: 26,
    bio: "Psychology enthusiast & cat lover. Let's learn about love together! 💕",
    interests: ["Psychology", "Quizzes", "Reading", "Yoga"],
    level: 3,
    avatar: "🌙",
    matchReason: "Both enjoy psychology and quizzes",
  },
  {
    id: "2",
    name: "Alex",
    age: 28,
    bio: "Adventurer at heart. I believe in growing together through shared experiences.",
    interests: ["Travel", "Communication", "Cooking", "Quizzes"],
    level: 4,
    avatar: "⚡",
    matchReason: "Both love learning and quizzes",
  },
  {
    id: "3",
    name: "Mia",
    age: 24,
    bio: "Emotional intelligence nerd. Looking for deep conversations 🧠",
    interests: ["Psychology", "Meditation", "Art", "Relationships"],
    level: 2,
    avatar: "🌸",
    matchReason: "Shared interest in emotional growth",
  },
];

export const CHAT_PROMPTS = [
  "What did you learn today?",
  "What's your favorite love language?",
  "Share something that made you smile recently 😊",
  "What's a relationship lesson you've learned?",
  "If you could master any skill, what would it be?",
];

export interface ChatMessage {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}
