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

  return (
    <div className="w-full max-w-[600px] mt-4">
      <h3 className="text-lg font-semibold mb-2">Hints:</h3>
      <div className="space-y-2">
        {hints.map((hint, index) => (
          <div
            key={index}
            className="p-3 bg-blue-50 text-blue-900 rounded-md border border-blue-200"
          >
            <span className="font-medium capitalize">{hint.type}: </span>
            {hint.message}
          </div>
        ))}
      </div>
    </div>
  );
}
