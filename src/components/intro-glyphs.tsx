"use client";

import { useRef, type ReactNode } from "react";
import { useScroll } from "framer-motion";
import { CodeGlyphs } from "@/components/code-glyphs";

export function IntroGlyphs({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative">
      <CodeGlyphs progress={scrollYProgress} />
      {children}
    </div>
  );
}
