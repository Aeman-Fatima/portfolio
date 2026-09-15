"use client";

import dynamic from "next/dynamic";
import { useScroll } from "framer-motion";

const NeuralCodeScene = dynamic(
  () => import("@/components/neural-code-scene").then((mod) => mod.NeuralCodeScene),
  { ssr: false },
);

export function SiteBackdrop() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <NeuralCodeScene progress={scrollYProgress} />
    </div>
  );
}
