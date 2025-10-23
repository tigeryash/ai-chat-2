"use client";

import { Canvas, extend, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { Leva } from "leva";
import * as THREE from "three";
import { useRef } from "react";
import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";

type Uniforms = {
  uTime: number;
  color: THREE.Color;
};

const WaveMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
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
    <mesh ref={ref} rotation-x={-1}>
      <planeGeometry args={[10, 10, 180, 180]} />
      <waveMaterial color={new THREE.Color("blue")} ref={ref} uTime={0} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <div className="absolute w-full h-full z-0 inset-0">
      <Canvas camera={{ position: [0, 0, 1], fov: 45 }}>
        <OrbitControls />
        <color attach="background" args={["#000"]} />

        <ambientLight intensity={1.3} />
        <WaveMesh />
      </Canvas>
      <Leva collapsed />
    </div>
  );
};

export default Scene;
