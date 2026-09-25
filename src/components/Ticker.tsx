import { useLanguage } from "../hooks/useLanguage";

// Two crossed, endlessly scrolling bands listing what we do.
function Band({ items, className, reverse }: { items: string[]; className: string; reverse?: boolean }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee-container py-4 md:py-5 ${className}`}>
      <div
        className={`marquee-content flex items-center gap-8 pe-8 ${reverse ? "reverse" : ""}`}
        style={{ animationDuration: "40s" }}
        aria-hidden="true"
      >
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-2xl md:text-4xl font-bold uppercase tracking-tight whitespace-nowrap">
            {w}
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-7 md:h-7 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Ticker() {
  const { t } = useLanguage();
  const services = [
    t("Branding", "الهوية التجارية"),
    t("Digital Marketing", "التسويق الرقمي"),
    t("Video Production", "إنتاج الفيديو"),
    t("Photography", "التصوير"),
    t("Content Creation", "صناعة المحتوى"),
    t("Printing", "الطباعة"),
    t("Exhibition Booths", "أجنحة المعارض"),
  ];
  const values = [
    t("Strategy First", "الاستراتيجية أولًا"),
    t("Made in Madinah", "من المدينة المنورة"),
    t("Results Driven", "نتائج ملموسة"),
    t("Since 2010", "منذ 2010"),
  ];

  return (
    <section aria-label={t("Our services", "خدماتنا")} className="relative bg-[#050403] py-10 md:py-14 overflow-hidden">
      <p className="sr-only">{services.join(" · ")}</p>
      <div className="relative z-10 -rotate-[1.5deg] scale-105 shadow-[0_10px_40px_rgb(0_0_0/0.5)]">
        <Band items={services} className="bg-accent text-black" />
      </div>
      <div className="relative -mt-3 md:-mt-4 rotate-[1.5deg] scale-105">
        <Band items={values} className="bg-[#14110d] text-white/70 border-y border-white/10" reverse />
      </div>
    </section>
  );
}
