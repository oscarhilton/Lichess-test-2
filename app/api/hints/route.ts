import { NextRequest } from 'next/server';
import { getHintsForPuzzle } from '@/lib/hints';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const puzzleId = searchParams.get('puzzleId');

  if (!puzzleId) {
    return new Response('Missing puzzleId', { status: 400 });
  }

  const hints = getHintsForPuzzle(puzzleId);

  // NOTE: For production, consider using a more scalable approach:
  // - Shorter delays or progressive hints based on user activity
  // - Message queue system for long-running operations
  // - Client-side timeout handling
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (const hint of hints) {
        await new Promise(resolve => setTimeout(resolve, hint.delay));
        
        const data = `data: ${JSON.stringify(hint)}\n\n`;
        controller.enqueue(encoder.encode(data));
      }
      
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
