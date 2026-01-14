import { UserProgress, ConfidenceLevel } from './types';

// NOTE: In-memory storage for demonstration purposes only.
// In production, replace this with a persistent database (e.g., PostgreSQL, MongoDB)
// or use server-side sessions with a database backend.
const progressStore = new Map<string, UserProgress>();

export function updateProgress(
  puzzleId: string,
  isCorrect: boolean
): UserProgress {
  const existing = progressStore.get(puzzleId) || {
    puzzleId,
    attempts: 0,
    correctAttempts: 0,
    lastAttempt: new Date(),
    confidence: 0,
  };

  const updated: UserProgress = {
    ...existing,
    attempts: existing.attempts + 1,
    correctAttempts: existing.correctAttempts + (isCorrect ? 1 : 0),
    lastAttempt: new Date(),
    confidence: 0,
  };

  updated.confidence = updated.correctAttempts / updated.attempts;
  
  progressStore.set(puzzleId, updated);
  return updated;
}

export function getProgress(puzzleId: string): UserProgress | undefined {
  return progressStore.get(puzzleId);
}

export function getConfidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence >= 0.8) return 'high';
  if (confidence >= 0.5) return 'medium';
  return 'low';
}

export function getAllProgress(): UserProgress[] {
  return Array.from(progressStore.values());
}
