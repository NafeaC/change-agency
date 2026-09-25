// Build-time entry used by scripts/prerender.mjs to generate static HTML.
import { renderToString } from "react-dom/server";
import App from "./App";
import { headHtml } from "./lib/seo";
import { languageFromPath } from "./hooks/useLanguage";
import { SITE_URL, LANG_PATH } from "./lib/site";

export function render(url: string) {
  const lang = languageFromPath(url);
  return {
    lang,
    dir: lang === "ar" ? "rtl" : "ltr",
    html: renderToString(<App ssrPath={url} />),
    head: headHtml(lang),
  };
}

export { SITE_URL, LANG_PATH };
