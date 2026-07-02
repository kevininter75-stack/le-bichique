"use client";

import { Canvas } from "@react-three/fiber";
import Ocean from "./Ocean";
import Boat from "./Boat";
import MahiMahi from "./MahiMahi";
import CameraRig from "./CameraRig";
import type { PerfTier } from "@/lib/usePerfTier";

type Props = {
  tier: PerfTier;
  onReady?: () => void;
};

/**
 * Scène 3D du hero : océan en shader, bateau amarré, mahi-mahi bondissant.
 * Le ciel est un dégradé CSS derrière le canvas (alpha) — gratuit en perf.
 */
export default function Experience({ tier, onReady }: Props) {
  return (
    <Canvas
      flat
      camera={{ position: [0, 2.2, 6.5], fov: 42 }}
      dpr={tier === "high" ? [1, 2] : [1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      {/* Lumière chaude de fin de journée */}
      <ambientLight intensity={0.75} color="#ffe9c4" />
      <directionalLight position={[-6, 5, -12]} intensity={2.2} color="#ffd98a" />
      <directionalLight position={[4, 6, 8]} intensity={0.5} color="#cdeef2" />

      <Ocean tier={tier} />
      <Boat position={[2.4, 0.05, -7]} />
      <MahiMahi />
      <CameraRig parallax={tier === "high"} />
    </Canvas>
  );
}
