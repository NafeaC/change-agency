import { useLanguage } from "../hooks/useLanguage";
import { useCountUp } from "../hooks/useCountUp";

export default function Stats() {
  const { t } = useLanguage();

  const StatItem = ({
    end,
    suffix,
    label,
  }: {
    end: number;
    suffix: string;
    label: string;
  }) => {
    const { count, ref } = useCountUp(end);

    return (
      <div className="flex flex-col items-center justify-center text-center px-2">
        <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-accent flex items-baseline gap-0.5 leading-none">
          <span ref={ref}>{count}</span>
          <span className="text-3xl sm:text-4xl md:text-5xl">{suffix}</span>
        </div>
        <div className="text-xs sm:text-sm font-bold uppercase tracking-widest mt-3 opacity-60 leading-snug max-w-[10rem]">
          {label}
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 sm:py-28 md:py-32 px-6 bg-black text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-8">
        <StatItem end={700}  suffix="+" label={t("Trusted Clients",    "عملاء موثوقون")} />
        <StatItem end={2010} suffix=""  label={t("Founded",            "سنة التأسيس")} />
        <StatItem end={20}   suffix="+" label={t("Long-term Partners", "شركاء استراتيجيون")} />
        <StatItem end={5}    suffix="+" label={t("Market Sectors",     "قطاعات السوق")} />
      </div>
    </section>
  );
}
