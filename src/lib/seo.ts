import { CONTACT, LANG_PATH, LOGO_WHITE, SEO, SITE_URL, SOCIAL, type Language } from "./site";
import { FAQ } from "@/content/faq";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

type Tag =
  | { tag: "meta"; attrs: Record<string, string> }
  | { tag: "link"; attrs: Record<string, string> };

export function headTags(lang: Language): { title: string; tags: Tag[]; jsonLd: object } {
  const seo = SEO[lang];
  const other: Language = lang === "en" ? "ar" : "en";
  const url = abs(LANG_PATH[lang]);

  const tags: Tag[] = [
    { tag: "meta", attrs: { name: "description", content: seo.description } },
    { tag: "meta", attrs: { name: "robots", content: "index, follow, max-image-preview:large" } },
    { tag: "link", attrs: { rel: "canonical", href: url } },
    { tag: "link", attrs: { rel: "alternate", hreflang: "en", href: abs(LANG_PATH.en) } },
    { tag: "link", attrs: { rel: "alternate", hreflang: "ar", href: abs(LANG_PATH.ar) } },
    { tag: "link", attrs: { rel: "alternate", hreflang: "x-default", href: abs(LANG_PATH.en) } },

    { tag: "meta", attrs: { property: "og:type", content: "website" } },
    { tag: "meta", attrs: { property: "og:site_name", content: lang === "en" ? "Change Advertising Agency" : "وكالة تشينج للإعلان" } },
    { tag: "meta", attrs: { property: "og:title", content: seo.title } },
    { tag: "meta", attrs: { property: "og:description", content: seo.description } },
    { tag: "meta", attrs: { property: "og:url", content: url } },
    { tag: "meta", attrs: { property: "og:locale", content: seo.locale } },
    { tag: "meta", attrs: { property: "og:locale:alternate", content: SEO[other].locale } },
    { tag: "meta", attrs: { property: "og:image", content: abs(seo.ogImage) } },
    { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
    { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
    { tag: "meta", attrs: { property: "og:image:alt", content: seo.ogImageAlt } },

    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: seo.title } },
    { tag: "meta", attrs: { name: "twitter:description", content: seo.description } },
    { tag: "meta", attrs: { name: "twitter:image", content: abs(seo.ogImage) } },
  ];

  return { title: seo.title, tags, jsonLd: structuredData(lang) };
}

function structuredData(lang: Language) {
  const orgId = `${SITE_URL}/#organization`;
  const url = abs(LANG_PATH[lang]);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": orgId,
        name: "Change Advertising Agency",
        alternateName: ["Change Agency", "وكالة تشينج للإعلان", "تشينج"],
        description: SEO[lang].description,
        url: abs("/"),
        logo: abs(LOGO_WHITE),
        image: abs(SEO[lang].ogImage),
        email: CONTACT.email,
        telephone: CONTACT.phone,
        foundingDate: "2010",
        address: {
          "@type": "PostalAddress",
          streetAddress: lang === "en" ? "Hizam Road" : "طريق الحزام",
          addressLocality: lang === "en" ? "Al-Madinah" : "المدينة المنورة",
          addressRegion: lang === "en" ? "Al-Madinah Province" : "منطقة المدينة المنورة",
          addressCountry: "SA",
        },
        areaServed: { "@type": "Country", name: "Saudi Arabia" },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: CONTACT.phone,
          email: CONTACT.email,
          contactType: "customer service",
          availableLanguage: ["Arabic", "English"],
        },
        sameAs: [SOCIAL.instagram, SOCIAL.linkedin],
        knowsAbout: [
          "Branding",
          "Brand Identity",
          "Digital Marketing",
          "Advertising Campaigns",
          "Video Production",
          "Photography",
          "Content Creation",
          "Printing",
          "Signage",
          "Exhibition Booths",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: abs("/"),
        name: "Change Advertising Agency",
        inLanguage: ["en", "ar"],
        publisher: { "@id": orgId },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: SEO[lang].title,
        description: SEO[lang].description,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": orgId },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q[lang],
          acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
        })),
      },
    ],
  };
}

// ── Server side: serialise the head for the prerendered HTML ────────────────
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function headHtml(lang: Language): string {
  const { title, tags, jsonLd } = headTags(lang);
  const lines = [`<title>${esc(title)}</title>`];
  for (const t of tags) {
    const attrs = Object.entries(t.attrs)
      .map(([k, v]) => `${k}="${esc(v)}"`)
      .join(" ");
    lines.push(`<${t.tag} ${attrs} data-seo>`);
  }
  lines.push(
    `<script type="application/ld+json" data-seo>${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  );
  return lines.join("\n    ");
}

// ── Client side: keep the head in sync when the language changes ───────────
export function applyHead(lang: Language) {
  const { title, tags, jsonLd } = headTags(lang);
  document.title = title;
  document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
  for (const t of tags) {
    const el = document.createElement(t.tag);
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v);
    el.setAttribute("data-seo", "");
    document.head.appendChild(el);
  }
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-seo", "");
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);
}
