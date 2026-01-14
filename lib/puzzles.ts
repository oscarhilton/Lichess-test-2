import { ChessPuzzle } from './types';

export const puzzles: ChessPuzzle[] = [
  {
    id: 'scholars-mate-defense',
    name: "Scholar's Mate Defense",
    description: "Learn how to defend against the Scholar's Mate trap",
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 1 2',
    moves: ['e2e4', 'e7e5', 'f1c4'],
    correctMove: 'g8f6',
    explanation: "Developing the knight to f6 is the best defense. It develops a piece, controls the center, and defends against the queen-bishop battery aiming at f7.",
    trap: "Scholar's Mate",
    difficulty: 'beginner',
    opening: 'Italian Game'
  },
  {
    id: 'italian-game-opening',
    name: 'Italian Game Opening',
    description: 'Learn the fundamentals of the Italian Game',
    fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    moves: ['e2e4'],
    correctMove: 'e7e5',
    explanation: "e5 is a strong symmetrical response that stakes a claim in the center and opens lines for your pieces.",
    difficulty: 'beginner',
    opening: 'Italian Game'
  },
  {
    id: 'fried-liver-attack',
    name: 'Fried Liver Attack',
    description: 'Learn to navigate the dangerous Fried Liver Attack',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    moves: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1c4', 'g8f6'],
    correctMove: 'd2d4',
    explanation: "d4 strikes at the center immediately, preparing the aggressive Fried Liver continuation.",
    difficulty: 'intermediate',
    opening: 'Italian Game - Two Knights Defense'
  },
  {
    id: 'sicilian-defense-intro',
    name: 'Sicilian Defense Introduction',
    description: 'Learn the basics of the Sicilian Defense',
    fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
    moves: ['e2e4'],
    correctMove: 'c7c5',
    explanation: "The Sicilian Defense (c5) is one of the most popular and aggressive responses to e4, fighting for control of the center asymmetrically.",
    difficulty: 'intermediate',
    opening: 'Sicilian Defense'
  },
  {
    id: 'queens-gambit',
    name: "Queen's Gambit",
    description: "Learn the Queen's Gambit opening",
    fen: 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1',
    moves: ['d2d4'],
    correctMove: 'd7d5',
    explanation: "d5 establishes a strong central pawn and is the principled response to White's d4.",
    difficulty: 'beginner',
    opening: "Queen's Gambit"
  },
  {
    id: 'london-system',
    name: 'London System',
    description: 'Learn the London System setup',
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2',
    moves: ['d2d4', 'd7d5', 'c1f4'],
    correctMove: 'g8f6',
    explanation: "Developing the knight to f6 is natural, attacking the center and preparing kingside castling.",
    difficulty: 'beginner',
    opening: 'London System'
  }
];

export function getPuzzleById(id: string): ChessPuzzle | undefined {
  return puzzles.find(p => p.id === id);
}

export function getNextPuzzle(currentId: string, confidence: number): ChessPuzzle | undefined {
  const currentIndex = puzzles.findIndex(p => p.id === currentId);
  
  if (confidence >= 0.8) {
    const nextPuzzles = puzzles.filter((_, idx) => idx > currentIndex);
    return nextPuzzles[0];
  } else if (confidence >= 0.5) {
    return puzzles[currentIndex];
  } else {
    const previousPuzzles = puzzles.filter((_, idx) => idx < currentIndex);
    return previousPuzzles[previousPuzzles.length - 1] || puzzles[0];
  }
}
