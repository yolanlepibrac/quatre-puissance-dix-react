import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";
import GameInterface from "./GameInterface";
import { Switch, Route, Redirect } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Constantes from "./Constantes";

function GameRouter(props) {
  const [currentGame, setCurrentGame] = useState({});
  const [games, setGames] = useState(props.games);
  const socket = socketIOClient(Constantes.server);
  const currentGameRef = useRef(currentGame);
  useEffect(() => {
    currentGameRef.current = currentGame;
  });

  let history = useHistory();

  useEffect(() => {
    const handler = newGame => {
      setGameState(newGame);
    };
    socket.on(props.user.email, handler);
    return () => {
      socket.off(props.user.email, handler);
    };
  }, []);

  function setGameState(newGame) {
    console.log(newGame.game);
    setGamesToState(newGame.game);
    if (newGame.game.id === currentGameRef.current.id) {
      setCurrentGame(newGame.game);
    }
  }

  function navigateGame(game) {
    setCurrentGame(game);
    //currentGameRef.current = currentGame;
    history.push("/game");
  }

  function quitGame() {
    history.push("/home");
  }

  function disconnect() {
    history.push("/");
  }

  function setGamesToState(newGame) {
    let existingGame = false;
    for (let index = 0; index < games.length; index++) {
      if (newGame.id == games[index].id) {
        let newGames = games;
        newGames[index] = newGame;
        setGames(newGames);
        existingGame = true;
      }
    }
    if (!existingGame) {
      setGames([...games, newGame]);
    }
  }

  return (
    <div id="appContainer">
      <Switch>
        <Route exact path="/home">
          {!props.connected && <Redirect to="/"></Redirect>}
          <Dashboard navigateGame={navigateGame} user={props.user} games={games} setGame={setGamesToState}></Dashboard>
        </Route>
        <Route exact path="/game">
          {!props.connected && <Redirect to="/"></Redirect>}
          <GameInterface game={currentGame} quitGame={quitGame} user={props.user}></GameInterface>
        </Route>
      </Switch>
    </div>
  );
}

export default GameRouter;
