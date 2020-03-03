import React, { useState, useEffect, useRef } from "react";
import ColumnPlayer from "./ColumnPlayer";
import CanvasContent from "./CanvasContent";
import { Canvas } from "react-three-fiber";
import vectorHelper from "./vectorHelper";
import gameHelper from "./gameHelper";
import Constantes from "./Constantes";
import API from "./API";

import socketIOClient from "socket.io-client";

export default function GameInterface(props) {
  const [currentVector, setCurrentVector] = useState(initializeVector(props.game.dimensions - 1));
  const [canvasAxes, setCanvasAxes] = useState([0, 1, props.game.dimensions - 1]);
  const [hoveredBoules0, setHoveredBoules0] = useState([]);
  const [hoveredBoules1, setHoveredBoules1] = useState([]);

  const [stateTest, setStateTest] = useState(0);

  useEffect(() => {
    const socket = socketIOClient(Constantes.server);
    socket.on(props.user.email, newGame => {
      console.log(props.game.id);
      console.log(newGame.game.id);
      if (newGame.game.id === props.game.id) {
        props.setCurrentGame(newGame.game);
      }
    });
  });

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
    if (!props.game.vectors1 || !props.game.vectors2) {
      return;
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

    //si au moins 1 vecteur similaire existe
    let valueZ = vectExisting.length > 0 ? Math.max(...vectExisting) + 1 : 0;
    if (valueZ < gameHelper.sizeMap(props.game.dimensions)) {
      let vectorToAdd = currentVector.concat(valueZ);
      if (checkWin(vectorToAdd, myVectors)) {
        setWin(vectorToAdd);
      } else {
        addVector(vectorToAdd);
      }
    } else {
      alert(
        "Tu ne peux plus ajouter de boules suivant ce vecteur. La limite de " +
          gameHelper.sizeMap(props.game.dimensions) +
          " est atteinte"
      );
    }
  }

  function setWin() {
    /* function addVector(newVect) {
      if (props.game.player1 === props.user.email) {
        setGame({ ...props.game, vector1: props.game.vectors1.push(newVect), finish: true, winner1: true });
      } else {
        setGame({ ...props.game, vector2: props.game.vectors2.push(newVect), finish: true, winner1: false });
      }
    } */
    alert("You Win");
    //API.setGameWin(gameWin);
  }

  function isPlayer1() {
    if (props.game.player1 === props.user.email) {
      return true;
    } else {
      return false;
    }
  }

  function playerToPlay() {
    if ((isPlayer1 && props.game.player1ToPlay) || (!isPlayer1 && !props.game.player1ToPlay)) {
      return true;
    } else {
      return false;
    }
  }

  function addVector(newVect) {
    let email;
    let newGame = props.game;
    if (isPlayer1()) {
      newGame.vector1 = props.game.vectors1.push(newVect);
      email = props.game.player2;
    } else {
      newGame.vector1 = props.game.vectors2.push(newVect);
      email = props.game.player1;
    }
    updateGame(email, newGame);
  }

  function updateGame(email, game) {
    let newGame = game;
    newGame.player1ToPlay = !game.player1ToPlay;
    API.updateGame(newGame)
      .then(response => {
        console.log(response);
        sendGame(email, newGame);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function sendGame(email, game) {
    const socket = socketIOClient(Constantes.server);
    const message = {
      email,
      game
    };
    socket.emit("msgToServer", message);
  }

  function checkWin(vector, myVectors) {
    for (let i = 0; i < myVectors.length; i++) {
      let difference = vectorHelper.vectorDifference(myVectors[i], vector);
      if (vectorHelper.isLessThanOne(difference)) {
        let k = 1;
        let numberAlign = 1; //boule just put
        //positive direction
        while (
          vectorHelper.vectorContain(
            myVectors,
            vectorHelper.vectorAddition(vector, vectorHelper.vectorMultiply(difference, k))
          )
        ) {
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
          numberAlign++;
          l--;
        }
        if (numberAlign >= gameHelper.numberToWin(props.game.dimensions)) {
          return true;
        }
      }
    }

    return false;
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: 50,
          width: "100%",
          backgroundColor: "rgba(200,200,200,1)",
          justifyContent: "space-between"
        }}
      >
        <button
          onClick={quitGame}
          style={{
            display: "flex",
            width: 200
          }}
        >
          retour
        </button>
        {props.game.players1 && props.game.players2 && (
          <div>
            <div>{props.game.players1}</div>
            <div>{props.game.players2}</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ColumnPlayer
          name={"Player 1"}
          tabOfVectors={props.game.vectors1}
          hoveredBoules={hoveredBoules0}
          color={Constantes.colorPlayer1}
        ></ColumnPlayer>
        <ColumnPlayer
          name={"Player 2"}
          tabOfVectors={props.game.vectors2}
          hoveredBoules={hoveredBoules1}
          color={Constantes.colorPlayer2}
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
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "80vh"
            }}
          >
            <CanvasContent
              game={props.game}
              canvasAxes={canvasAxes}
              setHover={(key, player, bool) => setHover(key, player, bool)}
            />
          </Canvas>
          {props.game.finish !== true && playerToPlay() && (
            <div
              style={{
                height: "calc( 20vh - 50px )",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingRight: 20
              }}
            >
              <div style={{ display: "flex" }}>
                <MapCoordinates
                  dimensions={props.game.dimensions}
                  setCoordinateValue={setCoordinateValue}
                ></MapCoordinates>
                <CoordinateZ></CoordinateZ>
              </div>
              <button onClick={setVector}>SET VECTOR</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const CoordinatePicker = props => {
  return (
    <div
      style={{ display: "flex", marginBottom: 20, position: "absolute", top: 0, left: 0, width: "100%", zIndex: 1000 }}
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
        height: 20,
        boxShadow: active ? "0px 1px 0px 0px #999999" : "0px 0px 0px 0px #1c1b18",
        borderRadius: 4,
        background: background,
        display: "inline-block",
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
      <label>z</label>
    </div>
  );
}

function InputCoordinate(props) {
  const [value, setCoordinateValue] = useState(0);
  function setInputValue(e) {
    props.setCoordinateValue(e.target.value);
    setCoordinateValue(e.target.value);
  }
  return (
    <div style={{ width: "100%" }}>
      <label>{props.coordinate}</label>
      <input
        type="number"
        min="0"
        max={props.dimensions}
        onChange={e => setInputValue(e)}
        style={{ width: "100%" }}
        value={value}
      ></input>
    </div>
  );
}
