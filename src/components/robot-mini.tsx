"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TARGET_HEIGHT = 3.4;
const BASE_POSITION: [number, number, number] = [0, -0.3, 0];

// Same gradient the previous hero robot used, for visual continuity.
const PALETTE_TOP = "#fbbf24";
const PALETTE_BOTTOM = "#f97316";

// The source model mirrors both arms into a single shared mesh per arm part
// (no separate left/right nodes), but the two halves never share vertices,
// so each arm mesh can be split cleanly down the middle by world-space X sign
// into two independent meshes, letting just one side wave.
const ARM_PREFIXES = ["arms_high", "arm_joint", "Cylinder"];

function isArmPart(name: string) {
  return ARM_PREFIXES.some((p) => name.startsWith(p));
}

// The waving arm is the world +X half (camera's right).
const WAVE_SIDE = 1;

function splitMeshBySide(
  mesh: THREE.Mesh,
  waveBoxMin: THREE.Vector3,
  waveBoxMax: THREE.Vector3
) {
  const geo = mesh.geometry;
  const posAttr = geo.attributes.position;
  const index = geo.index!;
  const matrixWorld = mesh.matrixWorld;
  const v = new THREE.Vector3();
  const vv = new THREE.Vector3();
  const worldPos = (i: number, out: THREE.Vector3) => {
    out.fromBufferAttribute(posAttr, i);
    out.applyMatrix4(matrixWorld);
    return out;
  };

  const negIdx: number[] = [];
  const posIdx: number[] = [];

  for (let i = 0; i < index.count; i += 3) {
    const a = index.getX(i);
    const b = index.getX(i + 1);
    const c = index.getX(i + 2);
    const ax = worldPos(a, v).x;
    const bx = worldPos(b, vv).x;
    const cx = worldPos(c, v).x;
    const sum = ax + bx + cx;
    const tri = [a, b, c];
    if (sum >= 0) {
      posIdx.push(a, b, c);
      if (WAVE_SIDE > 0) {
        for (const idx of tri) {
          worldPos(idx, v);
          waveBoxMin.min(v);
          waveBoxMax.max(v);
        }
      }
    } else {
      negIdx.push(a, b, c);
      if (WAVE_SIDE < 0) {
        for (const idx of tri) {
          worldPos(idx, v);
          waveBoxMin.min(v);
          waveBoxMax.max(v);
        }
      }
    }
  }

  const makeGeo = (idxArr: number[]) => {
    const g = geo.clone();
    g.setIndex(idxArr);
    return g;
  };

  const negMesh = new THREE.Mesh(makeGeo(negIdx), mesh.material);
  const posMesh = new THREE.Mesh(makeGeo(posIdx), mesh.material);
  for (const m of [negMesh, posMesh]) {
    m.position.copy(mesh.position);
    m.rotation.copy(mesh.rotation);
    m.scale.copy(mesh.scale);
  }
  return { neg: negMesh, pos: posMesh };
}

export function RobotMini() {
  const group = useRef<THREE.Group>(null);
  const armPivot = useRef<THREE.Group | null>(null);
  const { scene } = useGLTF("/models/mini-robot.glb");

  const cloned = useMemo(() => scene.clone(true), [scene]);

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
    cloned.updateMatrixWorld(true);

    // Split every arm-related mesh into a static half and a waving half.
    const toReplace: THREE.Mesh[] = [];
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh && isArmPart(child.parent?.name ?? "")) {
        toReplace.push(child);
      }
    });

    const waveMeshes: THREE.Mesh[] = [];
    const waveBoxMin = new THREE.Vector3(Infinity, Infinity, Infinity);
    const waveBoxMax = new THREE.Vector3(-Infinity, -Infinity, -Infinity);

    for (const mesh of toReplace) {
      const parent = mesh.parent!;
      const { neg, pos } = splitMeshBySide(mesh, waveBoxMin, waveBoxMax);
      parent.remove(mesh);
      const waveMesh = WAVE_SIDE > 0 ? pos : neg;
      const staticMesh = WAVE_SIDE > 0 ? neg : pos;
      parent.add(staticMesh);
      parent.add(waveMesh);
      waveMeshes.push(waveMesh);
    }

    // Shoulder pivot: near-body edge at shoulder height, from actual wave-side
    // vertices (not Box3.setFromObject, which would read the whole shared
    // position buffer including the unused static-side vertices).
    const pivotWorld = new THREE.Vector3(
      WAVE_SIDE > 0 ? waveBoxMin.x : waveBoxMax.x,
      waveBoxMax.y,
      (waveBoxMin.z + waveBoxMax.z) / 2
    );
    const pivot = new THREE.Group();
    cloned.add(pivot);
    cloned.updateMatrixWorld(true);
    pivot.position.copy(cloned.worldToLocal(pivotWorld.clone()));
    for (const mesh of waveMeshes) pivot.attach(mesh);
    armPivot.current = pivot;

    // Recolor every mesh (both split arm halves included) by height.
    const box = new THREE.Box3().setFromObject(cloned);
    const minY = box.min.y;
    const span = box.max.y - minY || 1;
    const top = new THREE.Color(PALETTE_TOP);
    const bottom = new THREE.Color(PALETTE_BOTTOM);
    const tmp = new THREE.Color();

    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const parentName = child.parent?.name ?? "";

      // Leave the visor untouched: its baked texture is the face (eyes,
      // mouth), not just a flat color, so recoloring it erases the face.
      if (parentName === "screen") return;

      // Tint the existing material's color instead of replacing it outright,
      // so the original texture maps (shading, highlights, panel lines) stay
      // intact: a full replacement flattens the model to solid plastic.
      const original = Array.isArray(child.material) ? child.material[0] : child.material;
      if (!original) return;
      const partBox = new THREE.Box3().setFromObject(child);
      const centerY = (partBox.min.y + partBox.max.y) / 2;
      const t = THREE.MathUtils.clamp((centerY - minY) / span, 0, 1);
      tmp.lerpColors(bottom, top, t);
      const tinted = original.clone();
      tinted.color.copy(tmp);
      child.material = tinted;
    });
  }, [cloned]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.35) * 0.5;
    group.current.position.y = BASE_POSITION[1] + Math.sin(t * 1.1) * 0.08;
    if (armPivot.current) {
      // Raised out to the side, wagging back and forth: a one-arm wave.
      armPivot.current.rotation.z = 1.9 + Math.sin(t * 6) * 0.35;
    }
  });

  return (
    <group ref={group} position={BASE_POSITION}>
      <primitive object={cloned} scale={scale} position={[offset.x, offset.y, offset.z]} />
    </group>
  );
}

useGLTF.preload("/models/mini-robot.glb");
