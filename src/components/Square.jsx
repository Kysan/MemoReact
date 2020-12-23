import React, { Component } from "react";
// * SFC meilleur ?

// * transform: rotateY(180deg); pour faire un effet stylé sur la carte
class Square extends Component {
  handleClick = () => {
    // let { value, clicked, cleared, id } = this.props;

    // * ne peut pas être recliqué
    // * ne peut pas être cliqué si il est déjà clear
    if (!this.props.clicked && !this.props.cleared) {
      // * this.props <=> { <value>, <clicked>, <cleared>, <id> }
      this.props.handleClick(this.props);
    }
  };

  render() {
    let { value, clicked, cleared, id } = this.props;
    // * à rajouter pour faire une animation
    // * let style = clicked ? { transform: "transform .25s ease-in-out" } : {};
    // * style={style}>
    return (
      <div className="square" onClick={this.handleClick} id={id}>
        {clicked || cleared ? value : "x"}
      </div>
    );
  }
}

export default Square;
