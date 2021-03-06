import React from "react";
import Board from "./Board";
import red_draughts_piece from "../images/red_draughts_piece.png";
import black_draughts_piece from "../images/black_draughts_piece.png";

// i = index of square in the array of squares which makes up the board

function setUpDraughtsStart() {
  let squares = Array(64).fill(null);
  for (let i = 0; i < 64; i++) {
    if (squareIsStartingXSquare(i)) {
      squares[i] = "X";
    } else if (squareIsStartingOSquare(i)) {
      squares[i] = "O";
    }
  }
  return squares;
}

function squareIsStartingXSquare(i) {
  if (
    i < 24 &&
    (((i < 8 || i > 16) && i % 2 === 1) || (i >= 8 && i < 16 && i % 2 === 0))
  ) {
    return true;
  }
  return false;
}

function squareIsStartingOSquare(i) {
  if (i > 39) {
    if (
      ((i <= 47 || i >= 56) && i % 2 === 0) ||
      (i > 47 && i <= 55 && i % 2 === 1)
    ) {
      return true;
    }
  }
  return false;
}

// function setUpTest() {
//   let squares = Array(64).fill(null);
//   squares[13] = 'XX';
//   squares[11] = 'XX';
//   squares[9] = 'XX';
//   squares[63] = 'XX';
//   squares[20] = 'XX';
//   squares[34] = 'O';
//   return squares
// }

class Draughts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: setUpDraughtsStart(),
          movePosition: null
        }
      ],
      nextPlayer: "X",
      stepNumber: 0,
      previousFocus: null,
      focus: null,
      doubleJump: false
    };
  }

  resetPreviousFocusHighlight() {
    if (this.state.focus !== null) {
      const previousSquare = document.getElementById(`square-${this.state.focus}`);
      previousSquare.style.backgroundColor = "#cd853f";
    }
  }

  resetPotentialMovesHighlight(legalMoves) {
    for (let move of legalMoves) {
      if (move !== null) {
        let potentialSquare = document.getElementById(`square-${move}`);
        potentialSquare.style.backgroundColor = "#cd853f";
      }
    }
  }

  highlightPotentialMoves(legalMoves) {
    for (let move of legalMoves) {
      if (move !== null) {
        let potentialSquare = document.getElementById(`square-${move}`);
        potentialSquare.style.backgroundColor = "#bdff5b";
      }
    }
  }

  focusHighlighting(i, legalMoves) {
    const currentSquare = document.getElementById(`square-${i}`);
    currentSquare.style.backgroundColor = "#64d8ff";
    this.highlightPotentialMoves(legalMoves);
  }

  addMove(squares, i, move) {
    const pieceBelongsToPlayer = this.pieceBelongsToPlayer(
      squares[i + move],
      this.state.nextPlayer
    );
    if (squares[i + move] === null) {
      return i + move;
    } else if (!pieceBelongsToPlayer && squares[i + move + move] === null) {
      const potentialSquare = document.getElementById(`square-${i + move + move}`);
      if (!potentialSquare.classList.contains("light-square")) {
        return i + move + move;
      }
    }
    return null;
  }

  findAscendingRowMoves(i, squares) {
    let legalMoves = [];
    if (i % 8 !== 0) {
      legalMoves.push(this.addMove(squares, i, 7));
    }
    if (i % 8 !== 7) {
      legalMoves.push(this.addMove(squares, i, 9));
    }
    return legalMoves;
  }

  findDescendingRowMoves(i, squares) {
    let legalMoves = [];
    if (i % 8 !== 7) {
      legalMoves.push(this.addMove(squares, i, -7));
    }
    if (i % 8 !== 0) {
      legalMoves.push(this.addMove(squares, i, -9));
    }
    return legalMoves;
  }

  findLegalMoves(i, squares) {
    let legalMoves = [];
    const playerSymbol = this.state.nextPlayer;
    if (squares[i] === playerSymbol + playerSymbol) {
      legalMoves = this.findAscendingRowMoves(i, squares);
      legalMoves = legalMoves.concat(this.findDescendingRowMoves(i, squares));
    } else if (playerSymbol === "O" && i - 7 > -1) {
      legalMoves = this.findDescendingRowMoves(i, squares);
    } else if (playerSymbol === "X" && i + 7 < 64) {
      legalMoves = this.findAscendingRowMoves(i, squares);
    }

    // restrict to double jump moves if double jump happening
    if (
      this.state.doubleJump &&
      (i - this.state.previousFocus > 9 || i - this.state.previousFocus < -9)
    ) {
      legalMoves = legalMoves.filter(move => move - i > 9 || move - i < -9);
    }
    return legalMoves;
  }

  movePiece(i, squares, nextPlayer, previousFocus) {
    const diff = i - previousFocus;
    if (diff > 9 || diff < -9) {
      const takenPiece = previousFocus + diff / 2;
      squares[takenPiece] = null;
    }
    squares[i] = squares[previousFocus];
    squares[previousFocus] = null;
    return squares;
  }

  isDoubleJumpPossible(i, legalMoves, previousFocus) {
    if (legalMoves && (i - previousFocus > 9 || i - previousFocus < -9)) {
      for (let move of legalMoves) {
        if (move !== null && (move - i > 9 || move - i < -9)) {
          return true;
        }
      }
    }
    return false;
  }

  determineNextPlayer(nextPlayer, canDoubleJump) {
    if (canDoubleJump) {
      return nextPlayer;
    }
    return nextPlayer === "X" ? "O" : "X";
  }

  pieceBelongsToPlayer(piece, playerSymbol) {
    return piece === playerSymbol || piece === playerSymbol + playerSymbol;
  }

  createKings(i, squares) {
    if (squares[i] === "X" && i > 55) {
      squares[i] = "XX";
    } else if (squares[i] === "O" && i < 8) {
      squares[i] = "OO";
    }
    return squares;
  }

  handleClick(i) {
    let newFocus = null;
    console.log(i);
    const previousFocus = this.state.focus;
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    let squares = current.squares.slice();

    if (this.calculateWinner(squares)) {
      return;
    }

    let previousLegalMoves = [];
    if (previousFocus !== null) {
      previousLegalMoves = this.findLegalMoves(previousFocus, squares);
    }
    let canDoubleJump = this.state.doubleJump;
    if (canDoubleJump && !previousLegalMoves.includes(i)) {
      return;
    }

    let nextPlayer = this.state.nextPlayer;

    this.resetPreviousFocusHighlight();
    this.resetPotentialMovesHighlight(previousLegalMoves);

    let legalMoves = this.findLegalMoves(i, squares);

    if (previousFocus !== null && previousLegalMoves.includes(i)) {
      squares = this.movePiece(i, squares, nextPlayer, previousFocus);
      legalMoves = this.findLegalMoves(i, squares);
      const kingedSquares = this.createKings(i, squares);
      if (squares === kingedSquares) {
        canDoubleJump = this.isDoubleJumpPossible(i, legalMoves, previousFocus);
      } else {
        squares = kingedSquares;
      }
      history = history.concat([{ squares: squares }]);
      nextPlayer = this.determineNextPlayer(nextPlayer, canDoubleJump);
    }

    // if its a double jump restrict legal moves to just the second jump possibilities
    if (canDoubleJump) {
      if (i - previousFocus > 9 || i - previousFocus < -9) {
        legalMoves = legalMoves.filter(move => move - i > 9 || move - i < -9);
      }
    }
    if (
      (this.pieceBelongsToPlayer(squares[i], nextPlayer) &&
        previousFocus !== i &&
        legalMoves.length !== 0) ||
      canDoubleJump
    ) {
      this.focusHighlighting(i, legalMoves);
      newFocus = i;
    }

    this.setState({
      history: history,
      stepNumber: history.length - 1,
      previousFocus: previousFocus,
      focus: newFocus,
      nextPlayer: nextPlayer,
      doubleJump: canDoubleJump
    });
  }

  calculateWinner(squares) {
    let legalMoves = [];
    const symbol = this.state.nextPlayer;
    for (let i = 0; i < 64; i++) {
      if (squares[i] === symbol || squares[i] === symbol + symbol) {
        legalMoves = legalMoves.concat(this.findLegalMoves(i, squares));
        legalMoves = legalMoves.filter(move => move !== null);
        if (legalMoves.length > 0) {
          return null;
        }
      }
    }
    return symbol === "X" ? "O" : "X";
  }

  render() {
    const current = this.state.history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const status_X = (
      <img
        alt="black piece"
        src={black_draughts_piece}
        className="status-image"
      />
    );
    const status_O = (
      <img alt="red piece" src={red_draughts_piece} className="status-image" />
    );
    let status_image;

    let status;
    if (winner) {
      status = "Winner: ";
      status_image = winner === "X" ? status_X : status_O;
    } else {
      status = "Next player: ";
      status_image = this.state.nextPlayer === "X" ? status_X : status_O;
    }

    return (
      <div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            size={8}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{status_image}</div>
        </div>
        <div>
          <button
            className="game-selector"
            onClick={() => {
              this.props.returnHome(0);
            }}
          >
            Home Page
          </button>
        </div>
      </div>
    );
  }
}

export default Draughts;
