import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../hooks/useLanguage";
import { CONTACT } from "@/lib/site";

// Floating WhatsApp button — appears once the visitor scrolls past the hero.
export default function WhatsAppFab() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("Chat with us on WhatsApp", "تواصل معنا عبر واتساب")}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 end-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-black/25 hover:scale-110 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <FaWhatsapp className="w-7 h-7" aria-hidden="true" />
    </a>
  );
}
