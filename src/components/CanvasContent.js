import React from "react";
import * as THREE from "three/src/Three";
import { extend, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Sphere from "./Sphere";
import gameHelper from "./gameHelper";
import Constantes from "./Constantes";

extend({ OrbitControls });

export default function CanvasContent(props) {
  const {
    camera,
    gl: { domElement }
  } = useThree();
  return (
    <>
      <pointLight position={[10, 10, 10]} />
      <ambientLight />
      {props.game.vectors1 &&
        props.game.vectors1.map((vector, key) => {
          return (
            <SpherePosition
              key={key}
              index={key}
              position={vector}
              canvasAxes={props.canvasAxes}
              color={Constantes.colorPlayer1}
              hoveredColor={"rgba(255, 105, 180,1)"}
              offset={0.01}
              setHover={(key, bool) => props.setHover(key, 0, bool)}
            />
          );
        })}
      {props.game.vectors2 &&
        props.game.vectors2.map((vector, key) => {
          return (
            <SpherePosition
              key={key}
              index={key}
              position={vector}
              canvasAxes={props.canvasAxes}
              color={Constantes.colorPlayer2}
              hoveredColor={"rgba(255, 174, 0,1)"}
              offset={-0.01}
              setHover={(key, bool) => props.setHover(key, 1, bool)}
            />
          );
        })}
      <GridLine game={props.game} canvasAxes={props.canvasAxes} />
      <GridPlane
        canvasAxes={props.canvasAxes}
        size={gameHelper.sizeMap(props.game.dimension)}
        dimension={props.game.dimension}
      />
      {props.canvasAxes.length > 0 && (
        <Line
          point0={[0, 0, 0]}
          point1={[gameHelper.sizeMap(props.game.dimension), 0, 0]}
          color={Constantes.colorAxe1.color1}
        ></Line>
      )}
      {props.canvasAxes.length > 1 && (
        <Line
          point0={[0, 0, 0]}
          point1={[0, gameHelper.sizeMap(props.game.dimension), 0]}
          color={Constantes.colorAxe2.color1}
        ></Line>
      )}
      {props.canvasAxes.length > 2 && (
        <Line
          point0={[0, 0, 0]}
          point1={[0, 0, gameHelper.sizeMap(props.game.dimension)]}
          color={Constantes.colorAxe3.color1}
        ></Line>
      )}
      <orbitControls args={[camera, domElement]} />
    </>
  );
}

function GridLine(props) {
  let tab = [];
  if (props.canvasAxes.length === 3) {
    for (let indexDim1 = 0; indexDim1 <= gameHelper.sizeMap(props.game.dimension); indexDim1++) {
      for (let indexDim2 = 0; indexDim2 <= gameHelper.sizeMap(props.game.dimension); indexDim2++) {
        tab.push([
          [0, indexDim1, indexDim2],
          [gameHelper.sizeMap(props.game.dimension), indexDim1, indexDim2]
        ]);
      }
    }
    for (let indexDim1 = 0; indexDim1 <= gameHelper.sizeMap(props.game.dimension); indexDim1++) {
      for (let indexDim2 = 0; indexDim2 <= gameHelper.sizeMap(props.game.dimension); indexDim2++) {
        tab.push([
          [indexDim1, 0, indexDim2],
          [indexDim1, gameHelper.sizeMap(props.game.dimension), indexDim2]
        ]);
      }
    }
    for (let indexDim1 = 0; indexDim1 <= gameHelper.sizeMap(props.game.dimension); indexDim1++) {
      for (let indexDim2 = 0; indexDim2 <= gameHelper.sizeMap(props.game.dimension); indexDim2++) {
        tab.push([
          [indexDim1, indexDim2, 0],
          [indexDim1, indexDim2, gameHelper.sizeMap(props.game.dimension)]
        ]);
      }
    }
  }
  if (props.canvasAxes.length === 2) {
    for (let indexDim1 = 0; indexDim1 <= gameHelper.sizeMap(props.game.dimension); indexDim1++) {
      for (let indexDim2 = 0; indexDim2 <= 1; indexDim2++) {
        tab.push([
          [0, indexDim1, indexDim2],
          [gameHelper.sizeMap(props.game.dimension), indexDim1, indexDim2]
        ]);
      }
    }
    for (let indexDim1 = 0; indexDim1 <= gameHelper.sizeMap(props.game.dimension); indexDim1++) {
      for (let indexDim2 = 0; indexDim2 <= 1; indexDim2++) {
        tab.push([
          [indexDim1, 0, indexDim2],
          [indexDim1, gameHelper.sizeMap(props.game.dimension), indexDim2]
        ]);
      }
    }
    for (let indexDim1 = 0; indexDim1 <= gameHelper.sizeMap(props.game.dimension); indexDim1++) {
      for (let indexDim2 = 0; indexDim2 <= gameHelper.sizeMap(props.game.dimension); indexDim2++) {
        tab.push([
          [indexDim1, indexDim2, 0],
          [indexDim1, indexDim2, 1]
        ]);
      }
    }
  }
  if (props.canvasAxes.length === 1) {
    for (let indexDim1 = 0; indexDim1 <= 1; indexDim1++) {
      for (let indexDim2 = 0; indexDim2 <= 1; indexDim2++) {
        tab.push([
          [0, indexDim1, indexDim2],
          [gameHelper.sizeMap(props.game.dimension), indexDim1, indexDim2]
        ]);
      }
    }
    for (let indexDim1 = 0; indexDim1 <= gameHelper.sizeMap(props.game.dimension); indexDim1++) {
      for (let indexDim2 = 0; indexDim2 <= 1; indexDim2++) {
        tab.push([
          [indexDim1, 0, indexDim2],
          [indexDim1, 1, indexDim2]
        ]);
      }
    }
    for (let indexDim1 = 0; indexDim1 <= gameHelper.sizeMap(props.game.dimension); indexDim1++) {
      for (let indexDim2 = 0; indexDim2 <= 1; indexDim2++) {
        tab.push([
          [indexDim1, indexDim2, 0],
          [indexDim1, indexDim2, 1]
        ]);
      }
    }
  }

  return tab.map((vect2, key) => {
    return <Line key={key} point0={vect2[0]} point1={vect2[1]} color={"black"}></Line>;
  });
}

const Line = props => {
  return (
    <line>
      <geometry
        attach="geometry"
        vertices={[props.point0, props.point1].map(v => new THREE.Vector3(...v))}
        onUpdate={self => (self.verticesNeedUpdate = true)}
      />
      <lineBasicMaterial attach="material" color={props.color} side={THREE.DoubleSide} />
    </line>
  );
};

function SpherePosition(props) {
  let sortedCoordinated = props.canvasAxes.sort();
  let coordinatesInSpace = [];
  let value0 = sortedCoordinated[0] >= 0 ? props.position[sortedCoordinated[0]] : 0;
  coordinatesInSpace[0] = value0 + 0.5 + props.offset;
  let value1 = sortedCoordinated[1] >= 0 ? props.position[sortedCoordinated[1]] : 0;
  coordinatesInSpace[1] = value1 + 0.5 + props.offset;
  let value2 = sortedCoordinated[2] >= 0 ? props.position[sortedCoordinated[2]] : 0;
  coordinatesInSpace[2] = value2 + 0.5 + props.offset;
  return (
    <Sphere
      position={coordinatesInSpace}
      color={props.color}
      hoveredColor={props.hoveredColor}
      index={props.index}
      setHover={(key, bool) => props.setHover(key, bool)}
    />
  );
}

const GridPlane = props => {
  let tab = [];
  if (props.canvasAxes.length === 3) {
    for (let index = 0; index <= gameHelper.sizeMap(props.dimension); index++) {
      tab.push({
        rotation: [0, 0, 1],
        deplacement: [props.size / 2, props.size / 2, index],
        size: [props.size, props.size]
      });
    }
    for (let index = 0; index <= gameHelper.sizeMap(props.dimension); index++) {
      tab.push({
        rotation: [0, 1, 0],
        deplacement: [index, props.size / 2, props.size / 2],
        size: [props.size, props.size]
      });
    }
    for (let index = 0; index <= gameHelper.sizeMap(props.dimension); index++) {
      tab.push({
        rotation: [1, 0, 0],
        deplacement: [props.size / 2, index, props.size / 2],
        size: [props.size, props.size]
      });
    }
  }

  if (props.canvasAxes.length === 2) {
    for (let index = 0; index <= 1; index++) {
      tab.push({
        rotation: [0, 0, 1],
        deplacement: [props.size / 2, props.size / 2, index],
        size: [props.size, props.size]
      });
    }
    for (let index = 0; index <= gameHelper.sizeMap(props.dimension); index++) {
      tab.push({
        rotation: [0, 1, 0],
        deplacement: [index, props.size / 2, 1 / 2],
        size: [1, props.size]
      });
    }
    for (let index = 0; index <= gameHelper.sizeMap(props.dimension); index++) {
      tab.push({
        rotation: [1, 0, 0],
        deplacement: [props.size / 2, index, 1 / 2],
        size: [props.size, 1]
      });
    }
  }

  if (props.canvasAxes.length === 1) {
    for (let index = 0; index <= 1; index++) {
      tab.push({
        rotation: [0, 0, 1],
        deplacement: [props.size / 2, 1 / 2, index],
        size: [1, props.size]
      });
    }
    for (let index = 0; index <= gameHelper.sizeMap(props.dimension); index++) {
      tab.push({
        rotation: [0, 1, 0],
        deplacement: [index, 1 / 2, 1 / 2],
        size: [1, 1]
      });
    }
    for (let index = 0; index <= 1; index++) {
      tab.push({
        rotation: [1, 0, 0],
        deplacement: [props.size / 2, index, 1 / 2],
        size: [props.size, 1]
      });
    }
  }

  return tab.map((plane, key) => {
    return <Plane key={key} rotation={plane.rotation} deplacement={plane.deplacement} size={plane.size} />;
  });
};

const Plane = props => {
  return (
    <mesh
      position={[props.deplacement[0], props.deplacement[1], props.deplacement[2]]}
      quaternion={new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(props.rotation[0], props.rotation[1], props.rotation[2]),
        Math.PI / 2
      )}
    >
      <planeBufferGeometry attach="geometry" args={[props.size[0], props.size[1], 32, 32]} />
      <meshStandardMaterial attach="material" transparent={true} opacity={0.2} side={THREE.DoubleSide} />
    </mesh>
  );
};
