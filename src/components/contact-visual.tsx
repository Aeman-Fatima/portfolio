"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "next-themes";
import { AiCore } from "@/components/ai-core";

export function ContactVisual() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const theme = mounted && resolvedTheme === "light" ? "light" : "dark";

  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-3, -2, -4]} intensity={0.4} color="#7c7fff" />
      <AiCore theme={theme} basePosition={[0, 0, 0]} scale={1.4} />
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
