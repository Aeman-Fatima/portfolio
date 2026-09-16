"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { profile } from "@/data/resume";

const HeroVisual = dynamic(
  () => import("@/components/hero-visual").then((mod) => mod.HeroVisual),
  { ssr: false },
);

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[5%] top-[10%] h-80 w-80 rounded-full bg-accent/20 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[5%] right-[5%] h-96 w-96 rounded-full bg-code-accent/15 blur-[120px]"
      />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between md:gap-10 md:py-12">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="relative pl-6 md:pl-7">
            <span
              aria-hidden
              className="absolute -left-px top-2 bottom-2 hidden w-px bg-gradient-to-b from-accent via-accent/30 to-transparent md:block"
            />
            <span
              aria-hidden
              className="absolute -left-[7px] top-1 hidden h-3 w-3 rounded-full bg-accent shadow-[0_0_16px_2px_var(--accent)] md:block"
            />
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-accent to-code-accent bg-clip-text text-transparent">
                {profile.name.split(" ")[0]}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 max-w-xl text-lg font-medium text-muted sm:text-xl md:mt-4 md:text-2xl"
            >
              {profile.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-xl text-base text-muted sm:text-lg md:mt-6"
            >
              5+ years building production software across startup, contract and full-time
              environments, from architecture and AWS infrastructure to the code clients
              actually use. Now building on the AI side too.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-10 md:justify-start"
            >
              <a
                href="#projects"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-code-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_20px_-6px_var(--accent)] transition-all hover:scale-105 hover:shadow-[0_0_32px_-4px_var(--accent)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
                View my work
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:shadow-[0_0_20px_-8px_var(--accent)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6l9 6 9-6M3 6h18v12H3z" />
                </svg>
                Get in touch
              </a>
            </motion.div>
          </div>
        </div>
        <div className="relative h-56 w-full max-w-xs shrink-0 sm:h-80 sm:max-w-sm md:-mt-10 md:h-[30rem] md:w-[30rem] md:max-w-none">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
