import React from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function ResetButton(props) {
  return (
    <button
      className="reset"
      onClick={props.onClick}
    >
      Reset
    </button>
  );
}

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        movePosition: null
      }],
      xIsNext: true,
      stepNumber: 0,
      focus: null
    }
    this.gridMap = {
      0: 'A1',
      1: 'B1',
      2: 'C1',
      3: 'A2',
      4: 'B2',
      5: 'C2',
      6: 'A3',
      7: 'B3',
      8: 'C3',
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        movePosition: this.gridMap[i],
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })
  }

  handleReset() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
        movePosition: null,
      }],
      xIsNext: true,
      stepNumber: 0,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  getMoveList(history) {
    const moves = history.map((step, move) => {
      let desc = move ?
        'Go to move #' + move + ' (' + step.movePosition + ')' :
        'Go to game start';
      if (move === this.state.stepNumber) {
        desc = <b>{desc}</b>
      }
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })
    return moves;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = this.getMoveList(history)

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            size={3}
            tic={true}
          />
          <div>
            <ResetButton
              className="reset-button"
              onClick={() => this.handleReset()}
            />
          </div>
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
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default TicTacToe;
