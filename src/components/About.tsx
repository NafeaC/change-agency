import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, BarChart3, MapPinned, Sparkles } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

const ease = [0.16, 1, 0.3, 1] as const;

// A heading line that slides up from behind a mask. The parent heading
// triggers it (the clipped line itself never registers as in view).
function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.9, delay, ease } } }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function About() {
  const { t } = useLanguage();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const pillars = [
    { icon: Target, label: t("Strategy first", "الاستراتيجية أولًا") },
    { icon: BarChart3, label: t("Data-driven", "قرارات بالبيانات") },
    { icon: MapPinned, label: t("Local insight", "فهم للسوق المحلي") },
    { icon: Sparkles, label: t("Results-led creativity", "إبداع بنتائج") },
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
        {/* Copy */}
        <div className="lg:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent-ink mb-6"
          >
            <span className="h-px w-8 bg-accent-ink" />
            {t("About Change", "من نحن")}
          </motion.p>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]"
          >
            <RevealLine>{t("We think business,", "نفكر بعقلية الأعمال،")}</RevealLine>
            <RevealLine delay={0.12} className="text-accent">
              {t("not just marketing.", "لا التسويق فقط.")}
            </RevealLine>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-6 text-lg text-black/65 font-light leading-relaxed max-w-lg"
          >
            {t(
              "A full-service agency from Al-Madinah. Since 2010 we have helped brands across the Kingdom grow with strategy built on market reality, not guesswork.",
              "وكالة متكاملة من المدينة المنورة. منذ 2010 نساعد العلامات في أنحاء المملكة على النمو باستراتيجية مبنية على واقع السوق، لا على التخمين."
            )}
          </motion.p>

          <ul className="mt-10 grid grid-cols-2 gap-3 max-w-lg">
            {pillars.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease }}
                className="group flex items-center gap-3 rounded-2xl bg-neutral-100 px-4 py-3.5 hover:bg-black hover:text-white transition-colors duration-300"
              >
                <span className="w-9 h-9 shrink-0 rounded-xl bg-white text-accent-ink group-hover:bg-accent group-hover:text-black flex items-center justify-center transition-colors duration-300">
                  <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold leading-tight">{label}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Image: clip reveal + parallax, with a floating badge */}
        <div className="lg:col-span-6 relative">
          <motion.div
            ref={imgRef}
            initial={{ clipPath: "inset(10% 10% 10% 10% round 28px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease }}
            className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] overflow-hidden rounded-[28px]"
          >
            <motion.img
              style={{ y: imgY }}
              src="/about/madinah.jpg"
              alt={t("Al-Masjid an-Nabawi in Al-Madinah, home of Change Agency", "المسجد النبوي في المدينة المنورة، مقر وكالة تشينج")}
              width={1400}
              height={1050}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-[116%] -top-[8%] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <p className="absolute bottom-6 start-6 text-white text-lg sm:text-xl font-bold">
              {t("Rooted in Al-Madinah", "من قلب المدينة المنورة")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="absolute -bottom-6 end-4 sm:end-6 lg:-end-6 rounded-2xl bg-black text-white px-6 py-5 shadow-2xl shadow-black/30"
          >
            <p className="text-3xl font-bold text-accent">
              <bdi dir="ltr">2010</bdi>
            </p>
            <p className="text-xs text-white/60 mt-1">{t("Building brands since", "نبني العلامات منذ")}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
