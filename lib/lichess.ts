export interface LichessOpeningStats {
  white: number;
  draws: number;
  black: number;
  moves: Array<{
    uci: string;
    san: string;
    averageRating: number;
    white: number;
    draws: number;
    black: number;
  }>;
}

const LICHESS_API_BASE = 'https://explorer.lichess.ovh';

export async function getOpeningStats(
  fen: string,
  ratings: number[] = [1600, 1800, 2000, 2200, 2500]
): Promise<LichessOpeningStats | null> {
  try {
    const params = new URLSearchParams({
      fen,
      ratings: ratings.join(','),
      speeds: 'blitz,rapid,classical',
    });

    const response = await fetch(`${LICHESS_API_BASE}/lichess?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      console.error('Failed to fetch opening stats from Lichess');
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Lichess opening stats:', error);
    return null;
  }
}

export async function getMasterGames(
  fen: string,
  topGames = 5
): Promise<any> {
  try {
    const params = new URLSearchParams({
      fen,
      topGames: topGames.toString(),
    });

    const response = await fetch(`${LICHESS_API_BASE}/master?${params}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching master games:', error);
    return null;
  }
}
