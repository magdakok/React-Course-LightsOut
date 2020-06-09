import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

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

    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
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
    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

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

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
