# Chess Learning App

A Next.js (App Router) chess learning application that teaches openings and helps defend against common traps using Server-Side Rendering (SSR) and Server Actions.

## Features

- **Server-Side Rendering (SSR)**: Each puzzle is server-rendered for optimal performance
- **Server Actions**: Submit moves and get immediate feedback without page reloads
- **Memory/Confidence System**: Progress tracking that adapts to your learning
- **Adaptive Routing**: Automatically routes to next puzzles based on confidence levels
- **Server-Sent Events (SSE)**: Optional real-time hints streaming
- **Lichess Integration**: Opening statistics from the Lichess database
- **Caching**: Optimized data fetching with Next.js caching

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Build

```bash
npm run build
npm start
```

## Architecture

### App Structure

- `/app` - Next.js App Router pages and layouts
  - `/puzzle/[id]` - Dynamic puzzle pages (SSR)
  - `/api/hints` - SSE endpoint for streaming hints
- `/components` - React components
  - `ChessBoard.tsx` - Interactive chess board component
  - `HintsDisplay.tsx` - SSE-powered hints display
  - `PuzzleNavigation.tsx` - Navigation between puzzles
- `/lib` - Server-side logic and utilities
  - `actions.ts` - Server Actions for move submission
  - `puzzles.ts` - Puzzle data and selection logic
  - `confidence.ts` - Memory/confidence tracking system
  - `lichess.ts` - Lichess API integration
  - `hints.ts` - Hint generation system

### Key Technologies

- **Next.js 14+** with App Router
- **React 18+**
- **TypeScript**
- **Tailwind CSS**
- **chess.js** - Chess logic and validation
- **react-chessboard** - Interactive chessboard UI
- **Lichess API** - Opening database integration

## How It Works

### Puzzle Flow

1. User selects a puzzle from the home page
2. Server renders the puzzle page with initial position (SSR)
3. User makes moves on the interactive board
4. Moves are validated via Server Actions
5. Confidence is updated based on correctness
6. User is routed to next puzzle based on confidence level

### Confidence System

- **High Confidence (≥80%)**: Progress to next puzzle
- **Medium Confidence (50-79%)**: Repeat current puzzle
- **Low Confidence (<50%)**: Return to previous puzzle

### SSE Hints

Hints are streamed to the client using Server-Sent Events:
- Tactical hints appear after 5 seconds
- Strategic hints after 10 seconds
- Opening-specific hints after 15 seconds

### Caching Strategy

- Lichess API responses cached for 1 hour
- Server components use Next.js automatic caching
- Puzzle data is statically defined for fast access

## Available Puzzles

1. **Scholar's Mate Defense** - Beginner
2. **Italian Game Opening** - Beginner
3. **Fried Liver Attack** - Intermediate
4. **Sicilian Defense** - Intermediate
5. **Queen's Gambit** - Beginner
6. **London System** - Beginner

## Extending the App

### Adding New Puzzles

Edit `/lib/puzzles.ts` and add to the `puzzles` array:

```typescript
{
  id: 'unique-id',
  name: 'Puzzle Name',
  description: 'Description',
  fen: 'starting-position-fen',
  moves: ['e2e4', 'e7e5'],
  correctMove: 'g1f3',
  explanation: 'Why this move is correct',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  opening: 'Opening Name'
}
```

### Adding Hints

Edit `/lib/hints.ts` to add hints for new puzzles.

## License

ISC