import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft, Play } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { CONTACT } from "@/lib/site";
import Magnetic from "./Magnetic";

// three.js is heavy — load the 3D scene only in the browser, after first paint.
const MasjidScene = lazy(() => import("./three/MasjidScene"));

const delay = (s: number) => ({ animationDelay: `${s}s` });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// If WebGL or the 3D bundle fails for any reason, keep the static poster.
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Rotating last word of the headline.
function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom pb-[0.12em]">
      {/* invisible copies reserve the width of the longest word */}
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1" aria-hidden="true">
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 text-accent"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / 1800, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    setN(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      <bdi dir="ltr">
        {n}
        {suffix}
      </bdi>
    </span>
  );
}

export default function Hero() {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Client-only state for the 3D layer.
  const [three, setThree] = useState<{ on: boolean; lowPower: boolean; wide: boolean; xl: boolean }>({
    on: false,
    lowPower: false,
    wide: true,
    xl: true,
  });
  const [visible, setVisible] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideMq = window.matchMedia("(min-width: 1024px)");
    const lowPower = !wideMq.matches || (navigator.hardwareConcurrency || 8) <= 4;
    const xlMq = window.matchMedia("(min-width: 1280px)");
    setThree({ on: !reduce && hasWebGL(), lowPower, wide: wideMq.matches, xl: xlMq.matches });
    setChecked(true);
    const onChange = () => setThree((s) => ({ ...s, wide: wideMq.matches, xl: xlMq.matches }));
    wideMq.addEventListener("change", onChange);
    xlMq.addEventListener("change", onChange);
    return () => {
      wideMq.removeEventListener("change", onChange);
      xlMq.removeEventListener("change", onChange);
    };
  }, []);

  // Stop rendering the 3D scene when the hero is off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // push the model further aside on narrower desktops so it clears the headline
  const side = three.xl ? 0.2 : 0.26;
  const shift = three.wide ? (dir === "rtl" ? -side : side) : 0;

  const words =
    dir === "rtl" ? ["تنمو", "تتصدّر", "تُلهم", "تبيع"] : ["grow", "lead", "sell", "last"];

  const stats = [
    { to: 700, suffix: "+", label: t("Brands served", "علامة تجارية") },
    { to: 15, suffix: "+", label: t("Years in the market", "عامًا في السوق") },
    { to: 20, suffix: "+", label: t("Long-term partners", "شريك طويل الأمد") },
    { to: 5, suffix: "+", label: t("Market sectors", "قطاعات السوق") },
  ];

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-[#050403] text-white"
    >
      {/* — 3D scene (poster first, live WebGL once loaded) — */}
      <div className="absolute inset-0">
        {/* Soft amber glow behind the monument (the 3D canvas is transparent) */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_24%,rgb(245_166_35/0.22),transparent_70%)] ${
            dir === "rtl"
              ? "lg:bg-[radial-gradient(ellipse_45%_60%_at_28%_45%,rgb(245_166_35/0.22),transparent_70%)]"
              : "lg:bg-[radial-gradient(ellipse_45%_60%_at_72%_45%,rgb(245_166_35/0.22),transparent_70%)]"
          }`}
        />
        {/* Static render of the same scene: only used when live 3D can't run
            (no WebGL / reduced motion), so the two never overlap or jump. */}
        <picture className={`transition-opacity duration-700 ${checked && !three.on ? "opacity-100" : "opacity-0"}`}>
          <source
            media="(min-width: 1024px)"
            srcSet={dir === "rtl" ? "/hero/masjid-rtl.jpg" : "/hero/masjid-ltr.jpg"}
          />
          <img
            src="/hero/masjid-mobile.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
        {three.on && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <div
                className={`absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-out ${
                  sceneReady ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
                }`}
              >
                <MasjidScene
                  scroll={scrollYProgress}
                  shift={shift}
                  paused={!visible}
                  lowPower={three.lowPower}
                  onReady={() => setSceneReady(true)}
                />
              </div>
            </Suspense>
          </SceneBoundary>
        )}
      </div>

      {/* — Legibility overlays — */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050403] via-transparent to-[#050403]/60" />
      <div
        className={`absolute inset-0 pointer-events-none ${
          dir === "rtl"
            ? "bg-gradient-to-l from-[#050403]/95 via-[#050403]/55 lg:via-[#050403]/40 to-transparent"
            : "bg-gradient-to-r from-[#050403]/95 via-[#050403]/55 lg:via-[#050403]/40 to-transparent"
        }`}
      />
      <div className="absolute inset-0 bg-[#050403]/20 lg:bg-transparent pointer-events-none" />
      <div className="absolute inset-0 noise-bg pointer-events-none" />

      {/* — Content — */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 min-h-[100svh] max-w-7xl mx-auto px-6 flex flex-col justify-end pb-8 pt-28 pointer-events-none"
      >
        <div className="max-w-3xl pointer-events-auto">
          <p
            className="anim-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-4 py-2 text-[11px] sm:text-sm text-white/85"
            style={delay(0.1)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t("Advertising & Marketing Agency · Al-Madinah, KSA", "وكالة إعلان وتسويق · المدينة المنورة")}
          </p>

          <h1
            className="mt-6 font-bold tracking-tighter leading-[0.95] uppercase"
            style={{ fontSize: dir === "rtl" ? "clamp(2.6rem, 6.4vw, 5.9rem)" : "clamp(2.9rem, 7.4vw, 7rem)" }}
          >
            <span className="block overflow-hidden">
              <span className="anim-rise" style={delay(0.2)}>
                {t("We build brands", "نبني علامات")}
              </span>
            </span>
            <span className="block overflow-hidden whitespace-nowrap">
              <span className="anim-rise" style={delay(0.34)}>
                {t("that ", "تجارية ")}
                <span className="sr-only">{words[0]}</span>
                <span aria-hidden="true">
                  <RotatingWord key={dir} words={words} />
                </span>
              </span>
            </span>
          </h1>

          <p
            className="anim-fade-up mt-6 text-base md:text-lg text-white/70 font-light leading-relaxed max-w-xl"
            style={delay(0.55)}
          >
            {t(
              "From the heart of Al-Madinah: strategy, content, production and on-ground execution for ambitious brands across Saudi Arabia since 2010.",
              "من قلب المدينة المنورة: استراتيجية، محتوى، إنتاج وتنفيذ ميداني للعلامات الطموحة في أنحاء المملكة منذ 2010."
            )}
          </p>

          <div className="anim-fade-up mt-8 flex flex-wrap items-center gap-3" style={delay(0.7)}>
            <Magnetic>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-accent text-black px-7 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors duration-300 shadow-[0_0_40px_-8px_rgb(245_166_35/0.7)]"
              >
                {t("Start Your Project", "ابدأ مشروعك")}
                <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </a>
            </Magnetic>
            <a
              href="#reels"
              className="group inline-flex items-center gap-3 ps-2 pe-6 py-2 rounded-full font-semibold text-sm border border-white/20 bg-white/5 backdrop-blur-md hover:border-white/60 transition-colors duration-300"
            >
              <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current rtl:-scale-x-100" />
              </span>
              {t("Watch Our Reels", "شاهد أعمالنا")}
            </a>
          </div>
        </div>

        {/* — Stats + scene caption — */}
        <div
          className="anim-fade-up mt-12 pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pointer-events-auto"
          style={delay(0.9)}
        >
          <dl className="grid grid-cols-4 gap-4 sm:gap-10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="text-white/50 text-[10px] sm:text-xs mt-1 font-light leading-tight">{s.label}</dt>
                <dd className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="hidden lg:flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/45">
            <span className="h-px w-10 bg-accent/60" />
            {t("Al-Masjid an-Nabawi", "المسجد النبوي")} · <bdi dir="ltr" className="font-mono">24.4672° N, 39.6111° E</bdi>
          </p>
        </div>
      </motion.div>

    </section>
  );
}
