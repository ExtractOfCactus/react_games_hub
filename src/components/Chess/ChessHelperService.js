const mapPieces = {
  0: "bR",
  1: "bN",
  2: "bB",
  3: "bQ",
  4: "bK",
  5: "bB",
  6: "bN",
  7: "bR",
  56: "wR",
  57: "wN",
  58: "wB",
  59: "wQ",
  60: "wK",
  61: "wB",
  62: "wN",
  63: "wR"
};

export const setupChessStart = () => {
  let squares = Array(64).fill(null);
  for (let i = 0; i < 64; i++) {
    if (i > 7 && i < 16) {
      squares[i] = "bp";
    } else if (i > 47 && i < 56) {
      squares[i] = "wp";
    } else if (i < 8 || i > 55) {
      squares[i] = mapPieces[i];
    }
  }
  return squares;
};
