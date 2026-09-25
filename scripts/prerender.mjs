// Prerenders every public route to static HTML after `vite build`, so search
// engines and link previews (WhatsApp, X, LinkedIn…) get real content and the
// correct per-language <head>. Also writes sitemap.xml and robots.txt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, SITE_URL, LANG_PATH } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

function page(url, { noindex = false } = {}) {
  const { html, head, lang, dir } = render(url);
  return template
    .replace('<html lang="en" dir="ltr">', `<html lang="${lang}" dir="${dir}">`)
    .replace("<!--app-head-->", noindex ? '<meta name="robots" content="noindex">\n    <title>404 — Page not found | Change Advertising Agency</title>' : head)
    .replace("<!--app-html-->", html);
}

const routes = Object.values(LANG_PATH);
for (const url of routes) {
  const file = path.join(dist, url === "/" ? "index.html" : `${url.slice(1)}/index.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(url));
  console.log(`prerendered ${url} -> ${path.relative(root, file)}`);
}

fs.writeFileSync(path.join(dist, "404.html"), page("/404", { noindex: true }));
console.log("prerendered 404.html");

// sitemap.xml with hreflang alternates for each language version
const today = new Date().toISOString().slice(0, 10);
const loc = (p) => `${SITE_URL}${p}`;
const alternates = [
  ...Object.entries(LANG_PATH).map(
    ([lang, p]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${loc(p)}"/>`,
  ),
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(LANG_PATH.en)}"/>`,
].join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (p) => `  <url>
    <loc>${loc(p)}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`,
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);
console.log("wrote sitemap.xml and robots.txt");

fs.rmSync(ssrDir, { recursive: true, force: true });
