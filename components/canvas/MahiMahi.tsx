"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PERIOD = 14; // secondes entre deux sauts
const LEAP = 1.6; // durée du saut

/**
 * Silhouette lointaine de mahi-mahi qui bondit près du bateau, à contre-jour.
 * Discret et rare : un signe de vie, pas une attraction.
 */
export default function MahiMahi() {
  const group = useRef<THREE.Group>(null!);

  const silhouette = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#07242f" }),
    []
  );

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime + 4) % PERIOD;
    const g = group.current;
    if (t < LEAP) {
      const p = t / LEAP; // 0 → 1 pendant le saut
      g.visible = true;
      g.position.set(2.2 + p * 3.0, Math.sin(p * Math.PI) * 1.1 - 0.2, -30);
      g.rotation.z = (0.5 - p) * 1.4; // cabre à la sortie, pique au retour
    } else {
      g.visible = false;
    }
  });

  return (
    <group ref={group} visible={false} scale={0.85}>
      {/* Corps : front bombé caractéristique du mahi-mahi */}
      <mesh scale={[1.5, 0.52, 0.22]} material={silhouette}>
        <sphereGeometry args={[0.5, 16, 12]} />
      </mesh>
      {/* Nageoire dorsale sur toute la longueur */}
      <mesh position={[-0.05, 0.3, 0]} scale={[1.15, 0.3, 0.05]} material={silhouette}>
        <sphereGeometry args={[0.5, 10, 6]} />
      </mesh>
      {/* Queue fourchue */}
      <mesh position={[-0.85, 0, 0]} rotation-z={Math.PI / 2} material={silhouette}>
        <coneGeometry args={[0.32, 0.45, 3]} />
      </mesh>
    </group>
  );
}
