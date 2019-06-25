import React from 'react';
import Board from './Board';

class Draughts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(64).fill(null),
        movePosition: null
      }],
      blackIsNext: true,
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
    console.log('index: ', i)
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