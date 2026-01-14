'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { navigateToNextPuzzle } from '@/lib/actions';

interface PuzzleNavigationProps {
  currentPuzzleId: string;
  nextPuzzleId?: string;
}

export default function PuzzleNavigation({ currentPuzzleId, nextPuzzleId }: PuzzleNavigationProps) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNext = async () => {
    if (nextPuzzleId && !isNavigating) {
      setIsNavigating(true);
      try {
        await navigateToNextPuzzle(nextPuzzleId);
      } catch (error) {
        router.push(`/puzzle/${nextPuzzleId}`);
      }
      setIsNavigating(false);
    }
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mt-6">
      <button
        onClick={handleBackToHome}
        className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-slate-600 text-white rounded-xl hover:bg-slate-700 active:bg-slate-800 transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
      >
        <span className="text-lg">←</span>
        Back to Home
      </button>
      
      {nextPuzzleId && (
        <button
          onClick={handleNext}
          disabled={isNavigating}
          className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isNavigating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Loading...
            </>
          ) : (
            <>
              Next Puzzle
              <span className="text-lg">→</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
