"use client";

import { useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "@/components/reveal";
import { profile } from "@/data/resume";

const ContactVisual = dynamic(
  () => import("@/components/contact-visual").then((mod) => mod.ContactVisual),
  { ssr: false },
);

type Status = "idle" | "loading" | "success" | "error";

function CornerBrackets() {
  const base = "absolute h-4 w-4 border-accent/50";
  return (
    <>
      <span aria-hidden className={`${base} left-0 top-0 border-l-2 border-t-2`} />
      <span aria-hidden className={`${base} right-0 top-0 border-r-2 border-t-2`} />
      <span aria-hidden className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span aria-hidden className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </>
  );
}

const fields = [
  {
    key: "name" as const,
    num: "01",
    label: "Your Name",
    placeholder: "What should I call you?",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
      </>
    ),
  },
  {
    key: "email" as const,
    num: "02",
    label: "Your Email",
    placeholder: "Where can I reply?",
    icon: <path d="M3 6h18v12H3zM3 6l9 6 9-6" />,
  },
];

const quickLinks = [
  { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { label: "GitHub", href: profile.github, value: "Aeman-Fatima" },
  { label: "LinkedIn", href: profile.linkedin, value: "aemanfatima" },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const values = { name, email };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMessage("Couldn't reach the server. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-16">
      <Reveal>
        <h2 className="mb-3 font-mono text-sm text-accent">07 · Contact</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <h3 className="mb-10 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Open to full-stack and AI-adjacent roles. Let&apos;s talk.
        </h3>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="grid gap-10 md:grid-cols-2 md:items-stretch">
          <div className="relative rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <CornerBrackets />

            <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-code-accent" />
              OPEN TO OPPORTUNITIES · USUALLY REPLIES WITHIN 24H
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Honeypot field, hidden from real visitors */}
              <input
                type="text"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              {fields.map((field) => (
                <div key={field.key}>
                  <label
                    htmlFor={field.key}
                    className="mb-2 block font-mono text-xs tracking-wide text-muted"
                  >
                    // {field.num} · {field.label.toUpperCase()}
                  </label>
                  <div className="relative">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    >
                      {field.icon}
                    </svg>
                    <input
                      id={field.key}
                      type={field.key === "email" ? "email" : "text"}
                      required
                      value={values[field.key]}
                      onChange={(e) =>
                        field.key === "name" ? setName(e.target.value) : setEmail(e.target.value)
                      }
                      placeholder={field.placeholder}
                      className="w-full rounded-xl border border-border bg-background px-11 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                    />
                  </div>
                </div>
              ))}

              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs tracking-wide text-muted">
                  // 03 · YOUR MESSAGE
                </label>
                <div className="relative">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="pointer-events-none absolute left-4 top-4 text-muted"
                  >
                    <path d="M4 5h16v11H8l-4 4V5z" />
                  </svg>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What would you like to build?"
                    className="w-full resize-none rounded-xl border border-border bg-background px-11 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-1 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-code-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_20px_-6px_var(--accent)] transition-all hover:scale-[1.02] hover:shadow-[0_0_32px_-4px_var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  "Sending..."
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12h16M14 6l6 6-6 6" />
                    </svg>
                    Send
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="font-mono text-xs text-code-accent">
                  Message sent. I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && <p className="font-mono text-xs text-red-400">{errorMessage}</p>}
            </form>
          </div>

          <div className="relative min-h-[20rem] md:min-h-0">
            <ContactVisual />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex flex-1 flex-col gap-1 rounded-2xl border border-border bg-surface px-6 py-4 transition-colors hover:border-accent"
            >
              <span className="text-xs font-medium text-muted">{link.label}</span>
              <span className="text-sm font-medium text-foreground group-hover:text-accent">
                {link.value}
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
