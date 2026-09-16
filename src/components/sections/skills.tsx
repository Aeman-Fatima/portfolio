import { Reveal } from "@/components/reveal";
import { skillGroups } from "@/data/resume";

function Chip({ name, primary }: { name: string; primary?: boolean }) {
  return (
    <span
      className={
        primary
          ? "rounded-full bg-code-accent/15 px-2.5 py-1 text-[11px] font-medium text-code-accent"
          : "rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent"
      }
    >
      {name}
    </span>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-background/55" />

      <div className="relative">
        <Reveal>
          <h2 className="mb-6 font-mono text-sm text-accent">03 · Skills</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            The stack I use to ship production software
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            From responsive interfaces and backend services to cloud deployment and AI-enabled
            features.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={(i % 3) * 0.06}>
              <div className="glow-card flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
                <h4 className="mb-3 text-sm font-semibold text-foreground">{group.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Chip key={item.name} {...item} />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
