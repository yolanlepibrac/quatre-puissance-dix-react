import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "react-three-fiber";

export default function Sphere(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  function setHoverFunction(index, bool) {
    setHover(bool);
    //props.setHover(index, bool);
  }

  // Rotate mesh every frame, this is outside of React without overhead
  //useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.25, 1.25, 1.25] : [1.2, 1.2, 1.2]}
      position={[props.position[0], props.position[2], props.position[1]]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHoverFunction(props.index, true)}
      onPointerOut={e => setHoverFunction(props.index, false)}
    >
      <sphereGeometry attach="geometry" args={[0.4, 16, 16]} />
      <meshStandardMaterial attach="material" color={hovered ? props.hoveredColor : props.color} opacity={1} />
    </mesh>
  );
}
