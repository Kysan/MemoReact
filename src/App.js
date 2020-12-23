import React, { Component } from "react";
import Board from "./components/Board";
import Header from "./components/Header";
import Score from "./components/Score";

class App extends Component {
  state = {
    squares: [],
    score: 0,
    lastSquareClicked: null,
    inputBlocked: false,
  };

  componentDidMount = () => {
    // * on génère les cases de notre jeu
    let squares = [];

    for (let k = 0; k <= 32; ++k) {
      let square = {
        value: k,
        clicked: false,
        cleared: false,
      };
      // * 2 fois la même valeur
      squares.push(square, { ...square });
    }
    //
    // * on les mélanges au hasard et on leurs attribut un id
    squares = squares
      .sort(() => Math.random() - 0.5)
      .map((square, index) => {
        console.log(index);
        square.id = index;
        return square;
      });

    this.setState({ squares });
  };

  hasUserWon = () => {
    const { squares } = this.state;
    for (let square of squares) if (!square.cleared) return false;
    return true;
  };

  handleSquareReveal = (mySquare) => {
    let squares = [...this.state.squares];
    squares[mySquare.id].clicked = true;
    console.log(squares[mySquare.id]);

    this.setState({ squares });
  };

  handleTwoSquareComparaisonAndLogic = (squareClicked) => {
    let { lastSquareClicked, score } = this.state;
    let squares = [...this.state.squares];

    // * si les 2 cartes sont identiques
    if (lastSquareClicked.value === squareClicked.value) {
      squares[lastSquareClicked.id].cleared = true;
      squares[squareClicked.id].cleared = true;

      this.setState({ squares, score: this.state.score + 1 });
    } else {
      // * les deux sont différente il faut les retourner
      squares[lastSquareClicked.id].clicked = false;
      squares[squareClicked.id].clicked = false;
      this.setState({ squares, lastSquareClicked: null });
    }

    // * on check si il a gagné
    if (this.hasUserWon()) {
      alert(`GG ! You won with ${score} points ! (press F5 to restart)`);
      return;
    }

    this.setState({ inputBlocked: false });
  };

  // * méthode appelé quand on clique sur une case
  handleSquareClicked = (squareClicked) => {
    let { lastSquareClicked, inputBlocked } = this.state;

    if (inputBlocked) return;

    // * dans tout les cas on révelle la case
    this.handleSquareReveal(squareClicked);

    if (!lastSquareClicked) {
      // * premier clique rien à vérifier on mémorise juste la case
      this.setState({ lastSquareClicked: squareClicked });
      return;
    } else {
      // * deuxième clique on attends un peu le temps que l'utilisateur puisse lire la case
      setTimeout(
        () => this.handleTwoSquareComparaisonAndLogic(squareClicked),
        1000
      );

      // * doit bloquer les input pour éviter les bugs
      this.setState({ inputBlocked: true });
    }
  };

  render() {
    // * calcul
    let { score, squares } = this.state;

    // * retour du rendu
    return (
      <React.Fragment>
        <Header />
        <div className="Game">
          <Score score={score} />
          <Board
            squares={squares}
            handleSquareClick={this.handleSquareClicked}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
