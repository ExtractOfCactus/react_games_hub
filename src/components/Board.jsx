import React from 'react';
import Square from './Square'

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

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

  renderSquare(i, className) {
    return (
      <Square
        key={i}
        id={i}
        classOption={className}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderColumnNotation(i) {
    return (
      <ColumnNotation key={i} value={i} />
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

  determineSquareClass(row, index) {
    if (this.props.game === 1) {
      return 'square'
    }
    return row % 2 === 0 ? 
      (index % 2 === 0 ? 'dark-square' : 'light-square'):
      (index % 2 === 0 ? 'light-square' : 'dark-square');
  }

  renderBoardSquares() {
    let boardSquares = [];
    let rows = [];
    for (let row = 0; row < this.props.size; row++) {
      for (let i = row * this.props.size; i < row * this.props.size + this.props.size; i++) {
        const classOption = this.determineSquareClass(row, i)
        boardSquares.push(this.renderSquare(i, classOption));
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
