import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps ={
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon : false,
      board: this.createBoard()
    }
    this.createBoard = this.createBoard.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
      for (let r=0; r < this.props.nrows; r++){
        let row = [];
        for (let c=0; c < this.props.ncols; c++){
          row.push(Math.random()<this.props.chanceLightStartsOn)
        }
        board.push(row);
      }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y,x);
    flipCell(y,x-1);
    flipCell(y,x+1);
    flipCell(y-1,x);
    flipCell(y+1,x);
    let hasWon = board.flat().every(el => el === false);

    this.setState({board: board, hasWon: hasWon});
  }


  /** Render game board or winning message. */

  render() {
    if(this.state.hasWon) { return <div>
      <span className="neon">You</span>
      <span className="flux">Won</span>
      </div> }
    let tblBoard = [];
    for (let r=0; r < this.props.nrows; r++){
      let row = [];
      for (let c=0; c < this.props.ncols; c++){
        let coord = `${r}-${c}`;
        row.push(<Cell isLit={this.state.board[r][c]} key={coord} flipCellsAroundMe={()=> this.flipCellsAround(coord)}/>)
      }
      tblBoard.push(<tr>{row}</tr>);
    }

    return(
      <div>
        <span className="neon">Lights</span>
        <span className="flux">Out</span>
        <table className="Board">
          <tbody>
            {tblBoard}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Board;
