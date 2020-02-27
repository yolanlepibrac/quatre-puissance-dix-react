import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";
import GameInterface from "./GameInterface";
import Connect from "./Connect";
import YolanHeader from "./YolanHeader";
import { Switch, Route, Redirect } from "react-router-dom";

function MyApp() {
  const [currentGame, setCurrentGame] = useState({});
  const [games, setGames] = useState([]);
  const [user, setUser] = useState({});
  const [connected, setConnected] = useState(false);

  let history = useHistory();

  function navigateGame(game) {
    setCurrentGame(game);
    history.push("/game");
  }

  function navigateHome(data) {
    setConnected(true);
    setGames(data.games);
    setUser(data.user);
    history.push("/home");
  }

  function addGame(game) {
    let tabOfGames = games;
    tabOfGames.push(game);
    setGames(tabOfGames);
  }

  function quitGame() {
    history.push("/home");
  }

  function disconnect() {
    history.push("/login");
  }

  return (
    <div id="appContainer">
      <YolanHeader className="MyButton" backgroundColor="rgba(132,123,231,1)" height={50}>
        {"Quatre Puissance Dix"}
        <button onClick={() => disconnect()} style={{ position: "absolute", right: 20, top: 10 }}>
          Disconnect
        </button>
      </YolanHeader>
      <div style={{ height: "calc( 100vh - 50px )", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Switch>
          <Route exact path="/login">
            <Connect navigateHome={data => navigateHome(data)}></Connect>
          </Route>
          <Route exact path="/home">
            {!connected && <Redirect to="/login"></Redirect>}
            <Dashboard navigateGame={navigateGame} user={user} games={games} addGame={addGame}></Dashboard>
          </Route>
          <Route exact path="/game">
            {!connected && <Redirect to="/login"></Redirect>}
            <GameInterface game={currentGame} quitGame={quitGame} user={user}></GameInterface>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default MyApp;
