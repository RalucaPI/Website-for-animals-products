import React from "react";
import { Cat1 } from "./Cat1";
import { Cat2 } from "./Cat2";
import { Butterfly } from "./Butterfly";
import { Text } from "@react-three/drei";
export const Cats = ({ ...props }) => {
  const handleClick = () => {
    window.location.href = "/cats";
  };
  return (
    <>
      <group {...props} position-y={[-19]} scale={0.5}>
        <Text
          color="black"
          anchorX={"left"}
          anchorY="top"
          fontSize={2}
          maxWidth={2.5}
          position={[1, 10.0, 1]}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
          onClick={handleClick}
        >
          Cats
        </Text>
        <Cat1 scale={0.09} position={[-2, 1, 2]} />
        <Cat2 scale={4} position={[2, 0.5, 0]} />
        <Butterfly scale={0.01} />
      </group>
    </>
  );
};
