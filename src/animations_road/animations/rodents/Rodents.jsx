import React from "react";
import { Chinchilla } from "./Chinchilla";
import { Hamster } from "./Hamster";
import { Squirrel } from "./Squirrel";
import { Tree } from "../plants/Tree";
import { Text } from "@react-three/drei";
export const Rodents = ({ ...props }) => {
  const handleClick = () => {
    window.location.href = "/rodents";
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
          position={[-1, 2.0, -9]}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
          onClick={handleClick}
        >
          Rodents
        </Text>
        <Chinchilla scale={0.5} position={[0.8, -1.17, 0]} />
        <Hamster scale={0.05} position={[0.9, -1.55, 0.7]} />
        <Squirrel scale={0.6} position={[0.55, -1.5, -0.2]} />
        <Tree scale={0.09} position={[1, -2, 0]} />
      </group>
    </>
  );
};
