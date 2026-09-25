import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "@/lib/site";

const LogoMark3D = lazy(() => import("./three/LogoMark3D"));

// Mounts the 3D brand mark once the section approaches the viewport.
function BrandMark() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShow(true), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="w-full h-full">
      {show ? (
        <Suspense fallback={null}>
          <LogoMark3D />
        </Suspense>
      ) : (
        <img src="/favicon.svg" alt="" className="w-1/2 h-1/2 m-auto mt-[25%] opacity-30 brightness-0" />
      )}
    </div>
  );
}

export default function CTA() {
  const { t, dir, language } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const channels = [
    { icon: Phone, label: t("Call us", "اتصل بنا"), value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}`, ltr: true },
    { icon: Mail, label: t("Email", "البريد الإلكتروني"), value: CONTACT.email, href: `mailto:${CONTACT.email}`, ltr: true },
    { icon: MapPin, label: t("Visit us", "زورونا"), value: CONTACT.address[language], href: CONTACT.mapsUrl, external: true },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-accent text-black relative overflow-hidden">
      <div className="absolute -top-40 -end-40 w-[32rem] h-[32rem] bg-white/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -start-40 w-[32rem] h-[32rem] bg-black/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] mb-5">
              <span className="h-px w-8 bg-black" />
              {t("Contact", "تواصل معنا")}
            </p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl rtl:xl:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
              {t("Ready to Build", "جاهز لبناء")}
              <br />
              <span className="italic font-light lowercase tracking-normal">
                {t("your brand right?", "علامتك بالشكل الصحيح؟")}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="hidden md:block w-56 h-56 lg:w-64 lg:h-64 -mt-6 mb-2 -ms-6">
              <BrandMark />
            </div>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-black/75">
              {t(
                "No templates. No guesswork. Just a real conversation to understand your business and map the first step together.",
                "لا قوالب جاهزة ولا تخمين. مجرد حوار حقيقي لفهم نشاطك ورسم الخطوة الأولى معًا."
              )}
            </p>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 bg-black text-white ps-6 pe-7 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-colors duration-300"
            >
              <FaWhatsapp className="w-6 h-6 text-[#25D366]" aria-hidden="true" />
              {t("Chat on WhatsApp", "تواصل عبر واتساب")}
              <Arrow className="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {channels.map(({ icon: Icon, label, value, href, ltr, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center gap-4 h-full rounded-2xl bg-black/[0.07] hover:bg-black hover:text-white p-5 md:p-6 transition-colors duration-300"
              >
                <span className="w-12 h-12 shrink-0 rounded-full bg-black text-accent group-hover:bg-accent group-hover:text-black flex items-center justify-center transition-colors duration-300">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-widest opacity-60">{label}</span>
                  <span className="block font-bold mt-0.5 leading-snug">
                    {ltr ? <bdi dir="ltr">{value}</bdi> : value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
