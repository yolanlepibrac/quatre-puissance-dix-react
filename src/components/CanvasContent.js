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
          [0, indexDim1, indexDim2],
          [gameHelper.sizeMap(props.game.dimension), indexDim1, indexDim2]
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
          [indexDim1, 0, indexDim2],
          [indexDim1, gameHelper.sizeMap(props.game.dimension), indexDim2]
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
          [indexDim1, indexDim2, 0],
          [indexDim1, indexDim2, gameHelper.sizeMap(props.game.dimension)]
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
      <GridPlane
        size={gameHelper.sizeMap(props.game.dimension)}
        dimension={props.game.dimension}
      />
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

const GridPlane = props => {
  let tab = [];
  for (let index = 0; index <= gameHelper.sizeMap(props.dimension); index++) {
    tab.push({
      rotation: [0, 0, 1],
      deplacement: [props.size / 2, props.size / 2, index]
    });
  }
  for (let index = 0; index <= gameHelper.sizeMap(props.dimension); index++) {
    tab.push({
      rotation: [0, 1, 0],
      deplacement: [index, props.size / 2, props.size / 2]
    });
  }
  for (let index = 0; index <= gameHelper.sizeMap(props.dimension); index++) {
    tab.push({
      rotation: [1, 0, 0],
      deplacement: [props.size / 2, index, props.size / 2]
    });
  }
  return tab.map(plane => {
    return (
      <Plane
        rotation={plane.rotation}
        deplacement={plane.deplacement}
        size={props.size}
      />
    );
  });
};

const Plane = props => {
  return (
    <mesh
      position={[
        props.deplacement[0],
        props.deplacement[1],
        props.deplacement[2]
      ]}
      quaternion={new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(
          props.rotation[0],
          props.rotation[1],
          props.rotation[2]
        ),
        Math.PI / 2
      )}
    >
      <planeBufferGeometry
        attach="geometry"
        args={[props.size, props.size, 32, 32]}
      />
      <meshStandardMaterial
        attach="material"
        transparent={true}
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
