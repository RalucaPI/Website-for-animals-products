/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.gltf --transform
Author: somitsu (https://sketchfab.com/somitsu)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/tosakin-goldfish-b2f0681c1e2145bcb0289f03ed75ea37
Title: Tosakin goldfish
*/

import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Goldfish(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "../animations/fish/goldfish/scene-transformed.glb"
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Scene.play();
  }, []);

  const speed = 0.25;
  useFrame(({ clock }) => {
    const time = clock.elapsedTime * speed;
    const x = -Math.sin(time) * 8; // replace with desired movement equation
    const y = -3;
    const z = Math.cos(time) * 7; // replace with desired movement equation
    group.current.position.set(x, y, z);
    group.current.rotation.y = time; // replace with desired rotation equation
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="724c0536378742e888f3d6d7ab2b8ecafbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="RIG_Tosakin"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_12">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_15"
                      geometry={nodes.Object_15.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_15.skeleton}
                    />
                    <skinnedMesh
                      name="Object_17"
                      geometry={nodes.Object_17.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_17.skeleton}
                    />
                    <skinnedMesh
                      name="Object_19"
                      geometry={nodes.Object_19.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_19.skeleton}
                    />
                    <skinnedMesh
                      name="Object_21"
                      geometry={nodes.Object_21.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_21.skeleton}
                    />
                    <skinnedMesh
                      name="Object_23"
                      geometry={nodes.Object_23.geometry}
                      material={materials.M_TosakinFins}
                      skeleton={nodes.Object_23.skeleton}
                    />
                    <skinnedMesh
                      name="Object_25"
                      geometry={nodes.Object_25.geometry}
                      material={materials.M_TosakinBody}
                      skeleton={nodes.Object_25.skeleton}
                    />
                    <skinnedMesh
                      name="Object_27"
                      geometry={nodes.Object_27.geometry}
                      material={materials.M_Sclara}
                      skeleton={nodes.Object_27.skeleton}
                    />
                    <skinnedMesh
                      name="Object_28"
                      geometry={nodes.Object_28.geometry}
                      material={materials.M_Iris}
                      skeleton={nodes.Object_28.skeleton}
                    />
                    <skinnedMesh
                      name="Object_29"
                      geometry={nodes.Object_29.geometry}
                      material={materials.M_Lens}
                      skeleton={nodes.Object_29.skeleton}
                    />
                    <skinnedMesh
                      name="Object_30"
                      geometry={nodes.Object_30.geometry}
                      material={materials.M_Cornea}
                      skeleton={nodes.Object_30.skeleton}
                    />
                    <skinnedMesh
                      name="Object_95"
                      geometry={nodes.Object_95.geometry}
                      material={materials.M_Sclara}
                      skeleton={nodes.Object_95.skeleton}
                    />
                    <skinnedMesh
                      name="Object_96"
                      geometry={nodes.Object_96.geometry}
                      material={materials.M_Iris}
                      skeleton={nodes.Object_96.skeleton}
                    />
                    <skinnedMesh
                      name="Object_97"
                      geometry={nodes.Object_97.geometry}
                      material={materials.M_Lens}
                      skeleton={nodes.Object_97.skeleton}
                    />
                    <skinnedMesh
                      name="Object_98"
                      geometry={nodes.Object_98.geometry}
                      material={materials.M_Cornea}
                      skeleton={nodes.Object_98.skeleton}
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

useGLTF.preload("../animations/fish/goldfish/scene-transformed.glb");
