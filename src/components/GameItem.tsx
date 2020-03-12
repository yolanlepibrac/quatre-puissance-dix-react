import React, { FunctionComponent, useState, useEffect } from "react";
import CanvasContent from "./CanvasContent";
import { Canvas } from "react-three-fiber";
import CSS from "csstype";
import "./GameItem.css";
import API from "./API";

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
  name: string;
}

interface Props {
  user: user;
  game: game;
  style: CSS.Properties;
  onClick: any;
}

const GameItem: FunctionComponent<Props> = props => {
  const [displayLoading, setDisplayLoading] = useState(true);
  const [player2, setPlayer2] = useState({ name: "" });
  const play =
    (props.game.player1ToPlay && props.user.email === props.game.player1) ||
    (!props.game.player1ToPlay && props.user.email === props.game.player2)
      ? true
      : false;
  const secondPlayer = props.game.player1 === props.user.email ? props.game.player2 : props.game.player1;

  useEffect(() => {
    API.getUserByMail(secondPlayer).then((dataUser: any) => {
      console.log(dataUser.data.user);
      setPlayer2(dataUser.data.user);
      setDisplayLoading(false);
    });
  }, []);

  function openGame() {
    console.log(props.game.player1ToPlay);
    console.log(props.user.email);
    console.log(props.game.player1);
  }

  return displayLoading ? (
    <div></div>
  ) : (
    <div id="containerGameItem" style={props.style} onClick={() => props.onClick()}>
      <div id="GameItem_top">
        <div className="GameItem_name">{props.user.name}</div>
        <div id="GameItem_versus">vs</div>
        <div className="GameItem_name">{player2.name}</div>
      </div>
      <div id="GameItem_background">
        <div id="gameItem_numberDimensionsContainer">
          <div id="gameItem_numberDimensions">
            {props.game.dimensions}
            <div id="gameItem_legendDimensions">dimensions</div>
          </div>

          {/* <Canvas 
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%"
          }}
        >
          <CanvasContent game={props.game} canvasAxes={props.game.dimensions > 2 ? [0, 1, 2] : [0, 1]} orbit={false} />
        </Canvas> */}
        </div>
      </div>
      <div
        id="GameItem_bottom"
        style={{
          backgroundColor: play ? "rgba(178, 237, 204,1)" : "rgba(237, 178, 204,1)"
        }}
      >
        {play ? (
          <div style={{ fontWeight: "bold", fontSize: 15 }}>Your turn to play</div>
        ) : (
          <div style={{ fontWeight: "bold", fontSize: 15 }}>Wait adversary to play</div>
        )}
        <div id="GameItem_boulesimages">
          <div className="GameItem_boulesimageSide">
            <img src={require("../assets/boulerouge.png")} width="30" className="GameItem_image" />
            <div id="GameItem_bouleslegendLeft">{"x " + props.game.vectors1.length}</div>
          </div>
          <div className="GameItem_boulesimageSide">
            <div id="GameItem_bouleslegendRight">{"x " + props.game.vectors2.length}</div>
            <img src={require("../assets/boulejaune.png")} width="30" className="GameItem_image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
