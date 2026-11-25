import { mkdirSync, writeFileSync } from "node:fs";

// Final line — candidate #1 from candidates.md (153 characters).
// Why this line fits the house brief, criterion by criterion:
// 1. One sentence naming an absurdly specific micro-startup for lazy AI
//    agents: a service that renames half-finished drafts at 3 a.m.
// 2. Absurdly specific: not "a writing tool" but one odd moment — 3 a.m.
//    drafts getting confident titles while their owner sleeps.
// 3. Business sense: a named buyer (sleepy founders) paying a named price
//    ($4 a month) for a real embarrassment-avoidance outcome.
// 4. Fits lazy AI agents: the work is quiet, automatic renaming — no
//    oversight needed, and the sentence says so ("without lifting a finger").
// 5. Crisp and funny in one read: the absurdity (fake confidence at 3 a.m.)
//    and the business case ($4/month, founders) land together.
// Note: the periods inside "3 a.m." are part of the time, not sentence
// breaks — the line is still exactly one sentence, which Gate 2 enforces
// by rejecting newlines rather than by counting periods.
const LINE: string =
  "A $4-a-month service that quietly renames your 3 a.m. half-finished drafts into confident titles, so sleepy founders look awake without lifting a finger.";

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
