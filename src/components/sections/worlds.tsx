"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";

type IconKey =
  | "message"
  | "calculator"
  | "network"
  | "sparkle"
  | "route"
  | "clock"
  | "config"
  | "clone"
  | "server"
  | "database"
  | "check"
  | "browser";

const ICONS: Record<IconKey, React.ReactNode> = {
  message: (
    <path d="M4 5h16v11H8l-4 4V5z" />
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12l2 2 4-4M8 17h.01M12 17h.01M16 17h.01" />
    </>
  ),
  sparkle: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
  ),
  route: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 7.3C11 10 13 10 15.8 12.7M6 8.5V13a4 4 0 0 0 4 4h2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  config: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6" />
    </>
  ),
  clone: (
    <>
      <rect x="4" y="7" width="11" height="13" rx="2" />
      <path d="M9 7V6a2 2 0 0 1 2-2h9v13a2 2 0 0 1-2 2h-2" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="7" rx="1.5" />
      <rect x="4" y="13" width="16" height="7" rx="1.5" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.3 12.3l2.6 2.6 5-5.2" />
    </>
  ),
  network: (
    <>
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M7.7 7.6 10.5 15.6M16.3 7.6 13.5 15.6M8.2 6h7.6" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 8.5h18M6.5 6.5h.01M9.5 6.5h.01" />
    </>
  ),
};

function Icon({ name }: { name: IconKey }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

const pipelines = [
  {
    key: "ai-workflow",
    tabLabel: "AI-Driven Workflow",
    title: "Input in. Reliable answer out.",
    description:
      "AI isn't one tool. It's a spectrum: rule-based logic handles what's exact, classical ML and NLP handle what's structured, and generative reasoning only steps in where real judgment is needed.",
    steps: [
      { label: "User Input", icon: "message" as IconKey },
      { label: "Deterministic Check", icon: "calculator" as IconKey },
      { label: "Classical ML / NLP", icon: "network" as IconKey },
      { label: "Generative Reasoning", icon: "sparkle" as IconKey },
      { label: "Adaptive Output", icon: "clock" as IconKey },
    ],
    tags: ["Scikit-learn", "PyTorch", "spaCy", "Claude API", "RAG"],
  },
  {
    key: "web-ai",
    tabLabel: "Web + AI Integration",
    title: "Request in. Intelligent product out.",
    description:
      "The AI layer isn't a bolt-on demo. It's just another service in the request path, behind the same auth, tests, and deployment pipeline as every other endpoint in the stack.",
    steps: [
      { label: "Frontend Request", icon: "browser" as IconKey },
      { label: "Backend API", icon: "server" as IconKey },
      { label: "AI / ML Service", icon: "sparkle" as IconKey },
      { label: "Business Logic", icon: "route" as IconKey },
      { label: "Response to UI", icon: "check" as IconKey },
    ],
    tags: ["React / Angular", "NestJS", "REST APIs", "Claude API", "Docker"],
  },
  {
    key: "multitenant",
    tabLabel: "Multi-Tenant Architecture",
    title: "One codebase. Many clients.",
    description:
      "A shared codebase deployed as isolated, configurable instances per client, with architecture, hosting, and SSL owned end-to-end, repeated for every new client rather than rebuilt from scratch.",
    steps: [
      { label: "Client Config", icon: "config" as IconKey },
      { label: "Codebase Clone", icon: "clone" as IconKey },
      { label: "Hosting + SSL", icon: "server" as IconKey },
      { label: "DB Provision", icon: "database" as IconKey },
      { label: "Live Tenant", icon: "check" as IconKey },
    ],
    tags: ["PHP", "Node.js", "MySQL", "PostgreSQL", "Apache", "Docker"],
  },
];

export function Worlds() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = pipelines[activeIdx];

  return (
    <section id="worlds" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <h2 className="mb-3 font-mono text-sm text-accent">01 · Approach</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="mb-10 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Two sides of how I build.
        </h3>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mb-8 inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface p-1">
          {pipelines.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`relative rounded-full px-5 py-2 font-mono text-xs font-medium tracking-wide transition-colors sm:text-sm ${
                i === activeIdx ? "text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {i === activeIdx && (
                <motion.span
                  layoutId="pipeline-tab-bg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-code-accent"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                />
              )}
              <span className="relative">{p.tabLabel.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
                <span className="bg-gradient-to-r from-accent to-code-accent bg-clip-text text-transparent">
                  {active.title}
                </span>
              </h4>
              <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
                {active.description}
              </p>

              <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                {active.steps.map((step, i) => (
                  <Fragment key={step.label}>
                    <div className="flex items-center gap-4 md:w-24 md:flex-col md:text-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/40 text-accent shadow-[0_0_16px_-6px_var(--accent)]">
                        <Icon name={step.icon} />
                      </div>
                      <span className="text-xs text-muted md:mt-1">{step.label}</span>
                    </div>
                    {i < active.steps.length - 1 && (
                      <div className="hidden h-px flex-1 self-center bg-border md:block" />
                    )}
                  </Fragment>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-2">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
