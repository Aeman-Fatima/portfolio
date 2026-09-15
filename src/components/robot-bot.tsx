"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const PALETTE = {
  light: { body: "#5457e5", visor: "#0d9488" },
  dark: { body: "#7c7fff", visor: "#34d399" },
};

const BASE_POSITION: [number, number, number] = [0.4, -0.2, 0.2];

export function RobotBot({ theme }: { theme: "light" | "dark" }) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const antenna = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const palette = PALETTE[theme];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = BASE_POSITION[1] + Math.sin(t * 0.9) * 0.12;
      group.current.rotation.y = Math.sin(t * 0.4) * 0.35;
    }
    if (head.current) head.current.rotation.z = Math.sin(t * 0.6) * 0.05;
    if (antenna.current) antenna.current.position.y = 1.0 + Math.sin(t * 2.2) * 0.04;
    if (ring.current) ring.current.rotation.z = t * 0.6;
  });

  return (
    <group ref={group} position={BASE_POSITION} scale={1.2} rotation={[0, 0, -0.18]}>
      <group ref={head}>
        <RoundedBox args={[1.3, 1.05, 1.1]} radius={0.28} smoothness={6}>
          <meshStandardMaterial color={palette.body} roughness={0.3} metalness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.02, 0.56]}>
          <boxGeometry args={[0.92, 0.28, 0.05]} />
          <meshStandardMaterial
            color={palette.visor}
            emissive={palette.visor}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color={palette.body} roughness={0.4} />
        </mesh>
        <mesh ref={antenna} position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial
            color={palette.visor}
            emissive={palette.visor}
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>
      </group>
      <mesh ref={ring} position={[0, -0.75, 0]} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[0.55, 0.02, 8, 64]} />
        <meshBasicMaterial color={palette.visor} transparent opacity={0.6} />
      </mesh>
      <pointLight color={palette.visor} intensity={1.5} distance={3} />
    </group>
  );
}
