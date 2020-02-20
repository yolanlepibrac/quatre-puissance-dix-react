import * as React from "react";
import CSS from "csstype";

interface game {
  id: string;
  players: Array<number>;
  vectors1: Array<Array<number>>;
  vectors2: Array<Array<number>>;
  player1play: boolean;
  finish: boolean;
  winner: boolean;
}

interface Props {
  game: game;
  style: CSS.Properties;
  onClick: any;
}

interface State {}

class GameItem extends React.Component<Props, State> {
  state: any = {
    account: {
      id: 2
    }
  };

  openGame = () => {
    console.log("game open");
  };

  render() {
    const play =
      this.props.game.player1play &&
      this.state.account.id === this.props.game.players[0]
        ? true
        : false;
    return (
      <div
        id="containerGameItem"
        style={{ ...this.props.style, cursor: "pointer" }}
        onClick={this.props.onClick}
      >
        <div
          style={{
            width: "100",
            height: 20,
            backgroundColor: "red",
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <div>{this.props.game.players[0]}</div>
          <div>{this.props.game.players[1]}</div>
        </div>
        <div>
          {play ? (
            <div>Play</div>
          ) : (
            <div>{"wait for " + this.props.game.players[0] + "to play"}</div>
          )}
        </div>
      </div>
    );
  }
}

export default GameItem;
