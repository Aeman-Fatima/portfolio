"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PALETTE = {
  light: { body: "#6366f1", joint: "#5457e5", visor: "#0d9488", bracket: "#0d9488" },
  dark: { body: "#8b8ef5", joint: "#7c7fff", visor: "#34d399", bracket: "#34d399" },
};

type Vec3 = [number, number, number];

function Limb({
  start,
  end,
  radius,
  color,
  flatten = 1,
}: {
  start: Vec3;
  end: Vec3;
  radius: number;
  color: string;
  flatten?: number;
}) {
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
    return { position: mid, quaternion: quat, length: Math.max(len - radius * 1.4, 0.05) };
  }, [start, end, radius]);

  return (
    <mesh position={position} quaternion={quaternion} scale={[1, 1, flatten]} castShadow>
      <capsuleGeometry args={[radius, length, 6, 12]} />
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.35} />
    </mesh>
  );
}

function Joint({ position, radius, color }: { position: Vec3; radius: number; color: string }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 20, 20]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
    </mesh>
  );
}

function CodeBracket({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      const pulse = 0.75 + Math.sin(state.clock.getElapsedTime() * 2.4) * 0.25;
      group.current.scale.setScalar(0.34 * pulse + 0.2);
    }
  });

  return (
    <group position={[0.46, 1.0, 0.66]} rotation={[0.1, 0.5, 0]}>
      <group ref={group} scale={0.34}>
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

const SHOULDER_L: Vec3 = [-0.4, 1.05, 0];
const SHOULDER_R: Vec3 = [0.4, 1.05, 0];
const ELBOW_L: Vec3 = [-0.48, 0.55, 0.05];
const ELBOW_R: Vec3 = [0.58, 0.74, 0.24];
const HAND_L: Vec3 = [-0.42, 0.1, 0.1];
const HAND_R: Vec3 = [0.46, 1.0, 0.66];

export function RobotHumanoid({ theme }: { theme: "light" | "dark" }) {
  const group = useRef<THREE.Group>(null);
  const palette = PALETTE[theme];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.position.y = -0.55 + Math.sin(t * 0.8) * 0.08;
      group.current.rotation.y = Math.sin(t * 0.35) * 0.3;
    }
  });

  return (
    <group ref={group} position={[0, -0.55, 0]} scale={1.2}>
      {/* head */}
      <mesh position={[0, 1.56, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={palette.body} roughness={0.3} metalness={0.35} />
      </mesh>
      {/* visor */}
      <mesh position={[0, 1.53, 0.27]}>
        <boxGeometry args={[0.36, 0.09, 0.04]} />
        <meshStandardMaterial
          color={palette.visor}
          emissive={palette.visor}
          emissiveIntensity={1.4}
          toneMapped={false}
        />
      </mesh>
      {/* neck */}
      <Limb start={[0, 1.32, 0]} end={[0, 1.16, 0]} radius={0.1} color={palette.body} />
      {/* torso */}
      <Limb start={[0, 1.05, 0]} end={[0, 0.18, 0]} radius={0.33} color={palette.body} flatten={0.75} />

      {/* left arm (hanging) */}
      <Joint position={SHOULDER_L} radius={0.13} color={palette.joint} />
      <Limb start={SHOULDER_L} end={ELBOW_L} radius={0.1} color={palette.body} />
      <Joint position={ELBOW_L} radius={0.09} color={palette.joint} />
      <Limb start={ELBOW_L} end={HAND_L} radius={0.085} color={palette.body} />
      <Joint position={HAND_L} radius={0.08} color={palette.body} />

      {/* right arm (raised, holding the code brackets) */}
      <Joint position={SHOULDER_R} radius={0.13} color={palette.joint} />
      <Limb start={SHOULDER_R} end={ELBOW_R} radius={0.1} color={palette.body} />
      <Joint position={ELBOW_R} radius={0.09} color={palette.joint} />
      <Limb start={ELBOW_R} end={HAND_R} radius={0.085} color={palette.body} />
      <Joint position={HAND_R} radius={0.09} color={palette.body} />

      <CodeBracket color={palette.bracket} />
      <pointLight color={palette.joint} intensity={1.2} distance={4} position={[0, 1, 1.2]} />
    </group>
  );
}
