import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with Next.js, Tailwind &amp; Framer Motion</p>
      </div>
      <p className="mx-auto mt-2 max-w-7xl text-center text-xs text-muted/70 sm:text-right">
        &quot;Mini Robot&quot; 3D model by{" "}
        <a
          href="https://sketchfab.com/3d-models/mini-robot-3454c84d6eff4a9dabbfadbfd1f56524"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Onur
        </a>{" "}
        (CC-BY)
      </p>
    </footer>
  );
}
