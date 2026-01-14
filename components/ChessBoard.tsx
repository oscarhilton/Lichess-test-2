'use client';

import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useState, useEffect } from 'react';
import { submitMove } from '@/lib/actions';
import { MoveResult } from '@/lib/types';

interface ChessBoardProps {
  puzzleId: string;
  initialFen: string;
  correctMove: string;
  onMoveResult?: (result: MoveResult) => void;
}

export default function ChessBoard({ 
  puzzleId, 
  initialFen, 
  correctMove,
  onMoveResult 
}: ChessBoardProps) {
  const [game, setGame] = useState(new Chess(initialFen));
  const [position, setPosition] = useState(initialFen);
  const [result, setResult] = useState<MoveResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setGame(new Chess(initialFen));
    setPosition(initialFen);
    setResult(null);
  }, [initialFen, puzzleId]);

  function onPieceDrop(args: { piece: any; sourceSquare: string; targetSquare: string | null }) {
    const { sourceSquare, targetSquare } = args;
    
    if (isProcessing || !targetSquare) return false;

    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (move === null) return false;

    setIsProcessing(true);
    setGame(gameCopy);
    setPosition(gameCopy.fen());

    (async () => {
      try {
        const moveResult = await submitMove(
          puzzleId,
          `${sourceSquare}${targetSquare}`,
          game.fen()
        );
        
        setResult(moveResult);
        if (onMoveResult) {
          onMoveResult(moveResult);
        }
      } catch (error) {
        console.error('Error submitting move:', error);
      } finally {
        setIsProcessing(false);
      }
    })();

    return true;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full max-w-[600px]">
        <Chessboard
          options={{
            position: position,
            onPieceDrop: onPieceDrop,
            boardStyle: { borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
          }}
        />
      </div>
      
      {isProcessing && (
        <div className="text-lg text-gray-500">Processing move...</div>
      )}
      
      {result && (
        <div className={`p-4 rounded-lg ${result.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <h3 className="font-bold text-xl mb-2">
            {result.correct ? '✓ Correct!' : '✗ Incorrect'}
          </h3>
          <p>{result.explanation}</p>
          {result.confidenceLevel && (
            <p className="mt-2 text-sm">
              Confidence Level: <strong>{result.confidenceLevel}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
