import React from 'react';
import Board from './Board';

// i = index of square in the array of squares which makes up the board

function setUpDraughtsStart() {
  let squares = Array(64).fill(null);
  for (let i = 0; i < 64; i++) {
    if (squareIsStartingXSquare(i)) {
      squares[i] = 'X'
    } else if (squareIsStartingOSquare(i)) {
      squares[i] = 'O'
    }
  }
  return squares
}

function squareIsStartingXSquare(i) {
  if (
    (i < 23) &&
    (
      ((i < 8 || i >= 16) && i % 2 === 0) || 
      (i > 8 && i < 16 && i % 2 === 1)
    )
  ) {
    return true
  }
  return false
}

function squareIsStartingOSquare(i) {
  if (i > 39) {
    if (
      ((i <= 47 || i > 56) && i % 2 === 1) || 
      (i > 47 && i < 55 && i % 2 === 0)
    ) {
      return true
    }
  }
  return false
}

class Draughts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: setUpDraughtsStart(),
        movePosition: null
      }],
      nextPlayer: 'X',
      stepNumber: 0,
      previousFocus: null,
      focus: null,
    }
  }


  resetPeviousFocusHighlight() {
    if (this.state.focus !== null) {
      const previousSquare = document.getElementById(this.state.focus);
      previousSquare.style.backgroundColor = '#cd853f';
    }
  }

  resetPotentialMovesHighlight(legalMoves) {
    for (let move of legalMoves) {
      if (move) {
        let potentialSquare = document.getElementById(move);
        potentialSquare.style.backgroundColor = '#cd853f';
      }
    }
  }

  highlightPotentialMoves(legalMoves) {
    for (let move of legalMoves) {
      if (move) {
        let potentialSquare = document.getElementById(move);
        potentialSquare.style.backgroundColor = '#bdff5b';
      }
    }
  }

  focusHighlighting(i, legalMoves) {
    const currentSquare = document.getElementById(i);
    currentSquare.style.backgroundColor = '#64d8ff';
    this.highlightPotentialMoves(legalMoves);
  }

  addMove(squares, i, move) {
    if (squares[i + move] === null) {
      return i + move
    } else if (squares[i + move] !== this.state.nextPlayer && squares[i + move + move] === null) {
      const potentialSquare = document.getElementById(i + move + move);
      if (!potentialSquare.classList.contains('light-square')){
        return i + move + move
      }
    }
    return null
  }

  findLegalMoves(i, squares) {
    let legalMoves = [];
    if (this.state.nextPlayer === 'X' && i + 7 < 64) {
      if (i % 8 !== 0) {
        legalMoves.push(this.addMove(squares, i, 7));
      }
      if (i % 8 !== 7) {
        legalMoves.push(this.addMove(squares, i, 9));
      }
    } else if (this.state.nextPlayer === 'O' && i - 7 > -1){
      if (i % 8 !== 7) {
        legalMoves.push(this.addMove(squares, i, -7));
      }
      if (i % 8 !== 0) {
        legalMoves.push(this.addMove(squares, i, -9));
      }
    }

    return legalMoves
  }

  movePiece(i, squares, nextPlayer, previousFocus) {
    const diff = i - previousFocus;
    if (diff > 9 || diff < -9) {
      const takenPiece = previousFocus + (diff/2);
      squares[takenPiece] = null;
    }
    squares[previousFocus] = null;
    squares[i] = nextPlayer;
    return squares;
  }

  handleClick(i) {
    let newFocus = null;
    const previousFocus = this.state.focus;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    let squares = current.squares.slice();
    const legalMoves = this.findLegalMoves(i, squares);
    let previousLegalMoves = [];
    if (previousFocus !== null) {
      previousLegalMoves = this.findLegalMoves(previousFocus, squares);
    }
    let nextPlayer = this.state.nextPlayer;

    this.resetPeviousFocusHighlight();
    this.resetPotentialMovesHighlight(previousLegalMoves);

    if (previousFocus !== null && previousLegalMoves.includes(i)) {
      squares = this.movePiece(i, squares, nextPlayer, previousFocus);
      nextPlayer = nextPlayer === 'X' ? 'O' : 'X';
    // check piece belongs to player, click is not a double click, there are legal moves the piece can make.  
    } else if (squares[i] === nextPlayer && previousFocus !== i && legalMoves.length !== 0) {
      this.focusHighlighting(i, legalMoves);
      newFocus = i;
    } 

    this.setState({
      history: [{
        squares: squares,
      }],
      previousFocus: previousFocus,
      focus: newFocus,
      nextPlayer: nextPlayer,
    })
  }

  render() {
    const current = this.state.history[this.state.stepNumber];
    const status = 'Next player: ' + (this.state.nextPlayer);
    return (
      <div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            size={8}
          />
          <div>
            <button
              className="game-selector" 
              onClick={() => {this.props.returnHome(0)}}
            >
              Home Page
            </button>
          </div>
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    )
  }
}

export default Draughts;
