"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Le Ti Mahi Mahi — bateau de pêche artisanal stylisé, construit en primitives.
 * Pour brancher un vrai modèle plus tard : remplacer ce composant par un
 * <primitive object={useGLTF("/models/bateau.glb").scene} /> (voir README).
 */
export default function Boat(props: { position?: [number, number, number] }) {
  const group = useRef<THREE.Group>(null!);
  const baseY = props.position?.[1] ?? 0;

  // Coque : box effilée à la proue, fond resserré, étrave relevée
  const hullGeom = useMemo(() => {
    const g = new THREE.BoxGeometry(2.4, 0.7, 1.0, 8, 2, 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const t = (x + 1.2) / 2.4; // 0 = poupe, 1 = proue
      let w = 1.0;
      if (t > 0.62) w *= 1.0 - ((t - 0.62) / 0.38) * 0.82; // proue effilée
      if (y < 0) w *= 0.6; // fond resserré
      pos.setZ(i, z * w);
      if (y < 0 && t > 0.62) pos.setY(i, y * (1.0 - (t - 0.62) * 1.1)); // étrave relevée
    }
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame(({ clock }) => {
    // Tangage et roulis doux, amarré face au restaurant
    const t = clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.6) * 0.045;
    group.current.rotation.x = Math.sin(t * 0.43 + 1.2) * 0.03;
    group.current.position.y = baseY + Math.sin(t * 0.7) * 0.09;
  });

  return (
    <group ref={group} {...props} rotation-y={-0.5}>
      {/* Coque corail, la couleur signature */}
      <mesh geometry={hullGeom} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#e8574a" roughness={0.75} />
      </mesh>
      {/* Liseré blanc du plat-bord */}
      <mesh position={[-0.18, 0.66, 0]}>
        <boxGeometry args={[2.0, 0.08, 0.96]} />
        <meshStandardMaterial color="#f2ede1" roughness={0.8} />
      </mesh>
      {/* Cabine */}
      <mesh position={[-0.55, 0.98, 0]}>
        <boxGeometry args={[0.72, 0.56, 0.66]} />
        <meshStandardMaterial color="#f2ede1" roughness={0.85} />
      </mesh>
      {/* Toit de cabine */}
      <mesh position={[-0.55, 1.3, 0]}>
        <boxGeometry args={[0.84, 0.08, 0.78]} />
        <meshStandardMaterial color="#0a4d68" roughness={0.7} />
      </mesh>
      {/* Mât */}
      <mesh position={[0.15, 1.35, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 1.5, 8]} />
        <meshStandardMaterial color="#8a5a3b" roughness={0.9} />
      </mesh>
      {/* Bôme de pêche inclinée */}
      <mesh position={[0.55, 1.7, 0]} rotation-z={-0.9}>
        <cylinderGeometry args={[0.02, 0.03, 1.1, 8]} />
        <meshStandardMaterial color="#8a5a3b" roughness={0.9} />
      </mesh>
      {/* Petit fanion doré en tête de mât */}
      <mesh position={[0.28, 2.05, 0]}>
        <coneGeometry args={[0.09, 0.26, 4]} />
        <meshStandardMaterial color="#f2b950" roughness={0.6} />
      </mesh>
    </group>
  );
}
