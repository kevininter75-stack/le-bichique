"use client";

import { useFrame } from "@react-three/fiber";

/** Parallax caméra à la souris (désactivé sur mobile / reduced-motion). */
export default function CameraRig({ parallax }: { parallax: boolean }) {
  useFrame(({ camera, pointer }, delta) => {
    const targetX = parallax ? pointer.x * 0.55 : 0;
    const targetY = 2.2 + (parallax ? pointer.y * 0.28 : 0);
    const ease = Math.min(delta * 2.5, 1);
    camera.position.x += (targetX - camera.position.x) * ease;
    camera.position.y += (targetY - camera.position.y) * ease;
    camera.lookAt(0, 0.9, -8);
  });
  return null;
}
