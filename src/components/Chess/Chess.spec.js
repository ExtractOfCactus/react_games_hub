import React from 'react';
import Chess from './Chess';
import Board from '../Board';
import { shallow, mount } from 'enzyme';
import { setupChessStart } from './ChessHelperService';

describe('Chess game at start', () => {
  const wrapper = shallow(<Chess />);

   it('renders the board', () => {
      expect(wrapper.containsMatchingElement(<Board />)).toEqual(true);
    });

   it('renders the home page button', () => {
      expect(wrapper.containsMatchingElement(<button>Home Page</button>)).toEqual(true);
   })

   it('renders a div for the status', () => {
      expect(wrapper.find('.game-info').text()).toEqual('status here');
   })

   it('can populate board with pieces', () => {
     const squares = setupChessStart();
     expect(squares[0]).toEqual('wR');
     expect(squares[4]).toEqual('wK');
     expect(squares[6]).toEqual('wN');
     expect(squares[10]).toEqual('wp');
     expect(squares[30]).toEqual(null);
     expect(squares[52]).toEqual('bp');
     expect(squares[59]).toEqual('bQ');
     expect(squares[61]).toEqual('bB');
     expect(squares[63]).toEqual('bR');
   })
});