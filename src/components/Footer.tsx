import { Link } from "wouter";
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../hooks/useLanguage";
import { CONTACT, LOGO_WHITE, SOCIAL } from "@/lib/site";
import { navItems } from "./Nav";

export default function Footer() {
  const { t, language, altHref } = useLanguage();

  const services = [
    t("Branding & Identity", "الهوية التجارية"),
    t("Digital Marketing", "التسويق الرقمي"),
    t("Video Production", "إنتاج الفيديو"),
    t("Photography", "التصوير الاحترافي"),
    t("Printing & Signage", "الطباعة واللوحات"),
    t("Exhibition Booths", "أجنحة المعارض"),
  ];

  const socials = [
    { icon: FaInstagram, href: SOCIAL.instagram, label: "Instagram" },
    { icon: FaLinkedinIn, href: SOCIAL.linkedin, label: "LinkedIn" },
    { icon: FaWhatsapp, href: CONTACT.whatsapp, label: "WhatsApp" },
  ];

  const heading = "font-bold text-white/40 uppercase tracking-widest text-xs mb-5";
  const link = "text-white/75 hover:text-accent transition-colors";

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-2 md:col-span-4">
            <img src={LOGO_WHITE} alt={t("Change Advertising Agency", "وكالة تشينج للإعلان")} width={170} height={40} loading="lazy" className="h-10 w-auto" />
            <p className="mt-5 text-white/55 font-light leading-relaxed max-w-xs">
              {t(
                "Full-service advertising agency in Al-Madinah, Saudi Arabia. Your strategic marketing partner since 2010.",
                "وكالة إعلانية متكاملة في المدينة المنورة. شريكك التسويقي الاستراتيجي منذ 2010."
              )}
            </p>
            <ul className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-black transition-colors"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t("Footer", "روابط التذييل")} className="md:col-span-2">
            <h2 className={heading}>{t("Explore", "تصفح")}</h2>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={link}>
                    {language === "en" ? item.en : item.ar}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className={heading}>{t("Services", "الخدمات")}</h2>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className={link}>{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <address className="col-span-2 md:col-span-3 not-italic">
            <h2 className={heading}>{t("Get in Touch", "تواصل")}</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone}`} className={link}>
                  <bdi dir="ltr">{CONTACT.phoneDisplay}</bdi>
                </a>
              </li>
              <li>
                <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  {CONTACT.address[language]}
                </a>
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm font-light">
          <p>
            {t(
              `© ${new Date().getFullYear()} Change Advertising Agency. All rights reserved.`,
              `© ${new Date().getFullYear()} وكالة تشينج للإعلان. جميع الحقوق محفوظة.`
            )}
          </p>
          <Link href={altHref} hrefLang={language === "en" ? "ar" : "en"} className="hover:text-white transition-colors">
            {language === "en" ? "النسخة العربية" : "English version"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
