"use client";

import { useSyncExternalStore } from "react";

export type PerfTier = "high" | "low";

// L'appareil ne change pas en cours de session : pas d'abonnement nécessaire
const emptySubscribe = () => () => {};

function getSnapshot(): PerfTier {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const smallScreen = window.innerWidth < 768;
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory <= 4;
  const lowCpu = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  return coarsePointer || smallScreen || lowMemory || lowCpu ? "low" : "high";
}

/**
 * Détection grossière de la puissance de l'appareil pour dégrader la 3D proprement :
 * tier "low" → moins de subdivisions d'océan, DPR plafonné plus bas, pas de parallax souris.
 */
export function usePerfTier(): PerfTier {
  return useSyncExternalStore(emptySubscribe, getSnapshot, () => "high");
}
