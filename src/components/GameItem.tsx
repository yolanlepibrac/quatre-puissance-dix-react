import React, { FunctionComponent, useState, useEffect } from "react";
import CSS from "csstype";

interface game {
  id: string;
  player1: string;
  player2: string;
  vectors1: Array<Array<number>>;
  vectors2: Array<Array<number>>;
  dimensions: number;
  player1ToPlay: boolean;
  finish: boolean;
  winner1: boolean;
}

interface user {
  id: string;
  email: string;
}

interface Props {
  user: user;
  game: game;
  style: CSS.Properties;
  onClick: any;
}

const GameItem: FunctionComponent<Props> = props => {
  const play = props.game.player1ToPlay && props.user.email === props.game.player1 ? true : false;

  function openGame() {
    console.log("game open");
  }

  return (
    <div id="containerGameItem" style={{ ...props.style, cursor: "pointer" }} onClick={props.onClick}>
      <div
        style={{
          width: "100",
          height: 20,
          backgroundColor: "red",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <div>{props.game.player1}</div>
        <div>{props.game.player2}</div>
      </div>
      <div>{play ? <div>Your turn to play</div> : <div>{"wait for " + props.game.player2 + "to play"}</div>}</div>
    </div>
  );
};

export default GameItem;
