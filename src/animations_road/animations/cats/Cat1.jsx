/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.gltf --transform
Author: Evil_Katz (https://sketchfab.com/Evil_Katz)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/an-animated-cat-aec25699660043a29595f9572149d1e8
Title: An Animated Cat
*/

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Cat1(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "../animations/cats/cat1/scene-transformed.glb"
  );
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions.Take001.play();
  }, []);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, -1]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="RootNode_(gltf_orientation_matrix)_0"
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <group name="RootNode_(model_correction_matrix)_1">
                  <group name="catfbx_2" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="_3">
                      <group name="RootNode_4">
                        <group name="_5">
                          <group name="GLTF_created_0">
                            <primitive
                              object={nodes.GLTF_created_0_rootJoint}
                            />
                            <skinnedMesh
                              name="Object_12"
                              geometry={nodes.Object_12.geometry}
                              material={materials.Material_81}
                              skeleton={nodes.Object_12.skeleton}
                            />
                            <skinnedMesh
                              name="Object_14"
                              geometry={nodes.Object_14.geometry}
                              material={materials.Material_81}
                              skeleton={nodes.Object_14.skeleton}
                            />
                            <skinnedMesh
                              name="Object_16"
                              geometry={nodes.Object_16.geometry}
                              material={materials.Material_93}
                              skeleton={nodes.Object_16.skeleton}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
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

useGLTF.preload("../animations/cats/cat1/scene-transformed.glb");
