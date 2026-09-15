"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

const POINT_COUNT = 64;
const NEIGHBORS = 2;
const COLS = 8;
const BOUNDS = { x: 4.4, y: 2.6, z: 1.2 };

const PALETTE = {
  light: { neural: new THREE.Color("#5457e5"), code: new THREE.Color("#0d9488") },
  dark: { neural: new THREE.Color("#7c7fff"), code: new THREE.Color("#34d399") },
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

function buildLayouts() {
  const random = seededRandom(42);
  const neural: THREE.Vector3[] = [];
  const grid: THREE.Vector3[] = [];
  const rows = Math.ceil(POINT_COUNT / COLS);

  for (let i = 0; i < POINT_COUNT; i++) {
    neural.push(
      new THREE.Vector3(
        (random() * 2 - 1) * BOUNDS.x,
        (random() * 2 - 1) * BOUNDS.y,
        (random() * 2 - 1) * BOUNDS.z,
      ),
    );
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    grid.push(
      new THREE.Vector3(
        (col / (COLS - 1) - 0.5) * 2 * BOUNDS.x,
        (0.5 - row / (rows - 1)) * 2 * BOUNDS.y,
        0,
      ),
    );
  }
  return { neural, grid };
}

function buildEdges(points: THREE.Vector3[]) {
  const edges: [number, number][] = [];
  for (let i = 0; i < points.length; i++) {
    const nearest = points
      .map((p, j) => ({ j, d: i === j ? Infinity : p.distanceTo(points[i]) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, NEIGHBORS);
    for (const { j } of nearest) {
      const key: [number, number] = i < j ? [i, j] : [j, i];
      if (!edges.some(([a, b]) => a === key[0] && b === key[1])) edges.push(key);
    }
  }
  return edges;
}

export function NeuralCodeField({
  progress,
  theme,
}: {
  progress: MotionValue<number>;
  theme: "light" | "dark";
}) {
  const { neural, grid } = useMemo(buildLayouts, []);
  const edges = useMemo(() => buildEdges(neural), [neural]);
  const offsets = useMemo(() => neural.map((_, i) => (i / neural.length) * 0.6), [neural]);

  const positions = useMemo(() => {
    const arr = new Float32Array(POINT_COUNT * 3);
    neural.forEach((v, i) => {
      arr[i * 3] = v.x;
      arr[i * 3 + 1] = v.y;
      arr[i * 3 + 2] = v.z;
    });
    return arr;
  }, [neural]);

  const colors = useMemo(() => {
    const arr = new Float32Array(POINT_COUNT * 3);
    const base = PALETTE[theme].neural;
    for (let i = 0; i < POINT_COUNT; i++) {
      arr[i * 3] = base.r;
      arr[i * 3 + 1] = base.g;
      arr[i * 3 + 2] = base.b;
    }
    return arr;
  }, [theme]);

  const linePositions = useMemo(() => new Float32Array(edges.length * 2 * 3), [edges.length]);

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame(() => {
    const p = progress.get();
    const palette = PALETTE[theme];

    for (let i = 0; i < POINT_COUNT; i++) {
      const span = 1 - offsets[i] || 1;
      const local = THREE.MathUtils.clamp((p - offsets[i]) / span, 0, 1);
      const eased = local * local * (3 - 2 * local);

      tmp.lerpVectors(neural[i], grid[i], eased);
      positions[i * 3] = tmp.x;
      positions[i * 3 + 1] = tmp.y;
      positions[i * 3 + 2] = tmp.z;

      tmpColor.lerpColors(palette.neural, palette.code, eased);
      colors[i * 3] = tmpColor.r;
      colors[i * 3 + 1] = tmpColor.g;
      colors[i * 3 + 2] = tmpColor.b;
    }

    if (pointsRef.current) {
      const geometry = pointsRef.current.geometry;
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
    }

    edges.forEach(([a, b], i) => {
      linePositions[i * 6] = positions[a * 3];
      linePositions[i * 6 + 1] = positions[a * 3 + 1];
      linePositions[i * 6 + 2] = positions[a * 3 + 2];
      linePositions[i * 6 + 3] = positions[b * 3];
      linePositions[i * 6 + 4] = positions[b * 3 + 1];
      linePositions[i * 6 + 5] = positions[b * 3 + 2];
    });

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={theme === "dark" ? "#3a3d4d" : "#d8dae0"}
          transparent
          opacity={0.3}
        />
      </lineSegments>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.08} vertexColors sizeAttenuation transparent opacity={0.45} />
      </points>
    </group>
  );
}
