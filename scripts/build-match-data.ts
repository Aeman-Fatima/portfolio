// Precomputes embeddings for every skill category and project so the
// job-description matcher can do all its comparison work client-side, with
// no server calls. Run with: npx tsx scripts/build-match-data.ts
import { writeFileSync } from "fs";
import { pipeline } from "@huggingface/transformers";
import { skillGroups } from "../src/data/resume";
import { webProjects } from "../src/data/web-projects";

type MatchItem = {
  id: string;
  type: "skill" | "project";
  label: string;
  detail: string;
  embedding: number[];
};

async function main() {
  console.log("Loading embedding model (Xenova/all-MiniLM-L6-v2)...");
  const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

  const sources: { id: string; type: "skill" | "project"; label: string; detail: string; text: string }[] = [];

  // One embedding per skill category (richer signal than embedding each
  // individual chip alone) so a JD paragraph has something meaningful to
  // match against.
  for (const group of skillGroups) {
    const names = group.items.map((i) => i.name).join(", ");
    sources.push({
      id: `skill:${group.category}`,
      type: "skill",
      label: group.category,
      detail: names,
      text: `${group.category}: ${names}`,
    });
  }

  for (const p of webProjects) {
    sources.push({
      id: `project:${p.slug}`,
      type: "project",
      label: p.name,
      detail: p.description,
      text: `${p.name}. ${p.description} Technologies: ${p.stack.join(", ")}.`,
    });
  }

  const items: MatchItem[] = [];
  for (const source of sources) {
    const output = await extractor(source.text, { pooling: "mean", normalize: true });
    items.push({
      id: source.id,
      type: source.type,
      label: source.label,
      detail: source.detail,
      embedding: Array.from(output.data as Float32Array),
    });
    console.log(`  embedded: ${source.id}`);
  }

  writeFileSync("public/match-data.json", JSON.stringify(items));
  console.log(`\nWrote ${items.length} embeddings to public/match-data.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
