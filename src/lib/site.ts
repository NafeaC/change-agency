// ─────────────────────────────────────────────────────────────────────────────
// Central site configuration — contact details, links and SEO copy.
// Update values here and they propagate to the whole site, the <head> tags,
// the structured data (JSON-LD) and the generated sitemap.
// ─────────────────────────────────────────────────────────────────────────────

export type Language = "en" | "ar";

// Public production URL (no trailing slash). Override with VITE_SITE_URL.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://change.sa").replace(/\/$/, "");

export const CONTACT = {
  phone: "+966534060044",
  phoneDisplay: "+966 53 406 0044",
  whatsapp: "https://wa.me/966534060044",
  email: "info@change.sa",
  address: {
    en: "Hizam Road, Al-Madinah, Saudi Arabia",
    ar: "طريق الحزام، المدينة المنورة، المملكة العربية السعودية",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Change+Advertising+Agency+Madinah",
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/change.adv/",
  linkedin: "https://www.linkedin.com/company/change-adv",
};

// Company profile deck (used by the "Explore Services" button).
export const PROFILE_DECK_URL = "https://www.figma.com/deck/tvu603XFbQAHsmvger0szl";

export const LOGO_WHITE = "/ChangeLogoWhite_1776929556411.png";

// Path for each language version of the home page.
export const LANG_PATH: Record<Language, string> = { en: "/", ar: "/ar" };

export const SEO: Record<
  Language,
  { title: string; description: string; locale: string; ogImage: string; ogImageAlt: string }
> = {
  en: {
    title: "Change Agency | Advertising & Marketing Agency in Madinah, KSA",
    description:
      "Full-service advertising agency in Al-Madinah, Saudi Arabia since 2010. Branding, digital marketing, video production, photography, printing and exhibition booths for 700+ brands.",
    locale: "en_US",
    ogImage: "/og/og-en.jpg",
    ogImageAlt: "Change Advertising Agency — We build brands that grow",
  },
  ar: {
    title: "وكالة تشينج للإعلان | تسويق وهوية تجارية في المدينة المنورة",
    description:
      "وكالة إعلانية متكاملة في المدينة المنورة منذ 2010: هوية تجارية، تسويق رقمي، إنتاج فيديو وتصوير، طباعة وتنفيذ أجنحة المعارض. أكثر من 700 علامة تجارية وثقت بنا.",
    locale: "ar_SA",
    ogImage: "/og/og-ar.jpg",
    ogImageAlt: "وكالة تشينج للإعلان — نبني علامات تجارية تنمو",
  },
};
