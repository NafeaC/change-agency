import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[100dvh] flex flex-col px-6 pt-24 pb-10 noise-bg overflow-hidden bg-black text-white">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[55vw] h-[45vh] bg-accent/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vh] bg-accent/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 justify-between relative z-10">

        {/* — Headline — */}
        <div className="pt-4 sm:pt-6">
          {/*
            ── FONT SIZE ADJUSTMENT ──────────────────────────────────────────────
            Format:  clamp(MINIMUM, VIEWPORT-BASED, MAXIMUM)
            • MINIMUM  — smallest size on very small screens (< ~400 px wide)
            • VIEWPORT — scales with screen width (1 vw ≈ 1% of viewport width)
            • MAXIMUM  — caps the size on large monitors

            Current values (feel free to tune):
              clamp(2.2rem, 6.5vw, 7rem)

            Examples to try:
              Larger headline  →  clamp(2.6rem, 8vw,  9rem)
              Smaller headline →  clamp(1.8rem, 5vw,  6rem)
            ─────────────────────────────────────────────────────────────────────
          */}
          <h1
            className="font-bold tracking-tighter leading-[0.9] uppercase"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 7rem)" }}
          >
            {(["We Build", "Brands"] as const).map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
                >
                  {t(line, i === 0 ? "نبني" : "علامات تجارية")}
                </motion.span>
              </span>
            ))}

            {/*
              "that grow" — italic accent line.
              pb-3 gives extra room so the italic descenders on letters like
              "g" and "y" are never clipped by the overflow-hidden parent.
            */}
            <span className="block overflow-hidden pb-3 text-accent">
              <motion.span
                className="block italic font-light lowercase tracking-normal"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease }}
              >
                {t("that grow", "تنمو")}
              </motion.span>
            </span>
          </h1>

          {/* — Subtitle + CTA buttons — */}
          <motion.div
            className="mt-5 sm:mt-7 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
          >
            <p className="text-sm sm:text-base md:text-lg text-white/60 font-light leading-relaxed max-w-md">
              {t(
                "Strategic partner for ambitious businesses in Saudi Arabia. Branding, digital, production, execution — all under one roof since 2010.",
                "شريك استراتيجي للشركات الطموحة في المملكة. برندينج، تسويق رقمي، إنتاج، تنفيذ — كل شيء تحت سقف واحد منذ 2010."
              )}
            </p>

            <motion.div
              className="flex flex-row flex-wrap gap-3 shrink-0"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.78, ease }}
            >
              <a
                href="https://wa.me/966534060044"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-semibold text-sm hover:bg-accent hover:text-white transition-all duration-300"
              >
                {t("Start Your Project", "ابدأ مشروعك")}
                <Arrow className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/*
                ── EXPLORE SERVICES BUTTON ──────────────────────────────────────
                Currently links to the Change Agency services portfolio on Google Drive.
                To point it somewhere else, simply update the href value below.
                ─────────────────────────────────────────────────────────────────
              */}
              <a
                href="https://www.figma.com/deck/tvu603XFbQAHsmvger0szl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm border border-white/25 hover:border-white/70 transition-colors duration-300"
              >
                {t("Explore Services", "استكشف خدماتنا")}
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* — Stats row — pinned to the bottom of the section — */}
        <motion.div
          className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-6 mt-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease }}
        >
          {[
            { value: "700+", label: t("Clients", "عميل") },
            { value: "15+",  label: t("Years Experience", "سنة خبرة") },
            { value: "20+",  label: t("Long-term Partners", "شريك طويل الأمد") },
            { value: "5+",   label: t("Sectors", "قطاعات") },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 + i * 0.07, ease }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-white/40 text-xs sm:text-sm mt-1 font-light">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
