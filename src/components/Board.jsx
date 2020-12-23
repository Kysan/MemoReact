import React, { Component } from "react";
import Square from "./Square";
// :
// * on va faire 4 ligne de 8 collones = 32
class Board extends Component {
  renderSquare = (square) => {
    let { handleSquareClick } = this.props;
    let { value, clicked, cleared, id } = square; // * composition d'un objet square
    return (
      <Square
        key={id}
        value={value}
        clicked={clicked}
        cleared={cleared}
        id={id}
        handleClick={handleSquareClick}
      />
    );
  };

  renderRow = (rowNumber) => {
    let { squares } = this.props;
    const row = squares
      .slice(rowNumber * 8, (rowNumber + 1) * 8 - 1) // * on récupère ceux de la row
      .map((square) => this.renderSquare(square)); // * et on calcul le rendu pour chaque element
    return row;
  };

  render() {
    console.log(this.props.squares);
    return (
      <div className="board">
        {
          /* (je n'aime pas ce que fait le formatage par defaut) */

          [0, 1, 2, 3].map((rowNumber) => (
            <div className="row"> {this.renderRow(rowNumber)}</div>
          ))
        }
      </div>
    );
  }
}

export default Board;
