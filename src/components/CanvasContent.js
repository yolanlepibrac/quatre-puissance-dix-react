import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import * as THREE from "three/src/Three";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Sphere from "./Sphere";
import gameHelper from "./gameHelper";

extend({ OrbitControls });

export default function CanvasContent(props) {
  function loopAllVect() {
    let tab = [];
    for (
      let indexDim1 = 0;
      indexDim1 <= gameHelper.sizeMap(props.game.dimension);
      indexDim1++
    ) {
      for (
        let indexDim2 = 0;
        indexDim2 <= gameHelper.sizeMap(props.game.dimension);
        indexDim2++
      ) {
        tab.push([
          [-1, indexDim1, indexDim2],
          [gameHelper.sizeMap(props.game.dimension) + 1, indexDim1, indexDim2]
        ]);
      }
    }
    for (
      let indexDim1 = 0;
      indexDim1 <= gameHelper.sizeMap(props.game.dimension);
      indexDim1++
    ) {
      for (
        let indexDim2 = 0;
        indexDim2 <= gameHelper.sizeMap(props.game.dimension);
        indexDim2++
      ) {
        tab.push([
          [indexDim1, -1, indexDim2],
          [indexDim1, gameHelper.sizeMap(props.game.dimension) + 1, indexDim2]
        ]);
      }
    }
    for (
      let indexDim1 = 0;
      indexDim1 <= gameHelper.sizeMap(props.game.dimension);
      indexDim1++
    ) {
      for (
        let indexDim2 = 0;
        indexDim2 <= gameHelper.sizeMap(props.game.dimension);
        indexDim2++
      ) {
        tab.push([
          [indexDim1, indexDim2, -1],
          [indexDim1, indexDim2, gameHelper.sizeMap(props.game.dimension) + 1]
        ]);
      }
    }
    return tab;
  }

  const {
    camera,
    gl: { domElement }
  } = useThree();
  return (
    <>
      <pointLight position={[10, 10, 10]} />
      <ambientLight />
      <Sphere />
      {props.game.vectors1 &&
        props.game.vectors1.map(vector => {
          return (
            <SpherePosition
              position={vector}
              canvasAxes={props.canvasAxes}
              color={"rgba(200,99,99,1)"}
            />
          );
        })}
      {props.game.vectors2 &&
        props.game.vectors2.map(vector => {
          return (
            <SpherePosition
              position={vector}
              canvasAxes={props.canvasAxes}
              color={"rgba(99,99,200,1)"}
            />
          );
        })}
      {loopAllVect().map(vect2 => {
        return <Line point0={vect2[0]} point1={vect2[1]}></Line>;
      })}
      <orbitControls args={[camera, domElement]} />
    </>
  );
}

const Line = props => {
  return (
    <line>
      <geometry
        attach="geometry"
        vertices={[props.point0, props.point1].map(
          v => new THREE.Vector3(...v)
        )}
        onUpdate={self => (self.verticesNeedUpdate = true)}
      />
      <lineBasicMaterial attach="material" color="black" />
    </line>
  );
};

function SpherePosition(props) {
  let coordinatesInSpace = [];
  coordinatesInSpace[0] = props.canvasAxes[0]
    ? props.position[props.canvasAxes[0]]
    : 0;
  coordinatesInSpace[1] = props.canvasAxes[1]
    ? props.position[props.canvasAxes[1]]
    : 0;
  coordinatesInSpace[2] = props.canvasAxes[2]
    ? props.position[props.canvasAxes[2]]
    : 0;
  return <Sphere position={coordinatesInSpace} color={props.color} />;
}
