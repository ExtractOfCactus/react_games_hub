import React from 'react';

import white_pawn from '../images/white_pawn.png'
import white_rook from '../images/white_rook.png'
import white_knight from '../images/white_knight.png'
import white_bishop from '../images/white_bishop.png'
import white_queen from '../images/white_queen.png'
import white_king from '../images/white_king.png'
import black_pawn from '../images/black_pawn.png'
import black_rook from '../images/black_rook.png'
import black_knight from '../images/black_knight.png'
import black_bishop from '../images/black_bishop.png'
import black_queen from '../images/black_queen.png'
import black_king from '../images/black_king.png'

import red_draughts_piece from '../images/red_draughts_piece.png'
import black_draughts_piece from '../images/black_draughts_piece.png'
import red_draughts_king from '../images/red_draughts_king.png'
import black_draughts_king from '../images/black_draughts_king.png'

import tictactoe_X from '../images/tictactoe_X.png'
import tictactoe_O from '../images/tictactoe_O.png'

const imageMap = {
  'wp': white_pawn,
  'wR': white_rook,
  'wN': white_knight,
  'wB': white_bishop,
  'wQ': white_queen,
  'wK': white_king,
  'bp': black_pawn,
  'bR': black_rook,
  'bN': black_knight,
  'bB': black_bishop,
  'bQ': black_queen,
  'bK': black_king ,
  'X': black_draughts_piece,
  'XX': black_draughts_king,
  'O': red_draughts_piece,
  'OO': red_draughts_king,
  'x': tictactoe_X,
  'o': tictactoe_O
}

function Square(props) {
  const value = <img src={imageMap[props.value]} className="piece-image" id={props.value}/>;
  return (
    <button
      className={props.classOption}
      id={props.id}
      onClick={props.onClick}
    >
      {value}
    </button>
  );
}

export default Square;
