import { useLanguage } from "../hooks/useLanguage";
import { ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import { CONTACT, PROFILE_DECK_URL } from "@/lib/site";

// Staggered delay helper for the CSS entrance animations.
const delay = (s: number) => ({ animationDelay: `${s}s` });

const collage = [
  { src: "/work/dynamite-shrimp-ad.jpg", w: 669, h: 831, en: "Havens digital marketing campaign", ar: "حملة تسويق رقمي لـ Havens" },
  { src: "/work/rasia-branding.jpg", w: 1288, h: 851, en: "Rasia Luxury Hotel brand identity", ar: "هوية فندق راسيا الفاخر" },
  { src: "/work/taiba-booth.jpg", w: 1003, h: 744, en: "Taiba Investments exhibition booth", ar: "جناح طيبة للاستثمار في المعرض" },
  { src: "/work/rasia-hotel.jpg", w: 1059, h: 1080, en: "Rasia Luxury Hotel photography", ar: "تصوير فندق راسيا الفاخر" },
];

export default function Hero() {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  const stats = [
    { value: "700+", label: t("Brands served", "علامة تجارية") },
    { value: "15+",  label: t("Years in the market", "عامًا في السوق") },
    { value: "20+",  label: t("Long-term partners", "شريك طويل الأمد") },
    { value: "5+",   label: t("Market sectors", "قطاعات السوق") },
  ];

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex flex-col px-6 pt-28 pb-10 noise-bg overflow-hidden bg-black text-white"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_30%_40%,black_20%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/4 start-[10%] w-[55vw] h-[45vh] bg-accent/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto flex flex-col flex-1 justify-between relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center flex-1">
          {/* — Copy — */}
          <div className="lg:col-span-7">
            <p
              className="anim-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] sm:text-sm text-white/80"
              style={delay(0.05)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <MapPin className="hidden sm:block w-3.5 h-3.5 text-accent" aria-hidden="true" />
              {t("Advertising & Marketing Agency · Al-Madinah, KSA", "وكالة إعلان وتسويق · المدينة المنورة")}
            </p>

            <h1
              className="mt-7 font-bold tracking-tighter leading-[0.92] uppercase"
              style={{ fontSize: "clamp(2.75rem, 7.2vw, 6.75rem)" }}
            >
              <span className="block overflow-hidden">
                <span className="anim-rise" style={delay(0.15)}>{t("We Build", "نبني")}</span>
              </span>
              <span className="block overflow-hidden">
                <span className="anim-rise" style={delay(0.27)}>{t("Brands", "علامات تجارية")}</span>
              </span>
              {/* pb-3 keeps italic descenders ("g") from being clipped */}
              <span className="block overflow-hidden pb-3 text-accent">
                <span className="anim-rise italic font-light lowercase tracking-normal" style={delay(0.4)}>
                  {t("that grow", "تنمو")}
                </span>
              </span>
            </h1>

            <p
              className="anim-fade-up mt-6 text-base md:text-lg text-white/65 font-light leading-relaxed max-w-xl"
              style={delay(0.6)}
            >
              {t(
                "Strategic partner for ambitious businesses in Saudi Arabia. Branding, digital marketing, production and on-ground execution — all under one roof since 2010.",
                "شريك استراتيجي للشركات الطموحة في المملكة. هوية تجارية، تسويق رقمي، إنتاج، وتنفيذ ميداني — كل شيء تحت سقف واحد منذ 2010."
              )}
            </p>

            <div className="anim-fade-up mt-9 flex flex-wrap gap-3" style={delay(0.75)}>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-accent text-black px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors duration-300"
              >
                {t("Start Your Project", "ابدأ مشروعك")}
                <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </a>
              <a
                href={PROFILE_DECK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm border border-white/25 hover:border-white hover:bg-white/5 transition-colors duration-300"
              >
                {t("View Company Profile", "الملف التعريفي")}
              </a>
            </div>
          </div>

          {/* — Work collage (desktop) — */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 pt-10">
                {[collage[0], collage[2]].map((img, i) => (
                  <figure
                    key={img.src}
                    className="anim-fade-up overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5"
                    style={delay(0.5 + i * 0.15)}
                  >
                    <img
                      src={img.src}
                      alt={t(img.en, img.ar)}
                      width={img.w}
                      height={img.h}
                      fetchPriority={i === 0 ? "high" : "auto"}
                      className={`w-full object-cover ${i === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
                    />
                  </figure>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                {[collage[1], collage[3]].map((img, i) => (
                  <figure
                    key={img.src}
                    className="anim-fade-up overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5"
                    style={delay(0.6 + i * 0.15)}
                  >
                    <img
                      src={img.src}
                      alt={t(img.en, img.ar)}
                      width={img.w}
                      height={img.h}
                      className={`w-full object-cover ${i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"}`}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* — Stats row — */}
        <dl
          className="anim-fade-up w-full grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-7 mt-12"
          style={delay(0.95)}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="text-white/45 text-xs sm:text-sm mt-1.5 font-light">{stat.label}</dt>
              <dd className="text-3xl md:text-4xl font-bold tracking-tight">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
