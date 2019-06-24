import React from 'react';
import ReactDOM from 'react-dom';
import TicTacToe from './components/TicTacToe';
import './index.css';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: null,
    }
  }

  renderTicTacToe() {
    this.setState({
      currentGame: 1
    })
  }

  render() {
    let page;
    if (this.state.currentGame === 1) {
      page = <TicTacToe />
    } else {
      page = (
        <div>
          <h1>Welcome to the games page</h1>
          <div>
            <button onClick={() => this.renderTicTacToe()}>Play TicTacToe</button>
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
