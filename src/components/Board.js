import React from 'react';

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
//  const size = this.props.size;

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
    for (let i = 0; i < this.props.size; i++) {
      columnHeaders.push(
        this.renderColumnNotation(COLUMNS[i])
      )
    }
    return <div className="board-columns">{columnHeaders}</div>
  }

  renderBoardSquares() {
    let boardSquares = [];
    let rows = [];
    for (let row = 0; row < this.props.size; row++) {
      for (let i = row * this.props.size; i < row * this.props.size + this.props.size; i++) {
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

export default Board;