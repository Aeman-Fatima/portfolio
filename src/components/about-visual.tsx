"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

export function AboutVisual() {
  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-3, -2, -4]} intensity={0.4} color="#7c7fff" />
      <ArchitectureDiagram />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.2}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
