import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const SIZE = 3;
const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

function ColumnNotation(props) {
  return (
    <span className="column-notation">
      {props.value}
    </span>
  );
}

function RowNotation(props) {
  return (
    <span className="row-notation">
      {props.value}
    </span>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderColumnNotation(i) {
    return (
      <ColumnNotation value={i} />
    );
  }

  renderRowNotation(i) {
    return (
      <RowNotation value={i} />
    );
  }

  renderBoardColumns() {
    let columnHeaders = [];
    for (let i = 0; i < SIZE; i++) {
      columnHeaders.push(
        this.renderColumnNotation(COLUMNS[i])
      )
    }
    return <div className="board-columns">{columnHeaders}</div>
  }

  renderBoardSquares() {
    let boardSquares = [];
    let rows = [];
    for (let row = 0; row < SIZE; row++) {
      for (let i = row * SIZE; i < row * SIZE + SIZE; i++) {
        console.log(i)
        boardSquares.push(this.renderSquare(i));
      }
      rows.push(
        <div key={row} className="board-row">
          {this.renderRowNotation(row + 1)}
          {boardSquares}
        </div>
      );
      boardSquares = [];
    }
    return rows;
  }

  render() {
    return (
      <div>
        <div>
          {this.renderBoardColumns()}
          {this.renderBoardSquares()}
        </div>

      </div>
    );
  }
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

class Game extends React.Component {
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
          />
          <div>
            <ResetButton
              className="reset-button"
              onClick={() => this.handleReset()}
            />
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
