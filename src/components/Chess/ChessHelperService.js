const mapPieces = {
  0: 'wR',
  1: 'wN',
  2: 'wB',
  3: 'wQ',
  4: 'wK',
  5: 'wB',
  6: 'wN',
  7: 'wR',
  56: 'bR',
  57: 'bN',
  58: 'bB',
  59: 'bQ',
  60: 'bK',
  61: 'bB',
  62: 'bN',
  63: 'bR',
}

export const setupChessStart = () => {
  let squares = Array(64).fill(null);
  for (let i=0; i < 64; i++) {
    if (i > 7 && i < 16) {
      squares[i] = 'wp';
    } else if (i > 47 && i < 56) {
      squares[i] = 'bp';
    } else if (i < 8 || i > 55) {
      squares[i] = mapPieces[i];
    }
  }
  return squares;
}