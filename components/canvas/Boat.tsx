"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Le Ti Mahi Mahi — silhouette du bateau de pêche à contre-jour sur l'horizon.
 * Traité en ombre chinoise (matériau sombre non éclairé) : la suggestion fait
 * plus cinéma que le détail. Le vrai bateau est montré en photo dans Histoire.
 * Pour brancher un vrai modèle : remplacer par <primitive object={useGLTF(...)} />.
 */
export default function Boat(props: { position?: [number, number, number] }) {
  const group = useRef<THREE.Group>(null!);
  const baseY = props.position?.[1] ?? 0;

  // Matériau silhouette partagé : sombre, insensible à la lumière
  const silhouette = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#07242f" }),
    []
  );

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
    // Tangage lent, au mouillage face au soleil couchant
    const t = clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.45) * 0.035;
    group.current.position.y = baseY + Math.sin(t * 0.55) * 0.12;
  });

  return (
    <group ref={group} {...props} rotation-y={-0.35} scale={2.2}>
      <mesh geometry={hullGeom} position={[0, 0.3, 0]} material={silhouette} />
      {/* Cabine */}
      <mesh position={[-0.55, 0.9, 0]} material={silhouette}>
        <boxGeometry args={[0.72, 0.52, 0.66]} />
      </mesh>
      {/* Mât */}
      <mesh position={[0.15, 1.35, 0]} material={silhouette}>
        <cylinderGeometry args={[0.035, 0.05, 1.6, 6]} />
      </mesh>
      {/* Bôme de pêche inclinée, la signature visuelle du métier */}
      <mesh position={[0.62, 1.6, 0]} rotation-z={-0.85} material={silhouette}>
        <cylinderGeometry args={[0.02, 0.03, 1.4, 6]} />
      </mesh>
      {/* Ligne de pêche tendue vers l'eau */}
      <mesh position={[1.15, 0.95, 0]} rotation-z={0.12} material={silhouette}>
        <cylinderGeometry args={[0.006, 0.006, 1.6, 4]} />
      </mesh>
    </group>
  );
}
