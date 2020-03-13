import React, { FunctionComponent, useState, useEffect } from "react";
import "./ModalNewGame.css";
import API from "./API";
import Constantes from "./Constantes";
import socketIOClient from "socket.io-client";
import InputLogin from "./InputLogin";
import PickNumber from "./PickNumber";

interface Props {
  setDisplayLoading: any;
  setModalNewGame: any;
  player1email: string;
}

const ModalNewGame: FunctionComponent<Props> = props => {
  const [player2email, setPlayer2email] = useState("");
  const [searchName, setSearchName] = useState("");
  const [dimensions, setDimensions] = useState(2);
  const [searchResult, setSearchResult] = useState([]);

  function searchUser(name: string) {
    setSearchName(name);
    if (name.length === 0 || name === undefined) {
      return;
    }
    API.searchUsers(name)
      .then((users: any) => {
        setSearchResult(users.data.users);
        console.log(users);
      })
      .catch((error: any) => {
        console.log(error);
        alert("Impossible to find users");
      });
  }

  function createGame() {
    console.log(player2email.length);
    if (dimensions > 10) {
      alert("Number of dimensions should be maximum of 10");
      return;
    }
    if (player2email.length <= 0 || player2email === undefined || player2email === props.player1email) {
      return;
    }
    props.setDisplayLoading(true);
    if (props.player1email !== undefined && player2email !== undefined && dimensions !== undefined) {
      API.createGame(props.player1email, player2email, dimensions).then((data: any) => {
        API.setUserGame(props.player1email, data.data.game.id).then((response: any) => {
          console.log(response);
          API.setUserGame(player2email, data.data.game.id).then((response: any) => {
            const socket = socketIOClient(Constantes.server);
            const message = {
              email1: props.player1email,
              email2: player2email,
              game: data.data.game
            };
            socket.emit("msgToServer", message);
            props.setDisplayLoading(false);
            props.setModalNewGame(false);
          });
        });
      });
    } else {
      alert("Choose a second player to play");
    }
  }

  function pressKey(event: KeyboardEvent, email: string) {
    if (event.which === 13) {
      pickPlayer2(email);
    }
  }

  function pickPlayer2(email: string) {
    console.log(email);
    setPlayer2email(email);
  }

  return (
    <div>
      <div id="modalNewGame">
        <div onClick={() => props.setModalNewGame(false)} id="modalNewGame_whiteBackground"></div>
        <div id="modalNewGame_container">
          <div id="modalNewGame_topBar">Create a new Game</div>
          <div id="modalNewGame_quit" onClick={() => props.setModalNewGame(false)}>
            <img src={require("../assets/cross.png")} width="40" />
          </div>
          <div id="modalNewGame_content">
            <div className="modalNewGame_label">Pick second player</div>
            <div id="modalNewGame_playerPicker">
              <InputLogin
                id={1}
                label="player 2"
                locked={false}
                active={false}
                value={searchName}
                onChange={(e: string) => searchUser(e)}
              ></InputLogin>
              <div id="modalNewGame_searchResultContainer">
                {searchResult.length > 0 &&
                  searchResult.map((user: any, key: number) => {
                    if (props.player1email !== user.email) {
                      return (
                        <div
                          tabIndex={key}
                          className={
                            user.email === player2email
                              ? "modalNewGame_searchActiveResult"
                              : "modalNewGame_searchResult"
                          }
                          key={key}
                          onClick={() => pickPlayer2(user.email)}
                          onKeyPress={(e: any) => pressKey(e, user.email)}
                        >
                          {user.name}
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            <div className="modalNewGame_label">Number of Dimensions</div>
            <PickNumber value={dimensions} onChange={(value: number) => setDimensions(value)}></PickNumber>
            <div
              tabIndex={0}
              id="modalNewGame_validate"
              className={player2email.length > 0 ? "modalNewGame_unlocked" : "modalNewGame_locked"}
              onClick={createGame}
            >
              Validate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalNewGame;
