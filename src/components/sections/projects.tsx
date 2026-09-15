"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { webProjects, type ProjectCategory } from "@/data/web-projects";

const FILTERS: { key: ProjectCategory | "All"; label: string; num: string }[] = [
  { key: "All", label: "All", num: "00" },
  { key: "Websites", label: "Websites", num: "01" },
  { key: "Mobile Apps", label: "Mobile Apps", num: "02" },
  { key: "Designs", label: "Designs", num: "03" },
];

const INITIAL_VISIBLE = 6;

function PrivatePlaceholder({ note }: { note?: string }) {
  return (
    <div className="flex h-56 w-full flex-col items-center justify-center gap-3 bg-black/10 px-6 text-center sm:h-64">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-muted">
        <rect x="5" y="10.5" width="14" height="9" rx="2" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      </svg>
      <span className="max-w-[16rem] font-mono text-xs text-muted">
        {note ?? "Private project, no public link available."}
      </span>
    </div>
  );
}

function ScrollingPreview({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [distance, setDistance] = useState(0);
  const [hovered, setHovered] = useState(false);

  const measure = () => {
    if (containerRef.current && imgRef.current) {
      setDistance(Math.max(imgRef.current.offsetHeight - containerRef.current.offsetHeight, 0));
    }
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const duration = Math.max(distance / 55, 4);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-56 w-full overflow-hidden bg-black/10 sm:h-64"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={measure}
        className="w-full"
        style={{
          transform: hovered ? `translateY(-${distance}px)` : "translateY(0)",
          transitionProperty: "transform",
          transitionDuration: hovered ? `${duration}s` : "0.7s",
          transitionTimingFunction: hovered ? "linear" : "ease",
        }}
      />
    </div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const [expanded, setExpanded] = useState(false);
  const filtered =
    filter === "All" ? webProjects : webProjects.filter((p) => p.categories.includes(filter));
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  const handleFilterChange = (key: ProjectCategory | "All") => {
    setFilter(key);
    setExpanded(false);
  };

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <h2 className="mb-3 font-mono text-sm text-accent">05 · Projects</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="mb-10 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Selected work.
        </h3>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mb-10 inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface p-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => handleFilterChange(f.key)}
              className={`relative rounded-full px-4 py-2 font-mono text-xs font-medium tracking-wide transition-colors ${
                filter === f.key ? "text-white" : "text-muted hover:text-foreground"
              }`}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="project-filter-bg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-code-accent"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                />
              )}
              <span className="relative">
                {f.num} {f.label.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </Reveal>

      {filtered.length === 0 ? (
        <Reveal delay={0.2}>
          <p className="text-sm text-muted">More projects in this category are on the way.</p>
        </Reveal>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 3) * 0.08}>
              <article className="glow-card overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="flex items-center justify-between px-5 pt-4">
                  <span className="font-mono text-xs text-muted">
                    PROJ_{String(i + 1).padStart(3, "0")}
                  </span>
                  {project.statusOverride ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted">
                      <span className={`h-1.5 w-1.5 rounded-full ${project.statusOverride.dotClassName}`} />
                      {project.statusOverride.label}
                    </span>
                  ) : project.isLive ? (
                    <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-code-accent" />
                      LIVE
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                      PRIVATE
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  {project.image ? (
                    <ScrollingPreview src={project.image} alt={project.name} />
                  ) : (
                    <PrivatePlaceholder note={project.privateNote} />
                  )}
                </div>
                <div className="p-5 sm:p-6">
                  <h4 className="text-lg font-semibold">{project.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-muted">
                      // {project.categories.map((c) => c.toUpperCase()).join(" · ")}
                    </span>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-accent transition-colors hover:border-accent"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      {!expanded && filtered.length > INITIAL_VISIBLE && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:shadow-[0_0_20px_-8px_var(--accent)]"
          >
            See more projects ({filtered.length - INITIAL_VISIBLE} more)
          </button>
        </div>
      )}
    </section>
  );
}
