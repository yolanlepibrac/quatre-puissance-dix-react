import React, { useState, useEffect, useRef } from "react";
import ColumnPlayer from "./ColumnPlayer";
import CanvasContent from "./CanvasContent";
import { Canvas } from "react-three-fiber";
import vectorHelper from "./vectorHelper";
import gameHelper from "./gameHelper";
import Constantes from "./Constantes";
import API from "./API";
import socketIOClient from "socket.io-client";
import Loading from "./Loading";
import "./GameInterface.css";

export default function GameInterface(props) {
  const [currentVector, setCurrentVector] = useState(initializeVector(props.game.dimensions - 1));
  const [canvasAxes, setCanvasAxes] = useState(props.game.dimensions > 2 ? [0, 1, props.game.dimensions - 1] : [0, 1]);
  const [hoveredBoules0, setHoveredBoules0] = useState([]);
  const [hoveredBoules1, setHoveredBoules1] = useState([]);
  const [displayLoading, setDisplayLoading] = useState(true);
  const [player2, setPlayer2] = useState({ name: "" });

  const [stateTest, setStateTest] = useState(0);
  const socket = socketIOClient(Constantes.server);

  const secondPlayer = props.game.player1 === props.user.email ? props.game.player2 : props.game.player1;

  useEffect(() => {
    setDisplayLoading(false);
  }, [props]);

  useEffect(() => {
    API.getUserByMail(secondPlayer).then(dataUser => {
      console.log(dataUser.data.user);
      setPlayer2(dataUser.data.user);
      setDisplayLoading(false);
    });
    console.log(props.game);
  }, []);

  function initializeVector(dimensions) {
    let array = [];
    for (let index = 0; index < dimensions; index++) {
      array.push(0);
    }
    return array;
  }

  function quitGame() {
    props.quitGame();
  }

  function setCoordinateValue(value, coordinate) {
    let vect = currentVector;
    vect[coordinate] = parseInt(value);
    setCurrentVector(vect);
  }

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  function setVector() {
    setDisplayLoading(true);
    if (!props.game.vectors1 || !props.game.vectors2) {
      setDisplayLoading(false);
      return;
    }

    for (let index = 0; index < currentVector.length; index++) {
      if (currentVector[index] >= gameHelper.sizeMap(props.game.dimensions)) {
        setDisplayLoading(false);
        alert(
          "The maximum of value for each dimension of the vector played is " +
            (gameHelper.sizeMap(props.game.dimensions) - 1)
        );
        return;
      }
      if (currentVector[index] < 0) {
        setDisplayLoading(false);
        alert("The minimum of value for each dimension of the vector played is 1");
        return;
      }
    }

    let vectExisting = [];
    let allvect = props.game.vectors1.concat(props.game.vectors2);

    for (let index = 0; index < allvect.length; index++) {
      let vect = allvect[index].slice();
      vect.pop();
      if (arraysEqual(vect, currentVector)) {
        vectExisting.push(allvect[index][props.game.dimensions - 1]);
      }
    }

    let myVectors = props.game.player1 === props.user.email ? props.game.vectors1 : props.game.vectors2;
    let otherVectors = props.game.player1 === props.user.email ? props.game.vectors2 : props.game.vectors1;
    if (myVectors.length > otherVectors.length) {
      setDisplayLoading(false);
      alert("Something went wrong, somebody have played to much before other player played");
      return;
    }

    //si au moins 1 vecteur similaire existe
    let valueZ = vectExisting.length > 0 ? Math.max(...vectExisting) + 1 : 0;
    if (valueZ < gameHelper.sizeMap(props.game.dimensions)) {
      let vectorToAdd = currentVector.concat(valueZ);
      console.log(vectorToAdd);
      console.log(myVectors);
      let checkIfWin = checkWin(vectorToAdd, myVectors);
      console.log(checkIfWin);
      if (checkIfWin.win) {
        setWin(vectorToAdd, checkIfWin.vectors);
      } else {
        addVector(vectorToAdd);
      }
    } else {
      setDisplayLoading(false);
      alert(
        "Tu ne peux plus ajouter de boules suivant ce vecteur. La limite de " +
          gameHelper.sizeMap(props.game.dimensions) +
          " est atteinte"
      );
    }
  }

  function isPlayer1() {
    if (props.game.player1 === props.user.email) {
      return true;
    } else {
      return false;
    }
  }

  function playerToPlay() {
    if ((isPlayer1() && props.game.player1ToPlay) || (!isPlayer1() && !props.game.player1ToPlay)) {
      return true;
    } else {
      return false;
    }
  }

  function addVector(newVect) {
    let newGame = { ...props.game };
    if (isPlayer1()) {
      newGame.vector1 = props.game.vectors1.push(newVect);
    } else {
      newGame.vector1 = props.game.vectors2.push(newVect);
    }
    updateGame(props.game.player1, props.game.player2, newGame);
  }

  function setWin(newVect, vectorsWinner) {
    let newGame = { ...props.game };
    newGame.finish = true;
    newGame.vectorsWinner = vectorsWinner;
    if (isPlayer1()) {
      newGame.winner1 = true;
      newGame.vector1 = props.game.vectors1.push(newVect);
    } else {
      newGame.winner1 = false;
      newGame.vector1 = props.game.vectors2.push(newVect);
    }
    updateGame(props.game.player1, props.game.player2, newGame);
  }

  function updateGame(email1, email2, game) {
    let newGame = game;
    newGame.player1ToPlay = !game.player1ToPlay;
    API.updateGame(newGame)
      .then(response => {
        sendGame(email1, email2, newGame);
      })
      .catch(error => {
        console.log(error);
      });
    setCurrentVector(initializeVector(props.game.dimensions - 1));
  }

  function sendGame(email1, email2, game) {
    const message = {
      email1,
      email2,
      game
    };
    socket.emit("msgToServer", message);
    console.log("sent");
  }

  function checkWin(vector, myVectors) {
    for (let i = 0; i < myVectors.length; i++) {
      let difference = vectorHelper.vectorDifference(myVectors[i], vector);

      if (vectorHelper.isLessThanOne(difference)) {
        let k = 1;
        let numberAlign = 1; //boule just put
        let winVectors = [vector];
        //positive direction
        while (
          vectorHelper.vectorContain(
            myVectors,
            vectorHelper.vectorAddition(vector, vectorHelper.vectorMultiply(difference, k))
          )
        ) {
          winVectors.push(vectorHelper.vectorAddition(vector, vectorHelper.vectorMultiply(difference, k)));
          numberAlign++;
          k++;
        }
        let l = -1;
        //negative direction
        while (
          vectorHelper.vectorContain(
            myVectors,
            vectorHelper.vectorAddition(vector, vectorHelper.vectorMultiply(difference, l))
          )
        ) {
          winVectors.push(vectorHelper.vectorAddition(vector, vectorHelper.vectorMultiply(difference, l)));
          numberAlign++;
          l--;
        }
        if (numberAlign >= gameHelper.numberToWin(props.game.dimensions)) {
          return { win: true, vectors: winVectors };
        }
      }
    }

    return { win: false, vectors: [] };
  }

  function toggleAxis(numeroAxis) {
    let canvasAxesTmp = canvasAxes.slice();
    if (canvasAxesTmp.includes(numeroAxis)) {
      canvasAxesTmp.splice(canvasAxesTmp.indexOf(numeroAxis), 1);
    } else {
      canvasAxesTmp.push(numeroAxis);
    }
    setCanvasAxes(canvasAxesTmp);
    setStateTest(stateTest + 1);
  }

  function setHover(key, player, bool) {
    let hoveredBoulesTmp = player === 0 ? hoveredBoules0.slice() : hoveredBoules1.slice();
    if (bool) {
      hoveredBoulesTmp.push(key);
    } else {
      hoveredBoulesTmp.splice(hoveredBoulesTmp.indexOf(key), 1);
    }
    if (player === 0) {
      setHoveredBoules0(hoveredBoulesTmp);
    } else {
      setHoveredBoules1(hoveredBoulesTmp);
    }
  }

  return (
    <div id="appContainer" style={{ display: "flex", flexDirection: "column" }}>
      {displayLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <div onClick={quitGame} id="GameInterface_boutonRetour">
            back to menu
          </div>
          <div id="GameInterface_GameContainer">
            <ColumnPlayer
              playerIsMe={isPlayer1()}
              playerIs1={true}
              name={"Player 1 : " + (isPlayer1() ? props.user.name : player2.name)}
              tabOfVectors={props.game.vectors1}
              hoveredBoules={hoveredBoules0}
              color={Constantes.colorPlayer1}
              game={props.game}
            ></ColumnPlayer>
            <ColumnPlayer
              playerIsMe={!isPlayer1()}
              playerIs1={false}
              name={"Player 2 : " + (!isPlayer1() ? props.user.name : player2.name)}
              tabOfVectors={props.game.vectors2}
              hoveredBoules={hoveredBoules1}
              color={Constantes.colorPlayer2}
              game={props.game}
            ></ColumnPlayer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                position: "relative"
              }}
            >
              <CoordinatePicker
                dimensions={props.game.dimensions}
                canvasAxes={canvasAxes}
                toggleAxis={toggleAxis}
                stateTest={stateTest}
              />
              <Canvas
                camera={{
                  position: [
                    -gameHelper.sizeMap(props.game.dimensions),
                    gameHelper.sizeMap(props.game.dimensions),
                    -gameHelper.sizeMap(props.game.dimensions)
                  ]
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "calc(100vh - 190px)"
                }}
              >
                <CanvasContent
                  game={props.game}
                  canvasAxes={canvasAxes}
                  setHover={(key, player, bool) => setHover(key, player, bool)}
                  orbit={true}
                />
              </Canvas>
              <div id="GameInterface_setItemContainer">
                {props.game.finish !== true ? (
                  <div>
                    {playerToPlay() ? (
                      <div>
                        <div style={{ display: "flex" }}>
                          <MapCoordinates
                            dimensions={props.game.dimensions}
                            setCoordinateValue={setCoordinateValue}
                          ></MapCoordinates>
                          <CoordinateZ></CoordinateZ>
                        </div>
                        <div id="GameInterface_sendVector" onClick={setVector}>
                          Add vector
                        </div>
                      </div>
                    ) : (
                      <div id="GameInterface_BottomTextWait">Wait for the second player to play</div>
                    )}
                  </div>
                ) : (
                  <div
                    id="GameInterface_BottomTextWait"
                    style={{
                      fontSize: 30,
                      color:
                        (props.game.winner1 && isPlayer1()) || (!props.game.winner1 && !isPlayer1())
                          ? Constantes.colorApp1
                          : Constantes.colorApp3
                    }}
                  >
                    {(props.game.winner1 && isPlayer1()) || (!props.game.winner1 && !isPlayer1())
                      ? "You win"
                      : "You loose"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CoordinatePicker = props => {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: 20,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000
      }}
    >
      {gameHelper.letterArray(props.dimensions).map((dimensions, numero) => {
        return (
          <CoordinateButton
            numero={numero}
            key={numero}
            toggleAxis={() => props.toggleAxis(numero)}
            dimensions={dimensions}
            canvasAxes={props.canvasAxes}
          ></CoordinateButton>
        );
      })}
    </div>
  );
};

function CoordinateButton(props) {
  let axeNumero = props.canvasAxes.sort().indexOf(props.numero);
  let selected = props.canvasAxes.includes(props.numero);
  let active = selected || props.canvasAxes.length < 3;
  let backgroundColor =
    axeNumero === 2
      ? Constantes.colorAxe3.color1
      : axeNumero === 1
      ? Constantes.colorAxe2.color1
      : Constantes.colorAxe1.color1;
  let backgroundColor2 =
    axeNumero === 2
      ? Constantes.colorAxe3.color2
      : axeNumero === 1
      ? Constantes.colorAxe2.color2
      : Constantes.colorAxe1.color2;
  let background = selected
    ? "linear-gradient(to bottom, " + backgroundColor + " 5%,  " + backgroundColor2 + " 100%)"
    : "linear-gradient(to bottom, rgba(235,235,235,1) 5%,  rgba(200,200,200,1) 100%)";
  let color = selected ? "rgba(235, 235, 235,1)" : active ? "rgba(100, 100, 100,1)" : "rgba(180,180,180,1)";

  return (
    <div
      key={props.numero}
      style={{
        width: "100%",
        height: 30,
        boxShadow: active ? "0px 1px 0px 0px #999999" : "0px 0px 0px 0px #1c1b18",
        borderRadius: 4,
        background: background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: active ? "pointer" : "default",
        color: color,
        fontFamily: "Arial",
        fontSize: 14,
        fontWeight: "bold",
        margin: 2,
        textDecoration: "none",
        textShadow: active ? "0px 0px 1px #888888" : "0px 1px 0px #ffffff"
      }}
      onClick={() => active && props.toggleAxis(props.numero)}
    >
      {props.dimensions}
    </div>
  );
}

function MapCoordinates(props) {
  let arrayOfCoordinate = [];
  let positionLetter = "y".charCodeAt(0);
  for (let index = props.dimensions - 2; index >= 0; index--) {
    arrayOfCoordinate[index] = String.fromCharCode(positionLetter);
    positionLetter--;
  }
  return arrayOfCoordinate.map((charLetter, position) => {
    return (
      <InputCoordinate
        key={position}
        setCoordinateValue={value => props.setCoordinateValue(value, position)}
        coordinate={charLetter}
        dimensions={gameHelper.sizeMap(props.dimensions)}
      ></InputCoordinate>
    );
  });
}

function CoordinateZ() {
  return (
    <div style={{ width: "100%" }}>
      <label style={{ color: "white" }}>z</label>
      <div
        style={{
          backgroundColor: "rgba(220,220,220,1)",
          marginTop: 1,
          height: 28,
          width: "100%",
          borderRadius: 3,
          borderWidth: 1,
          borderStyle: "solid",
          borderBlockColor: "rgba(130,130,130,1)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          lineHeight: 1
        }}
      >
        Automatic Value
      </div>
    </div>
  );
}

function InputCoordinate(props) {
  const [value, setCoordinateValue] = useState(0);
  function setInputValue(e) {
    props.setCoordinateValue(e.target.value - 1);
    setCoordinateValue(e.target.value - 1);
  }
  return (
    <div style={{ width: "100%" }}>
      <label style={{ color: "white" }}>{props.coordinate}</label>
      <input
        type="number"
        min="1"
        max={props.dimensions}
        onChange={e => setInputValue(e)}
        style={{
          width: "100%",
          height: 30,
          fontSize: 16,
          color: "rgba(140,140,140,1)"
        }}
        value={value + 1}
      ></input>
    </div>
  );
}
