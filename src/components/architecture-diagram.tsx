"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const TARGET_SIZE = 4.5;
const BASE_POSITION: [number, number, number] = [0, 0, 0];

export function ArchitectureDiagram() {
  const group = useRef<THREE.Group>(null);
  const orbitRefs = useRef<THREE.Object3D[]>([]);
  const bandRefs = useRef<THREE.Object3D[]>([]);
  const { scene } = useGLTF("/models/architecture.glb");

  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const orbits: THREE.Object3D[] = [];
    const bands: THREE.Object3D[] = [];
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (child.name.startsWith("core_orbit_")) orbits.push(child);
      if (child.name.startsWith("orbital_band_")) bands.push(child);
    });
    orbitRefs.current = orbits;
    bandRefs.current = bands;
  }, [cloned]);

  const { scale, offset } = useMemo(() => {
    // Scale against the true bounding sphere of the actual vertices (not
    // Box3.getBoundingSphere, which sizes off the axis-aligned box's corner-
    // to-corner diagonal, which is overly conservative, since it assumes a single
    // point sits at all three axis extremes at once). This keeps the diagram
    // from clipping the frame at any drag angle without shrinking it far more
    // than necessary.
    cloned.updateMatrixWorld(true);
    const points: THREE.Vector3[] = [];
    const v = new THREE.Vector3();
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const pos = child.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        points.push(v.fromBufferAttribute(pos, i).applyMatrix4(child.matrixWorld).clone());
      }
    });
    const sphere = new THREE.Sphere().setFromPoints(points);
    const s = TARGET_SIZE / 2 / (sphere.radius || 1);
    return { scale: s, offset: sphere.center.clone().multiplyScalar(-s) };
  }, [cloned]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      // No auto-spin here: OrbitControls (drag + autoRotate) owns the overall
      // orientation now, so it doesn't fight the user's own dragging.
      group.current.position.y = BASE_POSITION[1] + Math.sin(t * 0.8) * 0.08;
    }
    // The core's orbit rings and the outer orbital bands are individually
    // centered at the origin (unlike the fixed pipeline-stage clusters around
    // them), so they can spin in place independently for a layered effect
    // without disturbing the diagram's layout.
    orbitRefs.current.forEach((mesh, i) => {
      mesh.rotation.y = t * (0.6 + i * 0.15);
    });
    bandRefs.current.forEach((mesh, i) => {
      mesh.rotation.y = -t * (0.12 + i * 0.05);
      mesh.rotation.x = Math.sin(t * 0.15 + i) * 0.05;
    });
  });

  return (
    <group ref={group} position={BASE_POSITION}>
      <primitive object={cloned} scale={scale} position={[offset.x, offset.y, offset.z]} />
      <pointLight color="#7c7fff" intensity={1.2} distance={5} />
    </group>
  );
}

useGLTF.preload("/models/architecture.glb");
