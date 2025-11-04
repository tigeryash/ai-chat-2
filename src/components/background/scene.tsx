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
  { uTime: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
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
  return (
    <div className="absolute z-0 inset-3 rounded-2xl m-0 p-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
          height: "100%",
          borderRadius: "20px",
        }}
      >
        <OrbitControls />
        <color attach="background" args={["#000"]} />

        <ambientLight intensity={1.5} />
        <WaveMesh />
      </Canvas>
      <Leva collapsed />
    </div>
  );
};

export default Scene;
