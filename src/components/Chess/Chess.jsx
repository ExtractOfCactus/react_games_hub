import React from 'react';
import Board from '../Board';
import { setupChessStart } from './ChessHelperService'

class Chess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: setupChessStart(),
        movePosition: null
      }],
      nextPlayer: 'w',
      stepNumber: 0,
      previousFocus: null,
      focus: null,
    }
  }

  render() {
    const current = this.state.history[this.state.stepNumber];
    const status = null;
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
          <div>status here</div>
        </div>
      </div>
    )
  }
}

export default Chess;
