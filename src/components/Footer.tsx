import { useLanguage } from "../hooks/useLanguage";

// Footer links mapped to their matching section IDs on the page.
const footerLinks: { en: string; ar: string; id: string }[] = [
  { en: "About",    ar: "من نحن",   id: "about"    },
  { en: "Services", ar: "خدماتنا",  id: "services" },
  { en: "Work",     ar: "أعمالنا",  id: "work"     },
  { en: "Contact",  ar: "تواصل معنا", id: "contact" },
];

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white py-20 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <img src="/ChangeLogoWhite_1776929556411.png" alt="Change Advertising Agency" className="h-10 w-auto mb-4" />
            <p className="text-white/60 font-light text-lg">
              {t("Strategic marketing partner since 2010", "شريكك التسويقي الاستراتيجي منذ 2010")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24 w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white/50 uppercase tracking-widest text-sm mb-2">{t("Links", "روابط")}</h4>
              {footerLinks.map(link => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-start hover:text-accent transition-colors font-medium"
                >
                  {t(link.en, link.ar)}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white/50 uppercase tracking-widest text-sm mb-2">{t("Social", "منصاتنا")}</h4>
              <a href="https://www.instagram.com/change.adv/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium">
                Instagram
              </a>
              <a href="https://www.linkedin.com/company/change-adv" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium">
                LinkedIn
              </a>
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <h4 className="font-bold text-white/50 uppercase tracking-widest text-sm mb-2">{t("Contact", "تواصل")}</h4>
              <a href="mailto:info@change.sa" className="hover:text-accent transition-colors font-medium">info@change.sa</a>
              <a href="tel:+966534060044" className="hover:text-accent transition-colors font-medium" dir="ltr">+966 53 406 0044</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm font-light">
          <p>
            {t(
              `© ${new Date().getFullYear()} Change Advertising Agency. All Rights Reserved.`,
              `© ${new Date().getFullYear()} وكالة تشينج للإعلان. جميع الحقوق محفوظة.`
            )}
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{t("Privacy Policy", "سياسة الخصوصية")}</a>
            <a href="#" className="hover:text-white transition-colors">{t("Terms of Service", "شروط الخدمة")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
