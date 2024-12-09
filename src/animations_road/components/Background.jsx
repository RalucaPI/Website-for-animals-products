import { Environment, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Gradient, LayerMaterial } from "lamina";
import { useRef } from "react";
import * as THREE from "three";

export const Background = ({ backgroundColors }) => {
  const start = 0.1;
  const end = -0.2;

  const gradientRef = useRef(null);
  const gradientEnvRef = useRef(null);

  useFrame(() => {
    if (gradientRef.current && gradientEnvRef.current) {
      gradientRef.current.colorA = new THREE.Color(
        backgroundColors.current.colorA || "#ffffff"
      );
      gradientRef.current.colorB = new THREE.Color(
        backgroundColors.current.colorB || "#000000"
      );
      gradientEnvRef.current.colorA = new THREE.Color(
        backgroundColors.current.colorA || "#ffffff"
      );
      gradientEnvRef.current.colorB = new THREE.Color(
        backgroundColors.current.colorB || "#000000"
      );
    }
  });

  return (
    <>
      <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
        <LayerMaterial side={THREE.BackSide}>
          <Gradient
            ref={gradientRef}
            axes="y"
            start={start}
            end={end}
            colorA={new THREE.Color("#ffffff")}
            colorB={new THREE.Color("#000000")}
          />
        </LayerMaterial>
      </Sphere>
      <Environment resolution={256} frames={Infinity}>
        <Sphere
          scale={[100, 100, 100]}
          rotation-y={Math.PI / 2}
          rotation-x={Math.PI}
        >
          <LayerMaterial side={THREE.BackSide}>
            <Gradient
              ref={gradientEnvRef}
              axes="y"
              start={start}
              end={end}
              colorA={new THREE.Color("#ffffff")}
              colorB={new THREE.Color("#000000")}
            />
          </LayerMaterial>
        </Sphere>
      </Environment>
    </>
  );
};
