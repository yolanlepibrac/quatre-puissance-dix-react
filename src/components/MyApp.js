import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";
import GameInterface from "./GameInterface";
import Connect from "./Connect";
import YolanHeader from "./YolanHeader";
import GameRouter from "./GameRouter";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import "./MyApp.css";

function MyApp() {
  const [currentGame, setCurrentGame] = useState({});
  const [games, setGames] = useState([]);
  const [user, setUser] = useState({});
  const [connected, setConnected] = useState(false);

  let history = useHistory();

  function navigateHome(data) {
    console.log(data.user);
    setConnected(true);
    setGames(data.games);
    setUser(data.user);
    history.push("/home");
  }

  function disconnect() {
    localStorage.setItem("email", undefined);
    setConnected(false);
    history.push("/login");
  }

  return (
    <div id="appContainer">
      <YolanHeader
        className="MyButton"
        style={{
          backgroundImage: "linear-gradient(180deg, rgba(65, 181, 127, 1), rgb(70, 200, 140))"
        }}
        height={50}
        user={user}
      >
        {"Power Four Power Ten"}
        {connected && (
          <div onClick={() => disconnect()} id="buttonDisconnect">
            disconnect
          </div>
        )}
        {connected && user.name && (
          <div id="username">
            <div style={{ height: 16 }}>Connected as</div>
            <div>{user.name}</div>
          </div>
        )}
      </YolanHeader>
      <div
        style={{
          height: "calc( 100vh - 50px )",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>
          <Route path="/login">
            <Connect navigateHome={data => navigateHome(data)}></Connect>
          </Route>
          <GameRouter user={user} connected={connected} games={games} />
        </Switch>
      </div>
    </div>
  );
}

export default MyApp;
