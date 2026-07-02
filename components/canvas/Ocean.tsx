"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { oceanFragment, oceanVertex } from "@/shaders/ocean";
import type { PerfTier } from "@/lib/usePerfTier";

export default function Ocean({ tier }: { tier: PerfTier }) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uWaveAmp: { value: 0.35 },
      uDeep: { value: new THREE.Color("#0a4d68") },
      uShallow: { value: new THREE.Color("#2ec4b6") },
      uSky: { value: new THREE.Color("#cdeef2") },
      uHorizon: { value: new THREE.Color("#f2b950") },
      uSunColor: { value: new THREE.Color("#ffd98a") },
      uSunDir: { value: new THREE.Vector3(-0.35, 0.3, -0.88).normalize() },
    }),
    []
  );

  const seg = tier === "high" ? 150 : 70;

  useFrame((_, delta) => {
    matRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -28]}>
      <planeGeometry args={[170, 95, seg, Math.round(seg * 0.6)]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={oceanVertex}
        fragmentShader={oceanFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}
