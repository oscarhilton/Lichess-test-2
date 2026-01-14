'use server';

import { Chess } from 'chess.js';
import { redirect } from 'next/navigation';
import { getPuzzleById, getNextPuzzle } from './puzzles';
import { updateProgress, getConfidenceLevel } from './confidence';
import { MoveResult } from './types';

export async function submitMove(
  puzzleId: string,
  move: string,
  currentFen: string
): Promise<MoveResult> {
  const puzzle = getPuzzleById(puzzleId);
  
  if (!puzzle) {
    return {
      correct: false,
      explanation: 'Puzzle not found',
    };
  }

  const chess = new Chess(currentFen);
  
  try {
    chess.move(move);
  } catch (error) {
    return {
      correct: false,
      explanation: 'Invalid move. Please try again.',
    };
  }

  const isCorrect = move === puzzle.correctMove;
  const progress = updateProgress(puzzleId, isCorrect);
  const confidenceLevel = getConfidenceLevel(progress.confidence);

  if (isCorrect) {
    const nextPuzzle = getNextPuzzle(puzzleId, progress.confidence);
    
    return {
      correct: true,
      explanation: puzzle.explanation,
      nextPuzzleId: nextPuzzle?.id,
      confidenceLevel,
    };
  }

  return {
    correct: false,
    explanation: `Incorrect. ${puzzle.explanation}`,
    confidenceLevel,
  };
}

export async function navigateToNextPuzzle(nextPuzzleId: string) {
  redirect(`/puzzle/${nextPuzzleId}`);
}
