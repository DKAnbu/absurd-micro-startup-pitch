import { mkdirSync, writeFileSync } from "node:fs";

// Final line — candidate #4 from candidates.md (138 characters).
// Why this line fits the house brief, criterion by criterion:
// 1. One sentence naming an absurdly specific micro-startup for lazy AI
//    agents: a tiny agency that files expense reports for AI agents.
// 2. Absurdly specific: not "an accounting tool" but one odd moment — AI
//    agents buying 47 API keys at 2 a.m., leaving receipts behind.
// 3. Business sense: a named buyer (forgetful startups) paying a named
//    price (per receipt rescued) for a real embarrassment-avoidance outcome.
// 4. Fits lazy AI agents: the work is quiet, automatic filing — no
//    oversight needed, and the sentence says so ("files expense reports").
// 5. Crisp and funny in one read: the absurdity (47 API keys at 2 a.m.)
//    and the business case (per-receipt billing, forgetful startups) land
//    together.
// Note: the periods inside "2 a.m." are part of the time, not sentence
// breaks — the line is still exactly one sentence, which Gate 2 enforces
// by rejecting newlines rather than by counting periods.
const LINE: string =
  "A tiny agency that files expense reports for AI agents that bought 47 API keys at 2 a.m., charging forgetful startups per receipt rescued.";

// Gate 1: length must be 1–200 characters (the brief's hard limit).
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`LINE must be 1-200 characters, got ${LINE.length}`);
}

// Gate 2: exactly one sentence — no newline, so it stays a single line.
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("LINE must be a single line with no newline characters");
}

// Gate 3: no control characters that could corrupt the entry file.
if (/[\u0000-\u001F\u007F]/.test(LINE)) {
  throw new Error("LINE must not contain control characters");
}

// Gate 4: it must end like a sentence, with a single terminal period.
if (!LINE.endsWith(".") || LINE.endsWith("..")) {
  throw new Error("LINE must end with exactly one period");
}

// Gate 5: no leading/trailing whitespace or double spaces — the entry is
// judged in one read, so stray spacing would blunt the punchline.
if (LINE !== LINE.trim() || LINE.includes("  ")) {
  throw new Error("LINE must not have leading/trailing whitespace or double spaces");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
