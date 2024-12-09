import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { StartPage } from "../components/StartPage";
import { usePlay } from "../context/Play";
import { Experience } from "../components/Experience";
export function Road() {
  const { play } = usePlay();
  return (
    <>
      <Canvas>
        <color attach="background" args={["#ccffff"]} />
        <ScrollControls
          pages={play ? 10 : 0}
          damping={0.5}
          style={{
            top: "7px",
            left: "0px",
            bottom: "7px",
            right: "7px",
            width: "auto",
            height: "auto",
            animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
            opacity: 0,
          }}
        >
          <Experience />
        </ScrollControls>
      </Canvas>
      <StartPage />
    </>
  );
}
