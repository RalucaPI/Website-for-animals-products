import React from "react";
import { Bird2 } from "./Bird2";
import { Bird3 } from "./Bird3";
import { Bird1 } from "./Bird1";
import { Text } from "@react-three/drei";
export const Birds = ({ sceneOpacity, ...props }) => {
  const handleClick = () => {
    window.location.href = "/birds";
  };
  return (
    <>
      <group {...props}>
        <Text
          color="black"
          anchorX={"left"}
          anchorY="top"
          fontSize={0.52}
          maxWidth={2.5}
          position={[2.0, 0, -5]}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
          onClick={handleClick}
        >
          Birds
        </Text>
        <Bird2 scale={0.01} position={[2.0, -0.45, -5]} />
        <Bird3 scale={0.007} position={[3.05, -0.2, -5]} />
        <Bird1 scale={0.1} position={[2.39, -0.18, -5]} />
      </group>
    </>
  );
};
