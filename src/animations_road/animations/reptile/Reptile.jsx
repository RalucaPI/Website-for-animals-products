import React from "react";
import { Grass } from "../plants/Grass";
import { Snake } from "./Snake";
import { Text } from "@react-three/drei";
export const Reptile = ({ sceneOpacity, ...props }) => {
  const handleClick = () => {
    window.location.href = "/reptiles";
  };
  return (
    <>
      <group {...props}>
        <Text
          color="black"
          anchorX={"left"}
          anchorY="top"
          fontSize={1}
          maxWidth={2.5}
          position={[0, 2, -8]}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
          onClick={handleClick}
        >
          Reptile
        </Text>
        <Grass scale={0.1} position={[0.5, -0.5, 1]} />
        <Snake scale={0.02} position={[0.5, -0.45, 0.4]} />
      </group>
    </>
  );
};
