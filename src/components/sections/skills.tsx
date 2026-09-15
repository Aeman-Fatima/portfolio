import { Reveal } from "@/components/reveal";
import { skills } from "@/data/resume";

export function Skills() {
  const groups = Object.entries(skills);

  return (
    <section id="skills" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <h2 className="mb-12 font-mono text-sm text-accent">03 · Skills</h2>
      </Reveal>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([category, items], i) => (
          <Reveal key={category} delay={(i % 3) * 0.08}>
            <div className="glow-card rounded-2xl border border-border bg-surface p-6">
              <h3 className="mb-4 text-sm font-medium text-muted">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
