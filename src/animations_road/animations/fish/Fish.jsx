import { Betta1 } from "./fish_animations/Betta1";
import { Betta2 } from "./fish_animations/Betta2";
import { Goldfish } from "./fish_animations/Goldfish";
import { Guppy } from "./fish_animations/Guppy";
import { Killifish } from "./fish_animations/Killifish";
import { Plankton } from "./fish_animations/Plankton";
import { Seahorse } from "./fish_animations/Seahorse";
import { Tuna } from "./fish_animations/Tuna";
import { Text } from "@react-three/drei";
export const Fish = ({ ...props }) => {
  const handleClick = () => {
    window.location.href = "/fishes";
  };
  return (
    <>
      <group {...props} scale={0.5}>
        <Text
          color="black"
          anchorX={"left"}
          anchorY="top"
          fontSize={2}
          maxWidth={2.5}
          position={[-1, 4, -12]}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
          onClick={handleClick}
        >
          Fish
        </Text>
        <Betta1 scale={0.1} />
        <Betta2 scale={0.3} position={[0, 2, -2]} />
        <Goldfish scale={0.05} position={[-4, 2, 4]} />
        <Guppy scale={0.1} position={[0, 4, 0]} />
        <Killifish scale={0.3} position={[0, 3, 0]} />
        <Plankton scale={0.05} position={[0, 20, 0]} />
        <Seahorse scale={0.3} position={[0, -1, 0]} />
        <Tuna scale={0.3} position={[0, 4, 0]} />
      </group>
    </>
  );
};
