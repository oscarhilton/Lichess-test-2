export interface ChessPuzzle {
  id: string;
  name: string;
  description: string;
  fen: string;
  moves: string[];
  correctMove: string;
  explanation: string;
  trap?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  opening: string;
}

export interface UserProgress {
  puzzleId: string;
  attempts: number;
  correctAttempts: number;
  lastAttempt: Date;
  confidence: number;
}

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export interface MoveSubmission {
  puzzleId: string;
  move: string;
  currentFen: string;
}

export interface MoveResult {
  correct: boolean;
  explanation: string;
  nextPuzzleId?: string;
  confidenceLevel?: ConfidenceLevel;
}
