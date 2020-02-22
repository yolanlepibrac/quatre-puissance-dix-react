import React, { Component } from "react";
import GameItem from "./GameItem";

export default class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [
        {
          id: 1,
          dimension: 10,
          players: [1, 2],
          vectors1: [
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 2]
          ],
          vectors2: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 2, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
          ],
          player1play: true,
          finish: false,
          winner: undefined
        },
        {
          id: 1,
          dimension: 5,
          players: [3, 4],
          vectors1: [
            [0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 2, 0, 0, 0],
            [0, 1, 0, 0, 0]
          ],
          vectors2: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0],
            [0, 0, 0, 0, 1]
          ],
          player1play: true,
          finish: false,
          winner: undefined
        }
      ]
    };
  }

  componentDidMount = () => {};

  navigateGame = game => {
    this.props.navigateGame(game);
  };

  render() {
    return (
      <div id="appContainer">
        {this.state.games.map((game, key) => {
          return (
            <GameItem
              key={key}
              game={game}
              onClick={() => this.navigateGame(game)}
              style={{
                width: 150,
                height: 150,
                backgroundColor: "rgba(124,156,37,1)"
              }}
            >
              XXX
            </GameItem>
          );
        })}
      </div>
    );
  }
}
