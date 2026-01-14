import { notFound } from 'next/navigation';
import { getPuzzleById } from '@/lib/puzzles';
import { getOpeningStats } from '@/lib/lichess';
import ChessBoard from '@/components/ChessBoard';
import HintsDisplay from '@/components/HintsDisplay';
import PuzzleNavigation from '@/components/PuzzleNavigation';

export const dynamic = 'force-dynamic';

interface PuzzlePageProps {
  params: {
    id: string;
  };
}

export default async function PuzzlePage({ params }: PuzzlePageProps) {
  const puzzle = getPuzzleById(params.id);

  if (!puzzle) {
    notFound();
  }

  const openingStats = await getOpeningStats(puzzle.fen);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">{puzzle.name}</h1>
        <p className="text-gray-600 mb-6">{puzzle.description}</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">Puzzle Details</h2>
              <p className="mb-2"><strong>Opening:</strong> {puzzle.opening}</p>
              <p className="mb-2"><strong>Difficulty:</strong> <span className="capitalize">{puzzle.difficulty}</span></p>
              {puzzle.trap && (
                <p className="mb-2"><strong>Trap:</strong> {puzzle.trap}</p>
              )}
            </div>

            {openingStats && (
              <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                <h2 className="text-xl font-semibold mb-2">Opening Statistics</h2>
                <p className="text-sm text-gray-600">From Lichess Database</p>
                <div className="mt-2">
                  <p>White Wins: {openingStats.white}</p>
                  <p>Draws: {openingStats.draws}</p>
                  <p>Black Wins: {openingStats.black}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <ChessBoard
              puzzleId={puzzle.id}
              initialFen={puzzle.fen}
              correctMove={puzzle.correctMove}
            />
            <HintsDisplay puzzleId={puzzle.id} enabled={true} />
          </div>
        </div>

        <PuzzleNavigation currentPuzzleId={puzzle.id} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}
