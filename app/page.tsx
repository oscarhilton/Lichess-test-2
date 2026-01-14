import Link from 'next/link';
import { puzzles } from '@/lib/puzzles';
import { getAllProgress } from '@/lib/confidence';

export default function Home() {
  const progress = getAllProgress();

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-slate-900">
            ♟️ Chess Learning App
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Master chess openings and defend against common traps
          </p>
        </div>

        {/* How It Works Card */}
        <div className="mb-8 sm:mb-10 bg-white border-2 border-blue-200 rounded-xl p-4 sm:p-6 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 flex items-center gap-2">
            <span className="text-2xl">ℹ️</span>
            How It Works
          </h2>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span>Each puzzle teaches you a specific opening or defense</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span>Make moves on the board to solve the puzzle</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span>Get immediate feedback with explanations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span>Progress through puzzles based on your confidence level</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span>Receive progressive hints via real-time streaming</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 font-bold mt-1">•</span>
              <span>See opening statistics from the Lichess database</span>
            </li>
          </ul>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-slate-900 px-2">
          Available Puzzles
        </h2>
        
        {/* Puzzles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {puzzles.map((puzzle) => {
            const userProgress = progress.find(p => p.puzzleId === puzzle.id);
            const confidence = userProgress?.confidence || 0;
            
            return (
              <Link
                key={puzzle.id}
                href={`/puzzle/${puzzle.id}`}
                className="group block bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 border-2 border-transparent hover:border-blue-400 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex-1 pr-2">
                    {puzzle.name}
                  </h3>
                  <span className="text-2xl">♔</span>
                </div>
                
                <p className="text-sm sm:text-base text-slate-600 mb-4 line-clamp-2">
                  {puzzle.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs sm:text-sm px-3 py-1 rounded-full border font-medium ${getDifficultyColor(puzzle.difficulty)}`}>
                      {puzzle.difficulty}
                    </span>
                  </div>
                  
                  <div className="text-xs sm:text-sm text-slate-600">
                    <p className="truncate">
                      <strong className="text-slate-900">Opening:</strong> {puzzle.opening}
                    </p>
                  </div>
                  
                  {userProgress && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">
                          Your Progress
                        </span>
                        <span className="text-xs text-slate-600">
                          {userProgress.correctAttempts}/{userProgress.attempts} correct
                        </span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-700 mt-1 block text-right">
                          {Math.round(confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {!userProgress && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <span className="text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1">
                        Start puzzle →
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
