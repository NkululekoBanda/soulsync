export const LEVEL_THRESHOLDS = [
  0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500,
];
export const LEVEL_LABELS = [
  "Novice", "Explorer", "Apprentice", "Thinker",
  "Philosopher", "Scholar", "Sage", "Master",
  "Grandmaster", "Enlightened",
];
export const UNLOCKS: Record<number, string[]> = {
  2: ["Matches", "Profile Details"],
  3: ["Chat", "Trivia"],
  5: ["Full Profiles", "Advanced Stats"],
};
export function getLevel(xp: number) {
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return {
    level,
    label: LEVEL_LABELS[level - 1] || "Unknown",
    minXp: LEVEL_THRESHOLDS[level - 1],
  };
}
export function getNextLevel(xp: number) {
  const { level } = getLevel(xp);
  if (level >= LEVEL_THRESHOLDS.length) return null;
  return {
    level: level + 1,
    xpRequired: LEVEL_THRESHOLDS[level],
  };
}
export function getProgress(xp: number) {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const currentLevelXp = current.minXp;
  const nextLevelXp = next.xpRequired;
  const levelSpan = nextLevelXp - currentLevelXp;
  const currentProgress = xp - currentLevelXp;
  return Math.min(100, Math.max(0, (currentProgress / levelSpan) * 100));
}
export function isFeatureUnlocked(xp: number, requiredLevel: number) {
  const { level } = getLevel(xp);
  return level >= requiredLevel;
}
