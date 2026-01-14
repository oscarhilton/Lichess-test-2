'use client';

import { useEffect, useState } from 'react';
import { Hint } from '@/lib/hints';

interface HintsDisplayProps {
  puzzleId: string;
  enabled?: boolean;
}

export default function HintsDisplay({ puzzleId, enabled = true }: HintsDisplayProps) {
  const [hints, setHints] = useState<Hint[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const eventSource = new EventSource(`/api/hints?puzzleId=${puzzleId}`);

    eventSource.onmessage = (event) => {
      const hint: Hint = JSON.parse(event.data);
      setHints(prev => [...prev, hint]);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [puzzleId, enabled]);

  if (!enabled || hints.length === 0) return null;

  const getHintIcon = (type: string) => {
    switch (type) {
      case 'tactical': return '⚔️';
      case 'strategic': return '🎯';
      case 'opening': return '📚';
      default: return '💡';
    }
  };

  const getHintColor = (type: string) => {
    switch (type) {
      case 'tactical': return 'bg-purple-50 text-purple-900 border-purple-300';
      case 'strategic': return 'bg-blue-50 text-blue-900 border-blue-300';
      case 'opening': return 'bg-amber-50 text-amber-900 border-amber-300';
      default: return 'bg-slate-50 text-slate-900 border-slate-300';
    }
  };

  return (
    <div className="w-full mt-4 sm:mt-6">
      <h3 className="text-base sm:text-lg font-bold mb-3 text-slate-900 flex items-center gap-2">
        <span className="text-xl">💡</span>
        Hints
      </h3>
      <div className="space-y-3">
        {hints.map((hint, index) => (
          <div
            key={index}
            className={`p-3 sm:p-4 rounded-xl border-2 shadow-md transform transition-all duration-300 ${getHintColor(hint.type)}`}
            style={{
              animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">
                {getHintIcon(hint.type)}
              </span>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-xs sm:text-sm uppercase tracking-wide block mb-1">
                  {hint.type}
                </span>
                <p className="text-sm sm:text-base leading-relaxed">
                  {hint.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
