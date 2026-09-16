"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { AiCore } from "@/components/ai-core";
import { RobotBot } from "@/components/robot-bot";
import { RobotWireframe } from "@/components/robot-wireframe";
import { RobotHumanoid } from "@/components/robot-humanoid";
import { RobotExpressive } from "@/components/robot-expressive";
import { RobotMini } from "@/components/robot-mini";

// Flip this to switch the hero visual. All are kept so you can go back and forth.
const VISUAL: "mini" | "expressive" | "humanoid" | "wireframe" | "robot" | "core" = "expressive";

export function HeroVisual() {
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
      <directionalLight
        position={[-3, -2, -4]}
        intensity={0.4}
        color={theme === "dark" ? "#7c7fff" : "#5457e5"}
      />
      {VISUAL === "mini" ? (
        <RobotMini />
      ) : VISUAL === "expressive" ? (
        <RobotExpressive theme={theme} />
      ) : VISUAL === "humanoid" ? (
        <RobotHumanoid theme={theme} />
      ) : VISUAL === "wireframe" ? (
        <RobotWireframe theme={theme} />
      ) : VISUAL === "robot" ? (
        <RobotBot theme={theme} />
      ) : (
        <AiCore theme={theme} />
      )}
    </Canvas>
  );
}
