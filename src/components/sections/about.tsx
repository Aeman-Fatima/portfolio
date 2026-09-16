"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/resume";

const AboutVisual = dynamic(
  () => import("@/components/about-visual").then((mod) => mod.AboutVisual),
  { ssr: false },
);

const stats = [
  { value: "5+", label: "Years building software", accent: "text-accent" },
  { value: "400K+", label: "Users reached", accent: "text-code-accent" },
  { value: "4", label: "Industries delivered across", accent: "text-accent" },
  { value: "M.AI/ML", label: "Adelaide University", accent: "text-accent" },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background via-background/75 to-transparent md:w-[55%]"
      />

      <div className="relative grid gap-12 md:grid-cols-[1fr_320px] md:items-center">
        <div>
          <Reveal>
            <h2 className="mb-6 font-mono text-sm text-accent">02 · About</h2>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {profile.aboutHeadline}
            </h3>
          </Reveal>

          <div className="mt-6 max-w-2xl space-y-4">
            {profile.aboutParagraphs.map((paragraph, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="text-lg leading-[1.6] text-foreground/90">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <p className="mt-6 font-mono text-sm text-muted">
              {profile.location} · {profile.aboutTags.join(" · ")}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-surface px-4 py-3 text-center sm:text-left"
                >
                  <p className={`font-mono text-3xl font-semibold ${stat.accent}`}>{stat.value}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="flex flex-col items-center gap-3">
          <div className="relative h-72 w-full max-w-sm sm:h-80 sm:max-w-md md:h-96 md:w-96">
            <AboutVisual />
          </div>
          <p className="font-mono text-xs text-muted">Frontend → API → Data → AI → Cloud</p>
        </Reveal>
      </div>
    </section>
  );
}
