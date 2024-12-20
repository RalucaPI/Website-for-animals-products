/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.gltf --transform
Author: Daria Danyliuk (https://sketchfab.com/DariaDanyliuk)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/butterflies-764b7378c21b47039b40eca9309eb3ab
Title: Butterflies
*/

import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Butterfly({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "../animations/butterfly/scene-transformed.glb"
  );
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions.Take001.play();
  }, []);
  const speed = 0.8;
  useFrame(({ clock }) => {
    const time = clock.elapsedTime * speed;
    const x = -Math.sin(time) * 7; // replace with desired movement equation
    const y = 3.5;
    const z = 4; // replace with desired movement equation
    group.current.position.set(x, y, z);
    group.current.rotation.y = time; // replace with desired rotation equation
    //group.current.opacity=sceneOpacity.current;
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="e0532d094a4b437680e8f0cc33c1891ffbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Body"
                  position={[0, -45.04, 0]}
                  rotation={[-0.53, 0, 0]}
                >
                  <mesh
                    name="0"
                    geometry={nodes["0"].geometry}
                    material={materials.BLy_Orange}
                    morphTargetDictionary={nodes["0"].morphTargetDictionary}
                    morphTargetInfluences={nodes["0"].morphTargetInfluences}
                  />
                </group>
                <group
                  name="Wings_Side1_Wings_Side1"
                  position={[0, -45.04, 0]}
                  rotation={[-0.53, 0, 0]}
                >
                  <mesh
                    name="1"
                    geometry={nodes["1"].geometry}
                    material={materials.BLy_Orange}
                    morphTargetDictionary={nodes["1"].morphTargetDictionary}
                    morphTargetInfluences={nodes["1"].morphTargetInfluences}
                  />
                </group>
                <group
                  name="Wings_Top1_Wings_Top1"
                  position={[0, -45.04, 0]}
                  rotation={[-0.53, 0, 0]}
                >
                  <mesh
                    name="2"
                    geometry={nodes["2"].geometry}
                    material={materials.BLy_Orange}
                    morphTargetDictionary={nodes["2"].morphTargetDictionary}
                    morphTargetInfluences={nodes["2"].morphTargetInfluences}
                  />
                </group>
                <group name="group1" position={[129.7, 43.26, 0]}>
                  <group
                    name="pasted__Body"
                    position={[0, 0, 47.62]}
                    rotation={[-0.35, 0, 0]}
                  >
                    <mesh
                      name="3"
                      geometry={nodes["3"].geometry}
                      material={materials.BFly_Blue}
                      morphTargetDictionary={nodes["3"].morphTargetDictionary}
                      morphTargetInfluences={nodes["3"].morphTargetInfluences}
                    />
                  </group>
                  <group
                    name="pasted__Wings_Side1_Wings_Side1"
                    position={[0, 0, 47.62]}
                    rotation={[-0.35, 0, 0]}
                  >
                    <mesh
                      name="4"
                      geometry={nodes["4"].geometry}
                      material={materials.BFly_Blue}
                      morphTargetDictionary={nodes["4"].morphTargetDictionary}
                      morphTargetInfluences={nodes["4"].morphTargetInfluences}
                    />
                  </group>
                  <group
                    name="pasted__Wings_Top1_Wings_Top1"
                    position={[0, 0, 47.62]}
                    rotation={[-0.35, 0, 0]}
                  >
                    <mesh
                      name="5"
                      geometry={nodes["5"].geometry}
                      material={materials.BFly_Blue}
                      morphTargetDictionary={nodes["5"].morphTargetDictionary}
                      morphTargetInfluences={nodes["5"].morphTargetInfluences}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("../animations/butterfly/scene-transformed.glb");
