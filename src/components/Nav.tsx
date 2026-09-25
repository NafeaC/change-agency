import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { CONTACT, LOGO_WHITE } from "@/lib/site";

// Nav items mapped to their matching section IDs on the page.
export const navItems = [
  { en: "About",      ar: "من نحن",       id: "about"    },
  { en: "Services",   ar: "خدماتنا",      id: "services" },
  { en: "Work",       ar: "أعمالنا",      id: "work"     },
  { en: "Why Change", ar: "لماذا تشينج؟", id: "why"      },
  { en: "FAQ",        ar: "الأسئلة الشائعة", id: "faq"   },
];

function LanguageSwitch({ className = "" }: { className?: string }) {
  const { language, altHref } = useLanguage();
  return (
    <Link
      href={altHref}
      hrefLang={language === "en" ? "ar" : "en"}
      aria-label={language === "en" ? "العربية" : "English"}
      className={`h-10 ps-1.5 pe-3 rounded-full border border-white/25 text-white flex items-center gap-2 text-xs font-bold hover:bg-white hover:text-black transition-colors duration-300 shrink-0 ${className}`}
    >
      <img
        src={language === "en" ? "/flags/sa.svg" : "/flags/us.svg"}
        alt=""
        width={24}
        height={18}
        className="w-6 h-[18px] rounded-[3px] object-cover ring-1 ring-white/30"
      />
      {language === "en" ? "عربي" : "EN"}
    </Link>
  );
}

export default function Nav() {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-black/85 backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        aria-label={t("Main", "القائمة الرئيسية")}
        className="max-w-7xl mx-auto flex justify-between items-center px-6 h-[4.5rem]"
      >
        {/* Logo */}
        <a href="#top" className="shrink-0" onClick={() => setOpen(false)}>
          <img
            src={LOGO_WHITE}
            alt={t("Change Advertising Agency — Home", "وكالة تشينج للإعلان — الرئيسية")}
            width={153}
            height={36}
            className="h-8 sm:h-9 w-auto"
          />
        </a>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-white">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="relative group block overflow-hidden h-5 whitespace-nowrap">
                {/* Slide-up hover animation */}
                <span className="block group-hover:-translate-y-full transition-transform duration-300">
                  {language === "en" ? item.en : item.ar}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-accent"
                >
                  {language === "en" ? item.en : item.ar}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitch className="hidden sm:flex" />
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-accent text-black text-sm font-bold hover:bg-white transition-colors duration-300"
          >
            {t("Let's Talk", "تواصل معنا")}
            <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("Close menu", "إغلاق القائمة") : t("Open menu", "فتح القائمة")}
            className="lg:hidden w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="lg:hidden h-[calc(100dvh-4.5rem)] overflow-y-auto bg-black text-white px-6 pb-10"
      >
        <ul className="flex flex-col pt-4">
          {navItems.map((item, i) => (
            <li key={item.id} className="border-b border-white/10">
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 text-2xl font-bold uppercase tracking-tight hover:text-accent transition-colors"
              >
                {language === "en" ? item.en : item.ar}
                <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="h-12 rounded-full bg-accent text-black font-bold flex items-center justify-center"
          >
            {t("Let's Talk", "تواصل معنا")}
          </a>
          <div className="flex items-center justify-between gap-3">
            <LanguageSwitch />
            <a href={`tel:${CONTACT.phone}`} dir="ltr" className="text-white/60 text-sm">
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
