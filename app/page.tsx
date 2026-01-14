import Link from 'next/link';
import { puzzles } from '@/lib/puzzles';
import { getAllProgress } from '@/lib/confidence';

export default function Home() {
  const progress = getAllProgress();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-center">Chess Learning App</h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Master chess openings and defend against common traps
        </p>

        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Each puzzle teaches you a specific opening or defense</li>
            <li>Make moves on the board to solve the puzzle</li>
            <li>Get immediate feedback with explanations</li>
            <li>Progress through puzzles based on your confidence level</li>
            <li>Receive hints via real-time streaming (SSE)</li>
            <li>See opening statistics from the Lichess database</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold mb-6">Available Puzzles</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {puzzles.map((puzzle) => {
            const userProgress = progress.find(p => p.puzzleId === puzzle.id);
            const confidence = userProgress?.confidence || 0;
            
            return (
              <Link
                key={puzzle.id}
                href={`/puzzle/${puzzle.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-xl transition p-6"
              >
                <h3 className="text-xl font-bold mb-2">{puzzle.name}</h3>
                <p className="text-gray-600 mb-4">{puzzle.description}</p>
                
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Opening:</strong> {puzzle.opening}
                  </p>
                  <p className="text-sm">
                    <strong>Difficulty:</strong>{' '}
                    <span className="capitalize">{puzzle.difficulty}</span>
                  </p>
                  
                  {userProgress && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm">
                        <strong>Your Progress:</strong>
                      </p>
                      <div className="mt-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Confidence: {Math.round(confidence * 100)}%</span>
                          <span>
                            {userProgress.correctAttempts}/{userProgress.attempts} correct
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all"
                            style={{ width: `${confidence * 100}%` }}
                          />
                        </div>
                      </div>
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
