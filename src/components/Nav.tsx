import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import logoWhite from "@assets/ChangeLogoWhite_1776929556411.png";

// Nav items mapped to their matching section IDs on the page.
// "Work" and "Process" were removed — no corresponding sections exist.
const navItems = [
  { en: "About",      ar: "من نحن",       id: "about"    },
  { en: "Services",   ar: "خدماتنا",      id: "services" },
  { en: "Why Change", ar: "لماذا تشينج؟", id: "why"      },
  { en: "Contact",    ar: "تواصل معنا",   id: "contact"  },
];

export default function Nav() {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 w-full transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="shrink-0">
        <img src={logoWhite} alt="Change Advertising Agency" className="h-9 w-auto" />
      </button>

      <div className="flex items-center gap-6 md:gap-8 text-sm font-medium text-white">
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="relative group overflow-hidden h-5 whitespace-nowrap"
              onClick={() => scrollTo(item.id)}
            >
              {/* Slide-up hover animation */}
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                {language === "en" ? item.en : item.ar}
              </span>
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-accent">
                {language === "en" ? item.en : item.ar}
              </span>
            </button>
          ))}
        </div>

        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          className="w-10 h-10 rounded-full border border-white/30 text-white flex items-center justify-center text-xs font-bold hover:bg-white hover:text-black transition-colors duration-300 shrink-0"
        >
          {language === "en" ? "AR" : "EN"}
        </button>
      </div>
    </nav>
  );
}
