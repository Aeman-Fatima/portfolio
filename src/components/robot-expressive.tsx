"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import * as THREE from "three";

const TARGET_HEIGHT = 3.6;
const BASE_POSITION: [number, number, number] = [0, 0.05, 0];

// A warm gradient in deliberate contrast to the site's cool purple/teal palette,
// so the robot pops as its own focal point instead of blending into the UI.
const PALETTE = {
  light: { top: "#f59e0b", bottom: "#ea580c" },
  dark: { top: "#fbbf24", bottom: "#f97316" },
};

export function RobotExpressive({ theme }: { theme: "light" | "dark" }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/robot-expressive.glb");
  const { actions } = useAnimations(animations, group);
  const palette = PALETTE[theme];

  const cloned = useMemo(() => {
    const c = cloneSkeleton(scene) as THREE.Object3D;
    c.updateMatrixWorld(true);
    return c;
  }, [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const minY = box.min.y;
    const span = box.max.y - minY || 1;
    const top = new THREE.Color(palette.top);
    const bottom = new THREE.Color(palette.bottom);
    const tmp = new THREE.Color();

    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const original = Array.isArray(child.material) ? child.material[0] : child.material;
      if (original?.name === "Black") {
        child.material = new THREE.MeshStandardMaterial({ color: "#12141a", roughness: 0.4, metalness: 0.3 });
        return;
      }
      const partBox = new THREE.Box3().setFromObject(child);
      const centerY = (partBox.min.y + partBox.max.y) / 2;
      const t = THREE.MathUtils.clamp((centerY - minY) / span, 0, 1);
      tmp.lerpColors(bottom, top, t);
      child.material = new THREE.MeshStandardMaterial({
        color: tmp.clone(),
        roughness: 0.35,
        metalness: 0.25,
      });
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

  useEffect(() => {
    const preferred = ["Wave", "Yes", "Idle"];
    const name = preferred.find((n) => actions[n]) ?? Object.keys(actions)[0];
    const action = name ? actions[name] : undefined;
    action?.reset().fadeIn(0.4).play();
    return () => {
      action?.fadeOut(0.4);
    };
  }, [actions]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.35) * 0.12;
    group.current.position.y = BASE_POSITION[1] + Math.sin(t * 1.1) * 0.08;
  });

  return (
    <group ref={group} position={BASE_POSITION}>
      <primitive object={cloned} scale={scale} position={[offset.x, offset.y, offset.z]} />
    </group>
  );
}

useGLTF.preload("/models/robot-expressive.glb");
