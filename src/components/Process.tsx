import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { Search, Compass, Lightbulb, Rocket, TrendingUp } from "lucide-react";

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
    <section id="process" className="py-32 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">
            {t("Our", "منهجية")} <span className="text-accent">{t("Process", "عملنا")}</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl font-light max-w-2xl mx-auto">
            {t(
              "We work according to a clear, connected methodology — every step serves the final goal.",
              "نعمل وفق منهجية واضحة ومترابطة، تضمن أن كل خطوة تخدم الهدف النهائي."
            )}
          </p>
        </motion.div>

        {/* — Steps — */}
        <div className="relative">
          {/* connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-9 left-0 right-0 h-px bg-white/10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* icon circle */}
                  <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-accent flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
                  </div>

                  <div className="text-accent text-xs font-bold tracking-widest mb-2 uppercase">
                    {`0${i + 1}`}
                  </div>
                  <h3 className="text-xl font-bold uppercase mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-white/50 font-light leading-relaxed text-sm max-w-[14rem]">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
