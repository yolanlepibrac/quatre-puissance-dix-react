import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import GameItem from "./GameItem";
import ColumnPlayer from "./ColumnPlayer";
import CanvasContent from "./CanvasContent";
import { Canvas } from "react-three-fiber";
import vectorHelper from "./vectorHelper";
import gameHelper from "./gameHelper";

function GameInterface(props) {
  const [currentVector, setCurrentVector] = useState(
    initializeVector(props.game.dimension - 1)
  );
  const [id] = useState(1);
  const [game, setGame] = useState(props.game);
  const [canvasAxes, setCanvasAxes] = useState([9, 1, 2]);

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
    if (a.length != b.length) return false;
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
    let newGame = game;
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
            vectorHelper.vectorAddition(
              vector,
              vectorHelper.vectorMultiply(difference, k)
            )
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
            vectorHelper.vectorAddition(
              vector,
              vectorHelper.vectorMultiply(difference, l)
            )
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
    let axes = canvasAxes.slice();

    if (axes.includes(numeroAxis)) {
      axes.splice(axes.indexOf(numeroAxis), 1);
      setCanvasAxes(axes);
    } else {
      axes.push(numeroAxis);
      setCanvasAxes(axes);
    }
    console.log(axes);
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
        ></ColumnPlayer>
        <ColumnPlayer
          name={"Player 2"}
          tabOfVectors={game.vectors2}
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
          />
          <Canvas
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "80vh"
            }}
          >
            <CanvasContent game={game} canvasAxes={canvasAxes} />
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
              <MapCoordinates
                dimension={game.dimension}
                setCoordinateValue={setCoordinateValue}
              ></MapCoordinates>
              <CoordinateZ></CoordinateZ>
            </div>
            <button onClick={setVector}>SET VECTOR</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoordinatePicker(props) {
  let arrayOfCoordinate = [];
  let positionLetter = "z".charCodeAt(0);
  for (let index = props.dimension - 1; index >= 0; index--) {
    arrayOfCoordinate[index] = String.fromCharCode(positionLetter);
    positionLetter--;
  }
  return (
    <div style={{ display: "flex" }}>
      {arrayOfCoordinate.map((dimension, numero) => {
        return (
          <button
            disabled={
              !props.canvasAxes.includes(numero) && props.canvasAxes.length >= 3
            }
            style={{
              width: "100%",
              backgroundColor: props.canvasAxes.includes(numero)
                ? "rgba(200,200,0)"
                : "rgba(235,235,235)"
            }}
            onClick={() => props.toggleAxis(numero)}
          >
            {dimension}
          </button>
        );
      })}
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

export default GameInterface;
