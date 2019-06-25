import React from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './components/TicTacToe';
import Draughts from './components/Draughts';
import './index.css';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: null,
    }
    this.changeCurrentGame = this.changeCurrentGame.bind(this);
  }

  changeCurrentGame(gameNumber) {
    this.setState({
      currentGame: gameNumber
    })
  }

  render() {
    let page;
    if (this.state.currentGame === 1) {
      page = <TicTacToe returnHome={this.changeCurrentGame} />
    } else if (this.state.currentGame === 2) {
      page = <Draughts returnHome={this.changeCurrentGame} />
    } else {
      page = (
        <div>
          <h1>Welcome to the games page</h1>
          <div>
            <button onClick={() => this.changeCurrentGame(1)}>Play TicTacToe</button>
          </div>
          <div>
            <button onClick={() => this.changeCurrentGame(2)}>Play Draughts</button>
          </div>
        </div>
      )
    }
    return (
      <div>
        {page}
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <LandingPage />,
  document.getElementById('root')
);
