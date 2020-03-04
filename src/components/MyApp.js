import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";
import GameInterface from "./GameInterface";
import Connect from "./Connect";
import YolanHeader from "./YolanHeader";
import GameRouter from "./GameRouter";
import { Switch, Route, Redirect } from "react-router-dom";

function MyApp() {
  const [currentGame, setCurrentGame] = useState({});
  const [games, setGames] = useState([]);
  const [user, setUser] = useState({});
  const [connected, setConnected] = useState(false);

  let history = useHistory();

  function navigateHome(data) {
    console.log("connected");
    setConnected(true);
    setGames(data.games);
    setUser(data.user);
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
          <GameRouter user={user} connected={connected} games={games} />
        </Switch>
      </div>
    </div>
  );
}

export default MyApp;
