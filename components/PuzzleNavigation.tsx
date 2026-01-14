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
    <div className="flex gap-4 justify-center">
      <button
        onClick={handleBackToHome}
        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Back to Home
      </button>
      
      {nextPuzzleId && (
        <button
          onClick={handleNext}
          disabled={isNavigating}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        >
          {isNavigating ? 'Loading...' : 'Next Puzzle'}
        </button>
      )}
    </div>
  );
}
