import { notFound } from 'next/navigation';
import { getPuzzleById } from '@/lib/puzzles';
import { getOpeningStats } from '@/lib/lichess';
import ChessBoard from '@/components/ChessBoard';
import HintsDisplay from '@/components/HintsDisplay';
import PuzzleNavigation from '@/components/PuzzleNavigation';

export const dynamic = 'force-dynamic';

interface PuzzlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PuzzlePage({ params }: PuzzlePageProps) {
  const { id } = await params;
  const puzzle = getPuzzleById(id);

  if (!puzzle) {
    notFound();
  }

  const openingStats = await getOpeningStats(puzzle.fen);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-slate-900">
            {puzzle.name}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600">
            {puzzle.description}
          </p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Left Column - Puzzle Info */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            {/* Puzzle Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-slate-200">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-slate-900 flex items-center gap-2">
                <span className="text-xl sm:text-2xl">📋</span>
                Puzzle Details
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">Opening</span>
                  <p className="text-sm sm:text-base font-semibold text-slate-900 mt-1">
                    {puzzle.opening}
                  </p>
                </div>
                
                <div>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">Difficulty</span>
                  <div className="mt-1">
                    <span className={`inline-block text-xs sm:text-sm px-3 py-1.5 rounded-full border-2 font-bold ${getDifficultyColor(puzzle.difficulty)}`}>
                      {puzzle.difficulty.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                {puzzle.trap && (
                  <div>
                    <span className="text-xs sm:text-sm text-slate-500 font-medium">Trap Defense</span>
                    <p className="text-sm sm:text-base font-semibold text-red-600 mt-1 flex items-center gap-2">
                      <span>⚠️</span>
                      {puzzle.trap}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Opening Statistics Card */}
            {openingStats && (
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-slate-200">
                <h2 className="text-lg sm:text-xl font-bold mb-2 text-slate-900 flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">📊</span>
                  Opening Statistics
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-4">From Lichess Database</p>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="text-center bg-slate-50 rounded-lg p-3">
                    <div className="text-lg sm:text-2xl font-bold text-slate-900">
                      {openingStats.white}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 mt-1">White Wins</div>
                  </div>
                  <div className="text-center bg-slate-50 rounded-lg p-3">
                    <div className="text-lg sm:text-2xl font-bold text-slate-900">
                      {openingStats.draws}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 mt-1">Draws</div>
                  </div>
                  <div className="text-center bg-slate-50 rounded-lg p-3">
                    <div className="text-lg sm:text-2xl font-bold text-slate-900">
                      {openingStats.black}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 mt-1">Black Wins</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Chess Board */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 lg:p-6 border-2 border-slate-200">
              <ChessBoard
                puzzleId={puzzle.id}
                initialFen={puzzle.fen}
                correctMove={puzzle.correctMove}
              />
            </div>
            <HintsDisplay puzzleId={puzzle.id} enabled={true} />
          </div>
        </div>

        {/* Navigation */}
        <PuzzleNavigation currentPuzzleId={puzzle.id} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return [];
}
