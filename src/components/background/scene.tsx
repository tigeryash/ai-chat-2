"use client";

import { Canvas, extend, useFrame } from "@react-three/fiber";
import {  PerspectiveCamera, shaderMaterial } from "@react-three/drei";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import { useRef } from "react";
import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";

type Uniforms = {
  uTime: number;
  color: THREE.Color;
};

const WaveMaterial = shaderMaterial(
    {uTime: 0,
      uColors: [
      new THREE.Color('#0f172a'), // Dark Slate
      new THREE.Color('#3b82f6'), // Blue
      new THREE.Color('#8b5cf6'), // Violet
      new THREE.Color('#06b6d4'), // Cyan
      new THREE.Color('#ec4899'), // Pink
    ]
  },
  vertexShader,
  fragmentShader
);

extend({ WaveMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    waveMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial & Uniforms>;
      uTime?: number;
      color?: THREE.Color;
    };
  }
}

const WaveMesh = () => {
  const ref = useRef<THREE.ShaderMaterial & Uniforms>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-0.86, 0, 0]} position={[0, 0, -2]}>
      <planeGeometry args={[10, 10, 180, 180]} />
      <waveMaterial color={new THREE.Color("blue")} ref={ref} uTime={0} />
    </mesh>
  );
};

const Scene = () => {
  const {cameraPosition, rotation} = useControls({
    cameraPosition: {
      value: [0, -.4 , .2],
      min: -10,
      max: 10,
      step: 0.1,
    },
    rotation: {
      value: [0.09, 0, 0],
      step: 0.01,
    },
  })
  return (
    <div className="absolute z-0 inset-3 rounded-2xl m-0 p-0">
      <Canvas
        // camera={{ position: [0, 0, cameraPosition], fov: 45 }}
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          borderRadius: "20px",
        }}
      >
        <PerspectiveCamera makeDefault position={ cameraPosition} rotation={rotation} />

        <color attach="background" args={["#000"]} />

        <ambientLight intensity={1} />
        <WaveMesh />
      </Canvas>
    </div>
  );
};

export default Scene;
