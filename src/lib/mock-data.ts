export interface UserProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  level: number;
  bio: string;
  interests: string[];
  matchReason?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}

export const MOCK_MATCHES: UserProfile[] = [
  {
    id: "1",
    name: "Sarah",
    age: 24,
    avatar: "🎨",
    level: 3,
    bio: "Digital artist who loves optical illusions and psychology. Looking for someone to explore museums with.",
    interests: ["Art", "Psychology", "Coffee"],
    matchReason: "High creative compatibility"
  },
  {
    id: "2",
    name: "Alex",
    age: 26,
    avatar: "🏔️",
    level: 4,
    bio: "Adventure seeker and philosophy enthusiast. Let's debate the meaning of life on a hiking trail.",
    interests: ["Hiking", "Philosophy", "Travel"],
    matchReason: "Shared values on growth"
  },
  {
    id: "3",
    name: "Jordan",
    age: 25,
    avatar: "🎵",
    level: 2,
    bio: "Musician and night owl. I express myself better through melodies than words.",
    interests: ["Music", "Concerts", "Vinyl"],
    matchReason: "Emotional resonance"
  }
];

export const CHAT_PROMPTS = [
  "What's your favorite book?",
  "Tell me about your passion.",
  "What's the best advice you've received?",
  "Dream travel destination?"
];