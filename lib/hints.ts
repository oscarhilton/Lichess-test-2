export interface Hint {
  type: 'tactical' | 'strategic' | 'opening';
  message: string;
  delay: number;
}

export function getHintsForPuzzle(puzzleId: string): Hint[] {
  const hints: Record<string, Hint[]> = {
    'scholars-mate-defense': [
      {
        type: 'tactical',
        message: 'Look at what White is threatening with the queen and bishop...',
        delay: 5000,
      },
      {
        type: 'strategic',
        message: 'Developing pieces is often the best defense.',
        delay: 10000,
      },
      {
        type: 'opening',
        message: 'The knight on f6 serves multiple purposes.',
        delay: 15000,
      },
    ],
    'italian-game-opening': [
      {
        type: 'strategic',
        message: 'Mirror White\'s pawn structure in the center.',
        delay: 5000,
      },
      {
        type: 'opening',
        message: 'Control the center with pawns.',
        delay: 10000,
      },
    ],
    'fried-liver-attack': [
      {
        type: 'tactical',
        message: 'White is preparing a piece sacrifice...',
        delay: 5000,
      },
      {
        type: 'strategic',
        message: 'Challenge the center immediately.',
        delay: 10000,
      },
    ],
  };

  return hints[puzzleId] || [];
}

export async function* streamHints(puzzleId: string) {
  const hints = getHintsForPuzzle(puzzleId);
  
  for (const hint of hints) {
    await new Promise(resolve => setTimeout(resolve, hint.delay));
    yield hint;
  }
}
