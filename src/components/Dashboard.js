import React, { useState, useEffect, useRef } from "react";
import GameItem from "./GameItem";
import Loading from "./Loading";
import ModalNewGame from "./ModalNewGame";
import ModalRules from "./ModalRules";
import "./Dashboard.css";

export default function MyApp(props) {
  const [modalNewGame, setModalNewGame] = useState(false);
  const [modalRules, setModalRules] = useState(false);
  const [displayLoading, setDisplayLoading] = useState(false);

  function navigateGame(game) {
    props.navigateGame(game);
  }

  return (
    <div id="dashBoardContainer" style={{ display: "flex", flexDirection: "row" }}>
      {modalNewGame && (
        <ModalNewGame
          setModalNewGame={setModalNewGame}
          player1email={props.user.email}
          setDisplayLoading={setDisplayLoading}
        />
      )}
      {modalRules && <ModalRules setModalRules={setModalRules} />}
      {displayLoading && <Loading></Loading>}
      <div id="menu">
        <div className="Dashboard_boutonMenu" onClick={() => setModalNewGame(true)}>
          New Game
        </div>
        <div className="Dashboard_boutonMenu" onClick={() => setModalRules(true)}>
          Rules
        </div>
      </div>
      <div
        style={{
          flexWrap: "wrap",
          display: "flex",
          width: "100%",
          overflow: "auto",
          height: "calc(100vh - 50px)"
        }}
      >
        {props.games.length > 0 &&
          props.games.map((game, key) => {
            return (
              <GameItem
                user={props.user}
                key={key}
                game={game}
                onClick={() => navigateGame(game)}
                style={{
                  width: 300,
                  height: 300,
                  borderRadius: 5,
                  borderStyle: "solid",
                  borderWidth: 2,
                  borderColor: "rgba(200,200,200,1)",
                  boxShadow: "2px 2px 4px 1px rgba(30, 30, 30, .7)",
                  overflow: "hidden",
                  margin: 20
                }}
              ></GameItem>
            );
          })}
      </div>
    </div>
  );
}
