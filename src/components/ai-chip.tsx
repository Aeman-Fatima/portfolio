"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TARGET_HEIGHT = 2.4;
const BASE_POSITION: [number, number, number] = [0, -0.1, 0];

const PALETTE = {
  board: "#7c7fff",
  die: "#d5d8de",
  pins: "#34d399",
};

export function AiChip() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/chip.glb");

  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const original = Array.isArray(child.material) ? child.material[0] : child.material;
      const name = original?.name ?? "";

      if (name === "Green") {
        child.material = new THREE.MeshStandardMaterial({
          color: PALETTE.board,
          emissive: PALETTE.board,
          emissiveIntensity: 0.25,
          roughness: 0.4,
          metalness: 0.2,
        });
      } else if (name === "conduct") {
        child.material = new THREE.MeshStandardMaterial({
          color: PALETTE.pins,
          emissive: PALETTE.pins,
          emissiveIntensity: 0.6,
          roughness: 0.3,
          metalness: 0.6,
        });
      } else {
        child.material = new THREE.MeshStandardMaterial({
          color: PALETTE.die,
          roughness: 0.25,
          metalness: 0.5,
        });
      }
    });
  }, [cloned]);

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
      <pointLight color={PALETTE.pins} intensity={1.4} distance={4} />
    </group>
  );
}

useGLTF.preload("/models/chip.glb");
