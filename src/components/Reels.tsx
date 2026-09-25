import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Volume2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import SectionHeading from "./SectionHeading";
import Tilt from "./Tilt";

// ─────────────────────────────────────────────────────────────────────────────
// REELS — vertical videos produced by Change.
// To add one: put the .mp4 (9:16) and a .jpg poster in public/videos/ and add
// an entry below.
// ─────────────────────────────────────────────────────────────────────────────
type L = { en: string; ar: string };
type Reel = { src: string; poster: string; client: L; type: L };

const REELS: Reel[] = [
  { src: "/videos/le-royal.mp4", poster: "/videos/le-royal.jpg", client: { en: "Le Royal", ar: "لو رويال" }, type: { en: "Fashion Product Film", ar: "فيلم منتج — أزياء" } },
  { src: "/videos/havens-sweets.mp4", poster: "/videos/havens-sweets.jpg", client: { en: "Havens Sweets", ar: "Havens Sweets" }, type: { en: "Food Reel", ar: "ريل أطعمة" } },
  { src: "/videos/diviso-majlis.mp4", poster: "/videos/diviso-majlis.jpg", client: { en: "Diviso Majlis", ar: "مجلس ديفيزو" }, type: { en: "Coffee & Hospitality", ar: "قهوة وضيافة" } },
  { src: "/videos/dave.mp4", poster: "/videos/dave.jpg", client: { en: "DAVE", ar: "DAVE" }, type: { en: "Lifestyle Campaign", ar: "حملة لايف ستايل" } },
  { src: "/videos/pizza-production.mp4", poster: "/videos/pizza-production.jpg", client: { en: "Pizza Production", ar: "إنتاج مطعم بيتزا" }, type: { en: "Behind the Scenes", ar: "كواليس الإنتاج" } },
];

// Plays muted while on screen, pauses otherwise.
function AutoVideo({ reel, label }: { reel: Reel; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={reel.src}
      poster={reel.poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
}

export default function Reels() {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState<Reel | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="reels" className="relative py-24 md:py-32 bg-[#070605] text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-accent/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
          <SectionHeading
            eyebrow={t("Production · Reels", "الإنتاج · ريلز")}
            title={
              <>
                {t("Content That", "محتوى")}{" "}
                <span className="text-accent">{t("Stops the Scroll", "يوقف التمرير")}</span>
              </>
            }
          />
          <p className="text-white/60 font-light text-base md:text-lg max-w-sm leading-relaxed">
            {t(
              "Concept, shoot and edit — short-form films built to perform on Instagram, TikTok and Snapchat.",
              "فكرة، تصوير ومونتاج — أفلام قصيرة مصممة لتحقق أثرها على إنستغرام وتيك توك وسناب شات."
            )}
          </p>
        </div>
      </div>

      {/* Reel rail: scrolls horizontally on small screens, staggered row on desktop */}
      <div className="relative">
        <ul className="flex lg:grid lg:grid-cols-5 gap-4 lg:gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] pb-6 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {REELS.map((reel, i) => (
            <motion.li
              key={reel.src}
              initial={{ opacity: 0, y: 60, rotateX: 18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={`shrink-0 w-[68vw] sm:w-[42vw] lg:w-auto snap-center ${i % 2 === 1 ? "lg:mt-16" : ""}`}
              style={{ transformPerspective: 1200 }}
            >
              <Tilt max={8}>
                <button
                  type="button"
                  onClick={() => setOpen(reel)}
                  className="group relative block w-full aspect-[9/16] rounded-[1.75rem] overflow-hidden bg-neutral-900 ring-1 ring-white/10 hover:ring-accent/70 transition-[box-shadow,ring-color] duration-500 shadow-2xl shadow-black/60 text-start"
                  aria-label={`${t("Play", "تشغيل")} — ${reel.client[language]}`}
                >
                  <AutoVideo reel={reel} label={`${reel.client[language]} — ${reel.type[language]}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/30" />
                  {/* top bar */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {t("Reel", "ريل")}
                    </span>
                    <span className="text-[11px] font-bold text-white/60">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  {/* play */}
                  <span className="absolute top-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent text-black flex items-center justify-center scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_40px_rgb(245_166_35/0.6)]">
                    <Play className="w-6 h-6 fill-current ms-0.5" />
                  </span>
                  {/* caption */}
                  <span className="absolute bottom-0 inset-x-0 p-5">
                    <span className="block text-[11px] uppercase tracking-widest text-accent font-bold">{reel.type[language]}</span>
                    <span className="block font-display text-lg font-bold mt-1">{reel.client[language]}</span>
                  </span>
                </button>
              </Tilt>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Lightbox with sound */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={open.client[language]}
            className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40, rotateX: 12 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
              className="relative h-[86vh] max-h-[860px] aspect-[9/16] max-w-full rounded-[2rem] overflow-hidden ring-1 ring-white/15 shadow-[0_0_80px_rgb(245_166_35/0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <video src={open.src} poster={open.poster} autoPlay controls playsInline className="w-full h-full object-cover bg-black" />
            </motion.div>
            <div className="absolute top-5 inset-x-5 flex items-center justify-between text-white pointer-events-none">
              <p className="flex items-center gap-2 text-sm">
                <Volume2 className="w-4 h-4 text-accent" />
                <span className="font-bold">{open.client[language]}</span>
                <span className="text-white/50">· {open.type[language]}</span>
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label={t("Close", "إغلاق")}
                className="pointer-events-auto w-11 h-11 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
