"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TARGET_SIZE = 4.2;

export function RobotHand() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/robot-hand.glb");

  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#c7cbe0",
          emissive: "#7c7fff",
          emissiveIntensity: 0.15,
          roughness: 0.3,
          metalness: 0.6,
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
    const s = TARGET_SIZE / Math.max(size.x, size.y, size.z || 1);
    return { scale: s, offset: center.multiplyScalar(-s) };
  }, [cloned]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = -1.7 + Math.sin(t * 0.7) * 0.05;
  });

  return (
    <group ref={group} rotation={[0.1, 0.35, 0]} position={[-0.4, -1.7, 0]}>
      <primitive object={cloned} scale={scale} position={[offset.x, offset.y, offset.z]} />
    </group>
  );
}

useGLTF.preload("/models/robot-hand.glb");
