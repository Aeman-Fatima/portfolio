import { Reveal } from "@/components/reveal";
import { profile } from "@/data/resume";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <h2 className="mb-8 font-mono text-sm text-accent">02 · About</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-3xl text-xl leading-relaxed text-foreground sm:text-2xl">
          {profile.summary}
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 text-sm text-muted">{profile.location}</p>
      </Reveal>
    </section>
  );
}
