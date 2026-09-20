"use client";

import Link from "next/link";

const links = [
  { href: "#worlds", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#job-match", label: "Job Match" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-3xl border border-border/60 bg-gradient-to-r from-background via-surface to-accent/15 px-5 py-3 shadow-lg shadow-black/10 backdrop-blur-xl">
        <Link href="#top" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avatar.webp"
            alt="Aeman Fatima"
            className="h-11 w-11 rounded-xl object-cover ring-1 ring-border transition-transform duration-200 hover:scale-125"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight">Aeman Fatima</span>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-code-accent" />
              FULL-STACK &amp; AI ENGINEER
            </span>
          </div>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
