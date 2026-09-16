import { Reveal } from "@/components/reveal";
import { experience } from "@/data/resume";

function initialsFor(company: string) {
  return company.slice(0, 2).toUpperCase();
}

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 py-16">
      <Reveal>
        <h2 className="mb-3 font-mono text-sm text-accent">04 · Experience</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="mb-16 max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Where I&apos;ve shipped.
        </h3>
      </Reveal>

      <div className="relative">
        <div
          aria-hidden
          className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border to-transparent md:left-1/2"
        />

        <div className="flex flex-col gap-16">
          {experience.map((job, i) => {
            const isEven = i % 2 === 0;
            const isActive = job.period.toLowerCase().includes("present");
            return (
              <Reveal key={`${job.company}-${job.period}`} delay={i * 0.1}>
                <div className="relative pl-16 md:grid md:grid-cols-2 md:gap-10 md:pl-0">
                  <div
                    aria-hidden
                    className="absolute left-6 top-0 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-background font-mono text-[11px] font-bold text-accent shadow-[0_0_18px_-4px_var(--accent)] md:left-1/2"
                  >
                    {initialsFor(job.company)}
                  </div>

                  <div className={isEven ? "md:col-start-1 md:pr-10" : "md:col-start-2 md:pl-10"}>
                    <article className="glow-card rounded-2xl border border-border bg-surface p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs text-muted">
                          LOG_{String(i + 1).padStart(3, "0")}
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${isActive ? "animate-pulse bg-code-accent" : "bg-muted"}`}
                          />
                          {isActive ? "ACTIVE" : "COMPLETED"}
                        </span>
                      </div>

                      <h4 className="mt-4 text-lg font-semibold">{job.role}</h4>
                      <p className="mt-0.5 text-sm font-medium text-accent">{job.company}</p>
                      <p className="mt-1 text-xs text-muted">
                        {job.location} · {job.period}
                      </p>

                      <div className="mt-5 border-t border-border pt-5">
                        <p className="mb-3 font-mono text-xs tracking-wide text-muted">
                          // Highlights
                        </p>
                        <ul className="flex flex-col gap-3">
                          {job.bullets.map((bullet, bi) => (
                            <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-muted">
                              <span className="shrink-0 font-mono text-xs text-code-accent">
                                {String(bi + 1).padStart(2, "0")}
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {job.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
