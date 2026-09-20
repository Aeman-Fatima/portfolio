import { Reveal } from "@/components/reveal";
import { JobMatcher } from "@/components/job-matcher";

export function JobMatcherSection() {
  return (
    <section id="job-match" className="mx-auto max-w-7xl px-6 py-16">
      <Reveal>
        <h2 className="mb-3 font-mono text-sm text-accent">06 · Job Match</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="mb-10 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          See how my skills line up with your role.
        </h3>
      </Reveal>
      <Reveal delay={0.15}>
        <JobMatcher />
      </Reveal>
    </section>
  );
}
