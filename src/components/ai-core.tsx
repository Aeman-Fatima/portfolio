"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

const PALETTE = {
  light: { core: "#5457e5", ring: "#0d9488" },
  dark: { core: "#7c7fff", ring: "#34d399" },
};

const DEFAULT_BASE_POSITION: [number, number, number] = [0.4, -0.2, 0.2];

export function AiCore({
  theme,
  basePosition = DEFAULT_BASE_POSITION,
  scale = 1,
}: {
  theme: "light" | "dark";
  basePosition?: [number, number, number];
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const palette = PALETTE[theme];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = basePosition[1] + Math.sin(t * 0.8) * 0.12;
      group.current.rotation.y = t * 0.15;
    }
    if (shell.current) shell.current.rotation.y = -t * 0.25;
    if (ringA.current) ringA.current.rotation.z = t * 0.35;
    if (ringB.current) ringB.current.rotation.z = -t * 0.28;
  });

  return (
    <group ref={group} position={basePosition} scale={scale}>
      <Sphere args={[0.85, 64, 64]}>
        <MeshDistortMaterial
          color={palette.core}
          emissive={palette.core}
          emissiveIntensity={0.55}
          distort={0.35}
          speed={1.6}
          roughness={0.15}
          metalness={0.3}
        />
      </Sphere>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshBasicMaterial color={palette.ring} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.5, 0.012, 8, 96]} />
        <meshBasicMaterial color={palette.core} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3.2, Math.PI / 5, 0]}>
        <torusGeometry args={[1.75, 0.008, 8, 96]} />
        <meshBasicMaterial color={palette.ring} transparent opacity={0.4} />
      </mesh>
      <pointLight color={palette.core} intensity={2} distance={4} />
    </group>
  );
}
