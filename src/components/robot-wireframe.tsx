"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PALETTE = {
  light: { line: "#5457e5", glow: "#9092f5", bracket: "#0d9488" },
  dark: { line: "#7c7fff", glow: "#b3b5ff", bracket: "#34d399" },
};

type Vec3 = [number, number, number];

const JOINTS: Vec3[] = [
  [0, 1.56, 0],
  [-0.42, 1.02, 0],
  [0.42, 1.02, 0],
  [-0.52, 0.5, 0.04],
  [-0.46, 0.02, 0.08],
  [0.64, 0.7, 0.28],
  [0.44, 0.86, 0.64],
  [0, 0.55, 0],
  [-0.2, 1.15, 0.35],
  [0.2, 1.15, 0.35],
];

function Bone({ start, end, radius, color }: { start: Vec3; end: Vec3; radius: number; color: string }) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...start);
    const b = new THREE.Vector3(...end);
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize(),
    );
    return { position: mid, quaternion: quat, length: len };
  }, [start, end]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius * 0.85, length, 6, 1]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

function CodeBracket({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const pulse = 0.75 + Math.sin(state.clock.getElapsedTime() * 2.4) * 0.25;
      group.current.scale.setScalar(0.4 * pulse + 0.24);
    }
  });

  return (
    <group position={[0.44, 0.94, 0.68]} rotation={[0.1, 0.5, 0]}>
      <group ref={group} scale={0.4}>
        <mesh position={[-0.32, 0.16, 0]} rotation={[0, 0, 0.7]}>
          <boxGeometry args={[0.46, 0.08, 0.08]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
        <mesh position={[-0.32, -0.16, 0]} rotation={[0, 0, -0.7]}>
          <boxGeometry args={[0.46, 0.08, 0.08]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
        <mesh rotation={[0, 0, 1.2]}>
          <boxGeometry args={[0.58, 0.07, 0.07]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
        <mesh position={[0.32, 0.16, 0]} rotation={[0, 0, -0.7]}>
          <boxGeometry args={[0.46, 0.08, 0.08]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
        <mesh position={[0.32, -0.16, 0]} rotation={[0, 0, 0.7]}>
          <boxGeometry args={[0.46, 0.08, 0.08]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
        </mesh>
      </group>
      <pointLight color={color} intensity={2.2} distance={2.4} />
    </group>
  );
}

export function RobotWireframe({ theme }: { theme: "light" | "dark" }) {
  const group = useRef<THREE.Group>(null);
  const palette = PALETTE[theme];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = -0.15 + Math.sin(t * 0.8) * 0.1;
      group.current.rotation.y = Math.sin(t * 0.35) * 0.3;
    }
  });

  return (
    <group ref={group} position={[0, -0.15, 0]} scale={1.7}>
      {/* head */}
      <mesh position={[0, 1.62, 0]}>
        <icosahedronGeometry args={[0.34, 1]} />
        <meshBasicMaterial color={palette.line} wireframe />
      </mesh>
      {/* neck */}
      <Bone start={[0, 1.32, 0]} end={[0, 1.15, 0]} radius={0.08} color={palette.line} />
      {/* torso */}
      <mesh position={[0, 0.55, 0]} scale={[0.95, 1.15, 0.55]}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial color={palette.line} wireframe />
      </mesh>
      {/* left arm (hanging) */}
      <Bone start={[-0.42, 1.02, 0]} end={[-0.52, 0.5, 0.04]} radius={0.09} color={palette.line} />
      <Bone start={[-0.52, 0.5, 0.04]} end={[-0.46, 0.02, 0.08]} radius={0.075} color={palette.line} />
      {/* right arm (raised, holding the bracket) */}
      <Bone start={[0.42, 1.02, 0]} end={[0.64, 0.7, 0.28]} radius={0.09} color={palette.line} />
      <Bone start={[0.64, 0.7, 0.28]} end={[0.44, 0.86, 0.64]} radius={0.075} color={palette.line} />
      {/* hand */}
      <mesh position={[0.44, 0.86, 0.64]}>
        <icosahedronGeometry args={[0.1, 0]} />
        <meshBasicMaterial color={palette.line} wireframe />
      </mesh>

      {JOINTS.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color={palette.glow}
            emissive={palette.glow}
            emissiveIntensity={1.8}
            toneMapped={false}
          />
        </mesh>
      ))}

      <CodeBracket color={palette.bracket} />
      <pointLight color={palette.line} intensity={1.4} distance={4} position={[0, 1, 1]} />
    </group>
  );
}
