/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.gltf --transform
Author: Miguelangelo Rosario (https://sketchfab.com/miguelangelo2k)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/catch-the-parrot-0d4d500333f14dd88f04d934f9ff48ec
Title: Catch the Parrot
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Bird2(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "../animations/birds/bird2/scene-transformed.glb"
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Land.play();
    // console.log(actions)
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="e96a92d311a043e68c6154db39fa6401fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.material_2}
                    skeleton={nodes.Object_7.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("../animations/birds/bird2/scene-transformed.glb");
