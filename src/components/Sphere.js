import ReactDOM from "react-dom";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";

export default function Sphere(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      position={props.position}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <sphereGeometry attach="geometry" args={[0.4, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : props.color}
        opacity={1}
      />
    </mesh>
  );
}
