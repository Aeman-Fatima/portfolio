"use client";

import { motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

const GLYPHS = [
  { text: "</>", top: "18%", left: "8%" },
  { text: "{ }", top: "72%", left: "12%" },
  { text: "=>", top: "28%", left: "86%" },
  { text: ";", top: "58%", left: "92%" },
  { text: "( )", top: "84%", left: "48%" },
  { text: "AI", top: "10%", left: "56%" },
];

export function CodeGlyphs({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.35, 0.75], [0, 1]);
  const shift = useTransform(progress, [0, 1], [24, -24]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {GLYPHS.map((glyph) => (
        <motion.span
          key={glyph.text}
          style={{ top: glyph.top, left: glyph.left, opacity, y: shift }}
          className="absolute font-mono text-lg font-medium text-code-accent sm:text-xl"
        >
          {glyph.text}
        </motion.span>
      ))}
    </div>
  );
}
