import React, { FunctionComponent, useState, useEffect } from "react";
import CanvasContent from "./CanvasContent";
import { Canvas } from "react-three-fiber";
import CSS from "csstype";
import "./GameItem.css";
import API from "./API";
import Constantes from "./Constantes";

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

  const gradientGrey =
    "linear-gradient(45deg,rgba(190, 190, 190, 1),rgba(210, 210, 210, 1),rgba(190, 190, 190, 1),rgba(210, 210, 210, 1),rgba(190, 190, 190, 1),rgba(210, 210, 210, 1))";
  const gradientGreen =
    "linear-gradient(45deg,rgb(84, 224, 159),rgba(65, 181, 127, 1),rgb(84, 224, 159),rgba(65, 181, 127, 1),rgb(84, 224, 159),rgba(65, 181, 127, 1))";
  const gradientRed =
    "linear-gradient(45deg,rgba(173, 25, 17,1),rgba(140, 10, 10,1),rgba(173, 25, 17,1),rgba(140, 10, 10,1),rgba(173, 25, 17,1),rgba(140, 10, 10,1))";

  const winnerIsMe =
    (props.game.winner1 && props.game.player1 === props.user.email) ||
    (!props.game.winner1 && props.game.player1 !== props.user.email);

  return displayLoading ? (
    <div></div>
  ) : (
    <div
      id="containerGameItem"
      style={{
        ...props.style,
        backgroundImage: props.game.finish ? (winnerIsMe ? gradientGreen : gradientRed) : gradientGrey
      }}
      onClick={() => props.onClick()}
    >
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
        </div>
      </div>
      <div id="GameItem_bottom">
        {props.game.finish ? (
          <div>
            {winnerIsMe ? (
              <div className="GameItem_legend">You Win</div>
            ) : (
              <div className="GameItem_legend">You loose</div>
            )}
          </div>
        ) : (
          <div>
            {play ? (
              <div
                className="GameItem_legend"
                style={{
                  color: Constantes.colorText1
                }}
              >
                Your turn to play
              </div>
            ) : (
              <div
                className="GameItem_legend"
                style={{
                  color: Constantes.colorText3
                }}
              >
                Wait adversary to play
              </div>
            )}
          </div>
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
