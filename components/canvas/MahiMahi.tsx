"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PERIOD = 9; // secondes entre deux sauts
const LEAP = 1.5; // durée du saut

/** Silhouette de mahi-mahi qui bondit hors de l'eau périodiquement. */
export default function MahiMahi() {
  const group = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime + 2) % PERIOD;
    const g = group.current;
    if (t < LEAP) {
      const p = t / LEAP; // 0 → 1 pendant le saut
      g.visible = true;
      g.position.set(-6.5 + p * 5.0, Math.sin(p * Math.PI) * 1.7 - 0.25, -9.5);
      g.rotation.z = (0.5 - p) * 1.5; // cabre à la sortie, pique au retour
    } else {
      g.visible = false;
    }
  });

  return (
    <group ref={group} visible={false}>
      {/* Corps : front bombé caractéristique du mahi-mahi */}
      <mesh scale={[1.5, 0.52, 0.22]}>
        <sphereGeometry args={[0.5, 20, 14]} />
        <meshStandardMaterial color="#137a86" roughness={0.5} metalness={0.25} />
      </mesh>
      {/* Nageoire dorsale sur toute la longueur */}
      <mesh position={[-0.05, 0.3, 0]} scale={[1.15, 0.3, 0.05]}>
        <sphereGeometry args={[0.5, 12, 8]} />
        <meshStandardMaterial color="#0d5e6b" roughness={0.6} />
      </mesh>
      {/* Queue fourchue */}
      <mesh position={[-0.85, 0, 0]} rotation-z={Math.PI / 2}>
        <coneGeometry args={[0.32, 0.45, 3]} />
        <meshStandardMaterial color="#0d5e6b" roughness={0.6} />
      </mesh>
      {/* Ventre doré, comme le vrai */}
      <mesh position={[0.1, -0.12, 0]} scale={[1.1, 0.3, 0.2]}>
        <sphereGeometry args={[0.5, 16, 10]} />
        <meshStandardMaterial color="#f2b950" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
}
