import React, { useState, useEffect, useLayoutEffect } from "react";
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

  let history = useHistory();

  useEffect(() => {
    socket.on(props.user.email, newGame => {
      setGamesToState(newGame.game);
      if (newGame.game.id === currentGame.id) {
        setCurrentGame(newGame.game);
      }
    });
  }, []);

  function navigateGame(game) {
    setCurrentGame(game);
    history.push("/game");
  }

  function quitGame() {
    history.push("/home");
  }

  function disconnect() {
    history.push("/login");
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
          {!props.connected && <Redirect to="/login"></Redirect>}
          <Dashboard navigateGame={navigateGame} user={props.user} games={games} setGame={setGamesToState}></Dashboard>
        </Route>
        <Route exact path="/game">
          {!props.connected && <Redirect to="/login"></Redirect>}
          <GameInterface game={currentGame} quitGame={quitGame} user={props.user}></GameInterface>
        </Route>
      </Switch>
    </div>
  );
}

export default GameRouter;
