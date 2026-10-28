// Builds the static site from src/ into public/.
// Each page in src/pages starts with a JSON block inside an HTML comment:
// <!--{"title":"...","path":"/x/","nav":"x","description":"..."}-->
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { buildTemplates } from "./templates.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const out = join(root, "public");

const SITE = {
  name: "Save the Hundon Plough",
  updated: "28 October 2026",
  email: "darrell.wilkins@gmail.com",
};

const NAV = [
  { key: "facts", href: "/what-has-happened/", label: "What has happened" },
  { key: "want", href: "/what-we-want/", label: "What we want" },
  { key: "why", href: "/why-it-matters/", label: "Why it matters" },
  { key: "rules", href: "/the-rules/", label: "The planning rules" },
  { key: "faq", href: "/questions/", label: "Questions" },
];

const layout = readFileSync(join(src, "partials", "layout.html"), "utf8");
const header = readFileSync(join(src, "partials", "header.html"), "utf8");
const footer = readFileSync(join(src, "partials", "footer.html"), "utf8");

function navHtml(current) {
  const items = NAV.map((n) => {
    const cur = n.key === current ? ' aria-current="page"' : "";
    return `<li><a href="${n.href}"${cur}>${n.label}</a></li>`;
  }).join("\n          ");
  const cur = current === "complain" ? ' aria-current="page"' : "";
  return `${items}\n          <li class="nav-cta"><a class="button button-small" href="/complaint/"${cur}>Make a complaint</a></li>`;
}

function fill(tpl, vars) {
  return tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : `{{${k}}}`));
}

const pages = readdirSync(join(src, "pages")).filter((f) => f.endsWith(".html"));
for (const file of pages) {
  const raw = readFileSync(join(src, "pages", file), "utf8");
  const m = raw.match(/^<!--\s*(\{[\s\S]*?\})\s*-->\s*/);
  if (!m) throw new Error(`No front matter in ${file}`);
  const meta = JSON.parse(m[1]);
  const body = raw.slice(m[0].length);
  const vars = {
    title: meta.path === "/" ? `${SITE.name}` : `${meta.title} - ${SITE.name}`,
    description: meta.description || "",
    bodyClass: meta.bodyClass || "",
    updated: meta.updated || SITE.updated,
    email: SITE.email,
  };
  vars.header = fill(header, { ...vars, nav: navHtml(meta.nav) });
  vars.footer = fill(footer, vars);
  vars.content = fill(body, vars);
  vars.scripts = (meta.scripts || []).map((s) => `<script src="${s}" defer></script>`).join("\n  ");
  const html = fill(layout, vars);
  let target;
  if (meta.path === "/") target = join(out, "index.html");
  else if (meta.path === "/404") target = join(out, "404.html");
  else target = join(out, meta.path.replace(/^\/|\/$/g, ""), "index.html");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
  console.log("built", meta.path);
}

try { buildTemplates(root); } catch (e) { console.warn("templates:", e.message); }
