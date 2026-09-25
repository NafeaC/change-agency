import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { Search, Compass, Lightbulb, Rocket, TrendingUp } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Process() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t("Discovery", "الاكتشاف"),
      desc: t(
        "We understand your business, audience, and the real challenges you face.",
        "نفهم نشاطك التجاري، جمهورك، وتحدياتك الحقيقية."
      ),
    },
    {
      icon: Compass,
      title: t("Strategy", "الاستراتيجية"),
      desc: t(
        "We define your positioning, core messaging, and the right growth roadmap.",
        "نحدد التمركز، الرسائل الأساسية، وخارطة النمو المناسبة."
      ),
    },
    {
      icon: Lightbulb,
      title: t("Creative", "الإبداع"),
      desc: t(
        "We turn strategy into identity, content, and campaigns that connect.",
        "نحوّل الاستراتيجية إلى هوية ومحتوى وحملات مؤثرة."
      ),
    },
    {
      icon: Rocket,
      title: t("Execution", "التنفيذ"),
      desc: t(
        "Professional execution across the right digital and on-ground channels.",
        "تنفيذ احترافي عبر القنوات الرقمية والميدانية المناسبة."
      ),
    },
    {
      icon: TrendingUp,
      title: t("Optimization", "التحسين"),
      desc: t(
        "We track performance and continuously improve results.",
        "نتابع الأداء ونحسّن النتائج باستمرار."
      ),
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 px-6 bg-neutral-100 text-black">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow={t("How We Work", "كيف نعمل")}
          title={
            <>
              {t("Our", "منهجية")} <span className="text-accent">{t("Process", "عملنا")}</span>
            </>
          }
          intro={t(
            "A clear, connected methodology where every step serves the final goal.",
            "نعمل وفق منهجية واضحة ومترابطة، تضمن أن كل خطوة تخدم الهدف النهائي."
          )}
          className="mb-16 md:mb-20"
        />

        <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* connecting line (desktop only) */}
          <div aria-hidden="true" className="hidden lg:block absolute top-[3.25rem] inset-x-[10%] h-px bg-black/10" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="relative flex flex-col items-center text-center bg-white rounded-2xl border border-black/5 px-6 pt-6 pb-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
              >
                <div className="relative z-10 w-14 h-14 rounded-full bg-black text-accent flex items-center justify-center mb-5 ring-8 ring-neutral-100">
                  <Icon className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <span className="text-accent-ink text-xs font-bold tracking-widest mb-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold uppercase mb-2 tracking-tight">{step.title}</h3>
                <p className="text-black/60 font-light leading-relaxed text-sm">{step.desc}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
