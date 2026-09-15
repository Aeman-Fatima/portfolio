"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TARGET_HEIGHT = 2.6;
const BASE_POSITION: [number, number, number] = [0, -0.1, 0];

const PALETTE = {
  light: { base: "#6366f1", emissive: "#5457e5" },
  dark: { base: "#8b8ef5", emissive: "#7c7fff" },
};

export function AiBrain({ theme }: { theme: "light" | "dark" }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/brain.glb");
  const palette = PALETTE[theme];

  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: palette.base,
          emissive: palette.emissive,
          emissiveIntensity: 0.5,
          flatShading: true,
          roughness: 0.35,
          metalness: 0.15,
        });
      }
    });
  }, [cloned, palette]);

  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = TARGET_HEIGHT / (size.y || 1);
    return { scale: s, offset: center.multiplyScalar(-s) };
  }, [cloned]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.3;
    group.current.position.y = BASE_POSITION[1] + Math.sin(t * 0.9) * 0.1;
  });

  return (
    <group ref={group} position={BASE_POSITION}>
      <primitive object={cloned} scale={scale} position={[offset.x, offset.y, offset.z]} />
      <pointLight color={palette.emissive} intensity={1.6} distance={4} />
    </group>
  );
}

useGLTF.preload("/models/brain.glb");
