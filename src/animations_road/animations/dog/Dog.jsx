import React from "react";
import { Grass } from "../plants/Grass";
import { Animation } from "./Animation";
import { Hydrangea } from "../plants/Hydrangea";
import { Lavender } from "../plants/Lavender";
import { Liliac } from "../plants/Liliac";
import { Text } from "@react-three/drei";
export const Dog = ({ ...props }) => {
  const handleClick = () => {
    window.location.href = "/dogs";
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
          position={[1.5, 2.0, -9]}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
          onClick={handleClick}
        >
          Dogs
        </Text>
        <Grass scale={0.15} position={[1, -0.5, 0.4]} />
        <Animation scale={0.5} position={[1, -0.4, 0]} />
        <Hydrangea scale={0.02} position={[0.6, -0.1, -0.5]} />
        <Hydrangea
          scale={0.02}
          position={[1.1, -0.1, -0.5]}
          rotation={[Math.PI / 0.1, 1, 0]}
        />
        <Liliac scale={0.03} position={[1.2, -0.2, 0]} />
        <Liliac
          scale={0.03}
          position={[1.2, -0.2, 0]}
          rotation={[Math.PI / 2, 2, 0]}
        />
        <Liliac
          scale={0.03}
          position={[1.2, -0.2, 0]}
          rotation={[Math.PI / 2, 3, 0]}
        />
        <Liliac scale={0.03} position={[0.4, -0.2, 0]} />
        <Lavender scale={0.005} position={[1, -0.3, -1]} />
        <Lavender scale={0.005} position={[1.3, -0.4, -1]} />
      </group>
    </>
  );
};
