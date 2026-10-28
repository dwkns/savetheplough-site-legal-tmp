// Turns content/complaint-templates.md into public/js/templates.js
// so the review copy of the complaint form can show real draft text.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const KEYS = [
  ["describe", /^Describe the change of use/i],
  ["resolve", /^Have you tried to resolve/i],
  ["harm", /^What harm/i],
  ["healthSafety", /^If an officer visits/i],
  ["why", /^Why are you making/i],
  ["details", /^Details/i],
];

export function buildTemplates(root) {
  const md = readFileSync(join(root, "content", "complaint-templates.md"), "utf8");
  const parts = md.split(/^## Template (\d+): (.+)$/m);
  const out = [];
  for (let i = 1; i < parts.length; i += 3) {
    const id = Number(parts[i]);
    const label = parts[i + 1].trim();
    const body = parts[i + 2];
    const t = { id, label };
    const sections = body.split(/^### (.+)$/m);
    for (let j = 1; j < sections.length; j += 2) {
      const heading = sections[j].trim();
      const text = sections[j + 1]
        .replace(/^---\s*$/gm, "")
        .trim()
        .split(/\n{2,}/)
        .map((p) => p.replace(/\n/g, " ").trim())
        .join("\n\n");
      const key = KEYS.find(([, re]) => re.test(heading));
      if (key) t[key[0]] = text;
    }
    for (const [k] of KEYS) if (!t[k]) throw new Error(`Template ${id} is missing ${k}`);
    out.push(t);
  }
  if (out.length !== 30) throw new Error(`Expected 30 templates, found ${out.length}`);
  writeFileSync(
    join(root, "public", "js", "templates.js"),
    "// Generated from content/complaint-templates.md. Do not edit by hand.\nwindow.COMPLAINT_TEMPLATES = " +
      JSON.stringify(out, null, 1) +
      ";\n"
  );
  console.log("built templates.js with", out.length, "templates");
}
