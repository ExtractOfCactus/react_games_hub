import React from 'react';
import Board from './Board';

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
      nextMover: 'X',
      stepNumber: 0,
      previousFocus: null,
      focus: null,
    }
  }

  resetPeviousFocusHighlight() {
    if (this.state.focus) {
      const previousSquare = document.getElementById(this.state.focus);
      previousSquare.style.backgroundColor = '#cd853f';
    }
  }

  handleClick(i) {
    console.log(i);
    // highlight potential moves
    this.resetPeviousFocusHighlight();

    let newFocus = null;
    let previousFocus = this.state.focus;
    const currentSquare = document.getElementById(i);

    if (currentSquare.classList.contains('light-square')) {
      previousFocus = null
    }

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (squares[i] === this.state.nextMover && this.state.focus !== i) {
      newFocus = i;
      currentSquare.style.backgroundColor = '#64d8ff';
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
