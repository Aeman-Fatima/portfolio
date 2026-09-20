"use client";

import { useRef, useState } from "react";

type MatchItem = {
  id: string;
  type: "skill" | "project";
  label: string;
  detail: string;
  embedding: number[];
};

type ScoredItem = MatchItem & { score: number };

type Status = "idle" | "loading-model" | "analyzing" | "done" | "error";

// Embeddings are normalized at build time, so the dot product alone equals
// cosine similarity, no extra magnitude division needed.
function dot(a: number[], b: number[]) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

// MiniLM sentence-similarity scores for related-but-not-identical short
// professional text tend to land in a fairly narrow ~0.15-0.65 band rather
// than spanning 0-1, so a raw score would read as an unimpressively low
// percentage even for a strong match. This rescales that realistic band into
// a display range that reads the way a "match score" is expected to.
function toPercent(score: number) {
  const lo = 0.15;
  const hi = 0.65;
  const pct = ((score - lo) / (hi - lo)) * 100;
  return Math.max(5, Math.min(98, Math.round(pct)));
}

export function JobMatcher() {
  const [jobText, setJobText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadProgress, setLoadProgress] = useState(0);
  const [results, setResults] = useState<{ skills: ScoredItem[]; projects: ScoredItem[]; overall: number } | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractorRef = useRef<any>(null);
  const dataRef = useRef<MatchItem[] | null>(null);
  // Tracks loaded/total bytes per file. Weighting by actual bytes (rather
  // than averaging each file's own percentage) keeps the bar monotonically
  // increasing — a small file finishing at 100% shouldn't get diluted, nor
  // should the bar dip when a bigger file starts fresh at 0% afterward.
  const fileBytesRef = useRef<Map<string, { loaded: number; total: number }>>(new Map());

  async function handleCheck() {
    if (!jobText.trim() || status === "loading-model" || status === "analyzing") return;
    setErrorMessage("");
    try {
      if (!dataRef.current) {
        const res = await fetch("/match-data.json");
        if (!res.ok) throw new Error("Could not load match data");
        dataRef.current = await res.json();
      }

      if (!extractorRef.current) {
        setStatus("loading-model");
        setLoadProgress(0);
        const { pipeline, env } = await import("@huggingface/transformers");
        env.allowLocalModels = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        extractorRef.current = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
          progress_callback: (data: { status: string; file?: string; loaded?: number; total?: number }) => {
            // The tokenizer/config JSON files are a few KB and finish
            // instantly; the .onnx weights file is ~90%+ of the download and
            // the only one worth showing progress for. Tracking every file
            // by byte-weighted total makes the bar jump backward once the
            // (much bigger) weights file's size becomes known mid-download.
            if (data.status !== "progress" || !data.file || !data.total || !data.file.endsWith(".onnx")) return;
            fileBytesRef.current.set(data.file, { loaded: data.loaded ?? 0, total: data.total });
            const entries = Array.from(fileBytesRef.current.values());
            const loaded = entries.reduce((sum, e) => sum + e.loaded, 0);
            const total = entries.reduce((sum, e) => sum + e.total, 0);
            setLoadProgress(total > 0 ? Math.round((loaded / total) * 100) : 0);
          },
        });
      }

      setStatus("analyzing");
      const output = await extractorRef.current(jobText, { pooling: "mean", normalize: true });
      const queryEmbedding: number[] = Array.from(output.data as Float32Array);

      const scored: ScoredItem[] = (dataRef.current ?? []).map((item) => ({
        ...item,
        score: dot(queryEmbedding, item.embedding),
      }));

      const skills = scored
        .filter((i) => i.type === "skill")
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      const projects = scored
        .filter((i) => i.type === "project")
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      const topAvg = skills.slice(0, 3).reduce((sum, i) => sum + i.score, 0) / Math.min(3, skills.length || 1);
      const overall = toPercent(topAvg);

      setResults({ skills, projects, overall });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong loading the model. Please try again.");
      setStatus("error");
    }
  }

  const isBusy = status === "loading-model" || status === "analyzing";

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-start">
      <div>
        <label htmlFor="job-description" className="mb-2 block font-mono text-xs tracking-wide text-muted">
          // PASTE A JOB DESCRIPTION
        </label>
        <textarea
          id="job-description"
          rows={10}
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          placeholder="Paste the role's requirements here..."
          className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
        <button
          type="button"
          onClick={handleCheck}
          disabled={!jobText.trim() || isBusy}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-code-accent px-6 py-3 text-sm font-medium text-white shadow-[0_0_20px_-6px_var(--accent)] transition-all hover:scale-[1.02] hover:shadow-[0_0_32px_-4px_var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading-model"
            ? `Loading model (first time only)... ${loadProgress}%`
            : status === "analyzing"
              ? "Analyzing..."
              : "Check My Fit"}
        </button>
        {status === "error" && <p className="mt-3 text-sm text-red-400">{errorMessage}</p>}
        <p className="mt-3 text-xs text-muted">
          Runs entirely in your browser. Nothing is sent to a server, no API calls.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        {!results ? (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center text-sm text-muted">
            <p>Paste a job description and click &quot;Check My Fit&quot; to see how my skills and projects line up.</p>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-xs text-muted">ESTIMATED MATCH</span>
              <span className="bg-gradient-to-r from-accent to-code-accent bg-clip-text font-mono text-3xl font-bold text-transparent">
                {results.overall}%
              </span>
            </div>

            <h5 className="mb-3 text-sm font-semibold text-foreground">Matching skill areas</h5>
            <div className="mb-6 flex flex-col gap-3">
              {results.skills.map((item) => (
                <div key={item.id}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <span className="text-muted">{toPercent(item.score)}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-accent-soft">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-code-accent"
                      style={{ width: `${toPercent(item.score)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <h5 className="mb-3 text-sm font-semibold text-foreground">Most relevant projects</h5>
            <ul className="flex flex-col gap-2">
              {results.projects.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
