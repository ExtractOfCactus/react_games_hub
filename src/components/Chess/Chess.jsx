import React from "react";
import Board from "../Board";
import { setupChessStart } from "./ChessHelperService";
import white_pawn from "../../images/white_pawn.png";

class Chess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: setupChessStart(),
          movePosition: null
        }
      ],
      nextPlayer: "w",
      stepNumber: 0,
      previousFocus: null,
      focus: null
    };
  }

  handleClick(i) {
    let history = this.state.history;
    const current = history[history.length - 1];
    let squares = current.squares.slice()
    let previousFocus = this.state.previousFocus;
    if (previousFocus === null) {
      previousFocus = i;
    } else {
      squares[i] = 'wp';
      squares[previousFocus] = null;
      previousFocus = null;
    }
    this.setState({
      history: [{squares: squares}],
      previousFocus: previousFocus,
    });
  }

  render() {
    const current = this.state.history[this.state.stepNumber];
    const status = "Next player";
    const statusImage = (
      <img alt="White piece" src={white_pawn} className="status-image" />
    );
    return (
      <div>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            size={8}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>{statusImage}</div>
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

export default Chess;
