import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";
import GameInterface from "./GameInterface";
import YolanHeader from "./YolanHeader";
import { Switch, Route } from "react-router-dom";

function MyApp() {
  const [currentGame, setCurrentGame] = useState({});
  let history = useHistory();

  function navigateGame(game) {
    setCurrentGame(game);
    history.push("/game");
  }

  function quitGame() {
    history.push("/");
  }

  return (
    <div id="appContainer">
      <YolanHeader
        className="MyButton"
        backgroundColor="rgba(132,123,231,1)"
        height={50}
      >
        Quatre Puissance Dix
      </YolanHeader>
      <div style={{ height: "calc( 100vh - 50px )" }}>
        <Switch>
          <Route exact path="/">
            <Dashboard navigateGame={navigateGame}></Dashboard>
          </Route>
          <Route path="/game">
            <GameInterface
              game={currentGame}
              quitGame={quitGame}
            ></GameInterface>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default MyApp;
