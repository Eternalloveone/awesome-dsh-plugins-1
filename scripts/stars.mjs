#!/usr/bin/env node
// Refresh the `stars` / `starsUpdated` fields in data/plugins.json from the
// GitHub GraphQL API, batched 100 repos per request. Stars are a display and
// ranking signal only; the registry's trust fields (status, verifiedAgainst)
// are untouched. Repos that 404 keep their last known count and are listed on
// stderr so the watch can re-check whether the entry moved or died.
//
// Usage: node scripts/stars.mjs        (needs GITHUB_TOKEN or gh auth)

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FILE = join(ROOT, "data", "plugins.json");
const data = JSON.parse(readFileSync(FILE, "utf8"));

const repos = [...new Set(data.plugins.map((p) => p.repo))];
const today = new Date().toISOString().slice(0, 10);
const counts = new Map();
const missing = [];

function gql(query) {
  const out = execFileSync("gh", ["api", "graphql", "-f", `query=${query}`, "--jq", "."], {
    encoding: "utf8", maxBuffer: 16 * 1024 * 1024,
  });
  return JSON.parse(out);
}

for (let i = 0; i < repos.length; i += 100) {
  const batch = repos.slice(i, i + 100);
  const fields = batch.map((slug, j) => {
    const [owner, name] = slug.split("/");
    return `r${j}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) { stargazerCount nameWithOwner }`;
  }).join("\n");
  let res;
  try {
    res = gql(`query {\n${fields}\n}`);
  } catch (err) {
    // gh exits non-zero when any alias errors, but still prints the partial data
    const text = String(err.stdout || "");
    const start = text.indexOf("{");
    if (start < 0) throw err;
    res = JSON.parse(text.slice(start));
  }
  batch.forEach((slug, j) => {
    const node = res.data?.[`r${j}`];
    if (node && typeof node.stargazerCount === "number") counts.set(slug, node.stargazerCount);
    else missing.push(slug);
  });
}

let touched = 0;
for (const p of data.plugins) {
  if (counts.has(p.repo)) {
    p.stars = counts.get(p.repo);
    p.starsUpdated = today;
    touched++;
  }
}

writeFileSync(FILE, `${JSON.stringify(data, null, 2)}\n`);
console.log(`stars: refreshed ${touched}/${data.plugins.length} entries (${repos.length} unique repos)`);
if (missing.length) {
  console.error(`stars: ${missing.length} repo(s) not found — moved or deleted, re-check the entries:`);
  for (const slug of missing) console.error(`  - ${slug}`);
}
