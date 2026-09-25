import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

// A word that brightens as the scroll progress passes through its slot.
function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent?: boolean }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-accent" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

// Text that lights up word by word while it scrolls through the viewport.
function ScrollRevealText({ text, accentWords = 0, as = "p", className = "" }: { text: string; accentWords?: number; as?: "h2" | "p"; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  const Tag = as === "h2" ? motion.h2 : motion.p;
  return (
    <Tag ref={ref as never} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={i < accentWords}>
          {w}
        </Word>
      ))}
    </Tag>
  );
}

export default function About() {
  const { t } = useLanguage();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const pillars = [
    t("Strategy before execution", "الاستراتيجية قبل التنفيذ"),
    t("Decisions backed by data", "قرارات مبنية على البيانات"),
    t("Deep local market insight", "فهم عميق للسوق المحلي"),
    t("Creativity measured by results", "إبداع يُقاس بالنتائج"),
  ];

  return (
    <section id="about" className="py-24 md:py-36 px-6 bg-white text-black overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent-ink mb-8"
        >
          <span className="h-px w-8 bg-accent-ink" />
          {t("About Change", "من نحن")}
        </motion.p>

        {/* One statement, revealed word by word on scroll */}
        <ScrollRevealText
          as="h2"
          accentWords={t("We think business,", "نفكر بعقلية الأعمال،").split(" ").length}
          text={t(
            "We think business, not just marketing — a full-service agency from Al-Madinah helping brands across the Kingdom grow since 2010.",
            "نفكر بعقلية الأعمال، لا التسويق فقط — وكالة متكاملة من المدينة المنورة تساعد العلامات في أنحاء المملكة على النمو منذ 2010."
          )}
          className="max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
        />

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image with clip reveal + parallax */}
          <motion.div
            ref={imgRef}
            initial={{ clipPath: "inset(12% 12% 12% 12% round 28px)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative aspect-[16/11] overflow-hidden rounded-[28px]"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 start-6 end-6 flex items-end justify-between gap-4 text-white">
              <p className="text-lg sm:text-2xl font-bold">{t("Rooted in Al-Madinah", "من قلب المدينة المنورة")}</p>
              <span className="shrink-0 rounded-full bg-accent text-black text-xs font-bold px-3 py-1.5">
                {t("Since 2010", "منذ 2010")}
              </span>
            </div>
          </motion.div>

          {/* Four pillars, one line each */}
          <ol className="lg:col-span-5">
            {pillars.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex items-center gap-5 py-6 border-b border-black/10"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-1px] inset-x-0 h-px bg-accent origin-left rtl:origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
                <span className="font-mono text-sm text-accent-ink w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg md:text-xl font-semibold group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300">
                  {p}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
