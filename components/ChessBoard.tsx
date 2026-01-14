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
        // Submit the move using the original FEN (before move was made)
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
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Chessboard Container */}
      <div className="w-full aspect-square max-w-[500px] sm:max-w-[600px]">
        <Chessboard
          position={position}
          onPieceDrop={(sourceSquare, targetSquare, piece) =>
            onPieceDrop({ piece, sourceSquare, targetSquare })
          }
          customBoardStyle={{
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          }}
        />
      </div>
      
      {/* Processing Indicator */}
      {isProcessing && (
        <div className="flex items-center gap-2 text-base sm:text-lg text-blue-600 font-medium animate-pulse">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="ml-2">Checking move...</span>
        </div>
      )}
      
      {/* Result Card */}
      {result && (
        <div className={`w-full p-4 sm:p-6 rounded-xl border-2 shadow-lg ${
          result.correct 
            ? 'bg-green-50 text-green-900 border-green-300' 
            : 'bg-red-50 text-red-900 border-red-300'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl sm:text-4xl">
              {result.correct ? '✓' : '✗'}
            </span>
            <h3 className="font-bold text-xl sm:text-2xl">
              {result.correct ? 'Correct!' : 'Not quite...'}
            </h3>
          </div>
          <p className="text-sm sm:text-base leading-relaxed mb-3">
            {result.explanation}
          </p>
          {result.confidenceLevel && (
            <div className="flex items-center gap-2 pt-3 border-t border-current/20">
              <span className="text-xs sm:text-sm font-medium">Confidence:</span>
              <span className={`text-xs sm:text-sm px-3 py-1 rounded-full font-bold ${
                result.confidenceLevel === 'high' ? 'bg-green-200 text-green-900' :
                result.confidenceLevel === 'medium' ? 'bg-yellow-200 text-yellow-900' :
                'bg-red-200 text-red-900'
              }`}>
                {result.confidenceLevel.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
