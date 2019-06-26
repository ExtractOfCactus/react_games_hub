import React from 'react';
import Board from './Board';

// i = index of selected square in the array of squares which makes up the board

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
      let potentialSquare = document.getElementById(move);
      potentialSquare.style.backgroundColor = '#cd853f';
    }
  }

  highlightPotentialMoves(i) {
    const legalMoves = this.findLegalMoves(i)
    for (let move of legalMoves) {
      let potentialSquare = document.getElementById(move);
      potentialSquare.style.backgroundColor = '#bdff5b';
    }
  }

  focusHighlighting(i) {
    const currentSquare = document.getElementById(i);
    currentSquare.style.backgroundColor = '#64d8ff';
    this.highlightPotentialMoves(i);
  }

  findLegalMoves(i) {
    let legalMoves = [];
    if (this.state.nextPlayer === 'X' && i + 7 < 64) {
      if (i % 8 !== 0) {
        legalMoves.push(i + 7);
      }
      if (i % 8 !== 7) {
        legalMoves.push(i + 9);
      }
    } else if (this.state.nextPlayer === 'O' && i - 7 > -1){
      if (i % 8 !== 7) {
        legalMoves.push(i - 7);
      }
      if (i % 8 !== 0) {
        legalMoves.push(i - 9);
      }
    }

    return legalMoves
  }

  handleClick(i) {
    let newFocus = null;
    const previousFocus = this.state.focus;
    
    this.resetPeviousFocusHighlight();
    this.resetPotentialMovesHighlight(this.findLegalMoves(previousFocus));

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] === this.state.nextPlayer && this.state.focus !== i) {
      this.focusHighlighting(i);
      newFocus = i;
    } 

    this.setState({
      previousFocus: previousFocus,
      focus: newFocus,
    })
  }

  render() {
    const current = this.state.history[this.state.stepNumber];
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
      </div>
    )
  }
}

export default Draughts;
