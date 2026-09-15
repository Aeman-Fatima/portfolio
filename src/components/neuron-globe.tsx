"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const POINT_COUNT = 46;
const RADIUS = 1.5;
const NEIGHBORS = 3;

const PALETTE = {
  accent: new THREE.Color("#7c7fff"),
  codeAccent: new THREE.Color("#34d399"),
  line: "#4b4f66",
};

function seededRandom(seed: number) {
  let t = seed;
  return function random() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius));
  }
  return points;
}

function buildEdges(points: THREE.Vector3[], neighbors: number) {
  const edges: [number, number][] = [];
  for (let i = 0; i < points.length; i++) {
    const nearest = points
      .map((p, j) => ({ j, d: i === j ? Infinity : p.distanceTo(points[i]) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, neighbors);
    for (const { j } of nearest) {
      const key: [number, number] = i < j ? [i, j] : [j, i];
      if (!edges.some(([a, b]) => a === key[0] && b === key[1])) edges.push(key);
    }
  }
  return edges;
}

export function NeuronGlobe({
  basePosition = [0, 0, 0],
  scale = 1,
}: {
  basePosition?: [number, number, number];
  scale?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const points = useMemo(() => fibonacciSphere(POINT_COUNT, RADIUS), []);
  const edges = useMemo(() => buildEdges(points, NEIGHBORS), [points]);
  const random = useMemo(() => seededRandom(7), []);
  const nodeColors = useMemo(
    () => points.map(() => (random() > 0.5 ? PALETTE.accent : PALETTE.codeAccent)),
    [points, random],
  );

  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 2 * 3);
    edges.forEach(([a, b], i) => {
      arr[i * 6] = points[a].x;
      arr[i * 6 + 1] = points[a].y;
      arr[i * 6 + 2] = points[a].z;
      arr[i * 6 + 3] = points[b].x;
      arr[i * 6 + 4] = points[b].y;
      arr[i * 6 + 5] = points[b].z;
    });
    return arr;
  }, [edges, points]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.18;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    group.current.position.y = basePosition[1] + Math.sin(t * 0.9) * 0.1;
  });

  return (
    <group ref={group} position={basePosition} scale={scale}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={PALETTE.line} transparent opacity={0.5} />
      </lineSegments>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color={nodeColors[i]}
            emissive={nodeColors[i]}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      ))}
      <pointLight color="#7c7fff" intensity={1.2} distance={5} />
    </group>
  );
}
