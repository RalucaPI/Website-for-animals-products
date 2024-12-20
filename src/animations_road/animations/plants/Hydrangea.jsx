/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 scene.gltf --transform
Author: Yu (https://sketchfab.com/FFT_kedar)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/hydrangea-macrophylla-ajisai-2a3ca140b058409992ac72b30564cbcf
Title: Hydrangea macrophylla (Ajisai)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Hydrangea(props) {
  const { nodes, materials } = useGLTF('../animations/plants/hydrangea/scene-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0.11, -17.42, 13.35]} rotation={[-3.13, 0.01, -0.01]} scale={1}>
        <mesh geometry={nodes.Object_2.geometry} material={materials.ajisai_350k_Material_u1_v1} />
        <mesh geometry={nodes.Object_3.geometry} material={materials.ajisai_350k_Material_u1_v1} />
        <mesh geometry={nodes.Object_4.geometry} material={materials.ajisai_350k_Material_u1_v1} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.ajisai_350k_Material_u1_v1} />
        <mesh geometry={nodes.Object_6.geometry} material={materials.ajisai_350k_Material_u1_v1} />
        <mesh geometry={nodes.Object_7.geometry} material={materials.ajisai_350k_Material_u1_v1} />
        <mesh geometry={nodes.Object_8.geometry} material={materials.ajisai_350k_Material_u1_v1} />
      </group>
    </group>
  )
}

useGLTF.preload('../animations/plants/hydrangea/scene-transformed.glb')
