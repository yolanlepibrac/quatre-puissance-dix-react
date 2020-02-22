import React, { useState, useEffect, useRef } from "react";
import ColumnPlayer from "./ColumnPlayer";
import CanvasContent from "./CanvasContent";
import { Canvas } from "react-three-fiber";
import vectorHelper from "./vectorHelper";
import gameHelper from "./gameHelper";
import Constantes from "./Constantes";

export default function GameInterface(props) {
  const [currentVector, setCurrentVector] = useState(initializeVector(props.game.dimension - 1));
  const [id] = useState(1);
  const [game, setGame] = useState(props.game);
  const [canvasAxes, setCanvasAxes] = useState([0, 1, props.game.dimension - 1]);
  const [hoveredBoules, setHoveredBoules] = useState([]);

  const [stateTest, setStateTest] = useState(0);

  function initializeVector(dimension) {
    let array = [];
    for (let index = 0; index < dimension; index++) {
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
    if (!game.vectors1 || !game.vectors2) {
      return;
    }
    let vectExisting = [];
    let allvect = game.vectors1.concat(game.vectors2);

    for (let index = 0; index < allvect.length; index++) {
      let vect = allvect[index].slice();
      vect.pop();
      if (arraysEqual(vect, currentVector)) {
        vectExisting.push(allvect[index][game.dimension - 1]);
      }
    }
    let myVectors = game.players[0] === id ? game.vectors1 : game.vectors2;

    //si au moins 1 vecteur similaire existe
    let valueZ = vectExisting.length > 0 ? Math.max(...vectExisting) + 1 : 0;
    if (valueZ < gameHelper.sizeMap(game.dimension)) {
      let vectorToAdd = currentVector.concat(valueZ);
      if (checkWin(vectorToAdd, myVectors)) {
        alert("You Win");
      } else {
        addVector(vectorToAdd);
      }
    } else {
      alert(
        "Tu ne peux plus ajouter de boules suivant ce vecteur. La limite de " +
          gameHelper.sizeMap(game.dimension) +
          " est atteinte"
      );
    }
  }

  function addVector(newVect) {
    if (game.players[0] === id) {
      setGame({ ...game, vector1: game.vectors1.push(newVect) });
    } else {
      setGame({ ...game, vector2: game.vectors2.push(newVect) });
    }
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
        if (numberAlign >= gameHelper.numberToWin(game.dimension)) {
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

  function setHover(position, bool) {
    let hoveredBoulesTmp = hoveredBoules;
    if (bool) {
      hoveredBoulesTmp.push(position);
    } else {
      for (let index = 0; index < hoveredBoulesTmp.length; index++) {
        if (vectorHelper.vectorEqual(hoveredBoulesTmp[index], position)) {
          hoveredBoulesTmp.splice(index, 1);
        }
      }
    }
    setHoveredBoules([...hoveredBoules, hoveredBoulesTmp]);
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
        {game.players && (
          <div>
            <div>{game.players[0]}</div>
            <div>{game.players[1]}</div>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ColumnPlayer
          name={"Player 1"}
          tabOfVectors={game.vectors1}
          hoveredBoules={hoveredBoules}
          color={Constantes.colorPlayer1}
        ></ColumnPlayer>
        <ColumnPlayer
          name={"Player 2"}
          tabOfVectors={game.vectors2}
          hoveredBoules={hoveredBoules}
          color={Constantes.colorPlayer2}
        ></ColumnPlayer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "50%"
          }}
        >
          <CoordinatePicker
            dimension={game.dimension}
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
              game={game}
              canvasAxes={canvasAxes}
              setHover={(position, bool) => setHover(position, bool)}
            />
          </Canvas>
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
              <MapCoordinates dimension={game.dimension} setCoordinateValue={setCoordinateValue}></MapCoordinates>
              <CoordinateZ></CoordinateZ>
            </div>
            <button onClick={setVector}>SET VECTOR</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function letterArray(dimension) {
  let arrayOfCoordinate = [];
  let positionLetter = "z".charCodeAt(0);
  for (let index = dimension - 1; index >= 0; index--) {
    arrayOfCoordinate[index] = String.fromCharCode(positionLetter);
    positionLetter--;
  }
  return arrayOfCoordinate;
}

const CoordinatePicker = props => {
  return (
    <div style={{ display: "flex" }}>
      {letterArray(props.dimension).map((dimension, numero) => {
        return (
          <CoordinateButton
            numero={numero}
            toggleAxis={() => props.toggleAxis(numero)}
            dimension={dimension}
            canvasAxes={props.canvasAxes}
          ></CoordinateButton>
        );
      })}
    </div>
  );
};

function CoordinateButton(props) {
  let selected = props.canvasAxes.includes(props.numero);
  let active = selected || props.canvasAxes.length < 3;
  let axeNumero = props.canvasAxes.sort().indexOf(props.numero);
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
  let color = active ? "rgba(80, 87, 57,1)" : "rgba(180,180,180,1)";

  return (
    <div
      key={props.numero}
      style={{
        width: "100%",
        height: 20,
        boxShadow: active ? "0px 1px 0px 0px #1c1b18" : "0px 0px 0px 0px #1c1b18",
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
        textShadow: "0px 1px 0px #ffffff"
      }}
      onClick={() => active && props.toggleAxis(props.numero)}
    >
      {props.dimension}
    </div>
  );
}

function MapCoordinates(props) {
  let arrayOfCoordinate = [];
  let positionLetter = "y".charCodeAt(0);
  for (let index = props.dimension - 2; index >= 0; index--) {
    arrayOfCoordinate[index] = String.fromCharCode(positionLetter);
    positionLetter--;
  }
  return arrayOfCoordinate.map((charLetter, position) => {
    return (
      <InputCoordinate
        key={position}
        setCoordinateValue={value => props.setCoordinateValue(value, position)}
        coordinate={charLetter}
        dimension={gameHelper.sizeMap(props.dimension)}
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
        max={props.dimension}
        onChange={e => setInputValue(e)}
        style={{ width: "100%" }}
        value={value}
      ></input>
    </div>
  );
}
