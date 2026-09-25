import { createContext, useContext, useEffect, ReactNode } from "react";
import { useLocation } from "wouter";
import { LANG_PATH, type Language } from "@/lib/site";
import { applyHead } from "@/lib/seo";

interface LanguageContextType {
  language: Language;
  t: (en: string, ar: string) => string;
  dir: "ltr" | "rtl";
  // URL of the same page in the other language (used by the language switch).
  altHref: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languageFromPath = (path: string): Language =>
  path === "/ar" || path.startsWith("/ar/") ? "ar" : "en";

// The language lives in the URL ("/" = English, "/ar" = Arabic) so each
// version is a separate, indexable page for search engines.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const language = languageFromPath(location);
  const dir = language === "ar" ? "rtl" : "ltr";

  const isPage = Object.values(LANG_PATH).includes(location);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    if (isPage) applyHead(language);
  }, [language, dir, isPage]);

  const t = (en: string, ar: string) => (language === "en" ? en : ar);
  const altHref = LANG_PATH[language === "en" ? "ar" : "en"];

  return (
    <LanguageContext.Provider value={{ language, t, dir, altHref }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
