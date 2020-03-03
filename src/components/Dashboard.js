import React, { useState, useEffect, useRef } from "react";
import GameItem from "./GameItem";
import API from "./API";
import socketIOClient from "socket.io-client";
import Constantes from "./Constantes";

export default function MyApp(props) {
  const [games, setGames] = useState(props.games);
  const [modalNewGame, setModalNewGame] = useState(false);

  useEffect(() => {
    const socket = socketIOClient(Constantes.server);
    socket.on(props.user.email, newGame => {
      props.setGame(newGame);
    });
  });

  function navigateGame(game) {
    props.navigateGame(game);
  }

  return (
    <div id="appContainer">
      <button onClick={() => setModalNewGame(true)}>New Game</button>
      {modalNewGame && (
        <ModalNewGame setModalNewGame={setModalNewGame} player1email={props.user.email} addGame={props.addGame} />
      )}
      <div style={{ textAlign: "center" }}>
        Log socket
        {/* response ? <p>The temperature in Florence is: {response} °F</p> : <p>Loading...</p> */}
      </div>
      {games.length > 0 &&
        games.map((game, key) => {
          return (
            <GameItem
              user={props.user}
              key={key}
              game={game}
              onClick={() => navigateGame(game)}
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

function ModalNewGame(props) {
  const [player2email, setPlayer2email] = useState("");
  const [dimensions, setDimensions] = useState(2);

  function createGame() {
    if (props.player1email !== undefined && player2email !== undefined && dimensions !== undefined) {
      API.createGame(props.player1email, player2email, dimensions).then(data => {
        props.addGame(data.data.game);
        API.setUserGame(props.player1email, data.data.game.id).then(response => {
          console.log(response);
          API.setUserGame(player2email, data.data.game.id).then(response => {
            console.log(response);
          });
        });
      });
    } else {
      alert("Choose a second player to play");
    }
  }

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div
          onClick={() => props.setModalNewGame(false)}
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(255,255,255,0.7)",
            height: "100vh",
            width: "100%",
            position: "absolute",
            zIndex: 10,
            top: 0,
            left: 0
          }}
        ></div>
        <div
          style={{
            backgroundColor: "rgba(100,156,218,1)",
            display: "flex",
            flexDirection: "column",
            width: 200,
            zIndex: 11
          }}
        >
          <label>Player 2</label>
          <input onChange={e => setPlayer2email(e.target.value)} value={player2email} />
          <label>password</label>
          <input type="number" max={10} min={2} onChange={e => setDimensions(e.target.value)} value={dimensions} />
          <div onClick={createGame}>Validate</div>
        </div>
      </div>
    </div>
  );
}
