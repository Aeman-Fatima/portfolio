"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import type { MotionValue } from "framer-motion";
import { NeuralCodeField } from "@/components/neural-code-field";

export function NeuralCodeScene({ progress }: { progress: MotionValue<number> }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const theme = mounted && resolvedTheme === "light" ? "light" : "dark";

  return (
    <Canvas
      style={{ position: "absolute", inset: 0 }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-3, -2, -4]} intensity={0.4} color={theme === "dark" ? "#7c7fff" : "#5457e5"} />
      <NeuralCodeField progress={progress} theme={theme} />
    </Canvas>
  );
}
