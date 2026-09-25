import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { Handshake, MapPinned, Target } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function WhyChange() {
  const { t } = useLanguage();

  const reasons = [
    {
      icon: Handshake,
      title: t("Partner, Not a Vendor", "شريك، لا مجرد مورد"),
      desc: t(
        "We work as part of your team and share the logic behind every decision, with no black boxes.",
        "نعمل كجزء من فريقك ونشاركك المنطق وراء كل قرار بكل وضوح."
      ),
    },
    {
      icon: MapPinned,
      title: t("Deep Local Expertise", "خبرة محلية عميقة"),
      desc: t(
        "15+ years of field work in Saudi Arabia. We build solutions for the local market, not imported templates.",
        "أكثر من 15 عامًا من العمل الميداني في السعودية. نبني حلولًا للسوق المحلي، لا قوالب مستوردة."
      ),
    },
    {
      icon: Target,
      title: t("Creativity Measured by Results", "إبداع يُقاس بالنتائج"),
      desc: t(
        "Every creative decision is tied to a clear goal. We separate what drives results from what just makes noise.",
        "كل قرار إبداعي مرتبط بهدف واضح. نفصل بين ما يحقق النتائج وما يثير الضجيج فقط."
      ),
    },
  ];

  return (
    <section id="why" className="py-24 md:py-32 px-6 bg-black text-white relative overflow-hidden">
      <div className="absolute -bottom-40 end-0 w-[40rem] h-[40rem] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          align="center"
          eyebrow={t("Why Change", "لماذا تشينج")}
          title={
            <>
              {t("Why Brands", "لماذا تختارنا")} <span className="text-accent">{t("Choose Us", "العلامات التجارية؟")}</span>
            </>
          }
          className="mb-16 md:mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="relative rounded-2xl bg-white/[0.04] border border-white/10 p-8 md:p-10 hover:border-accent/50 transition-colors duration-500"
              >
                <div className="flex items-center justify-between mb-10">
                  <Icon className="w-9 h-9 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-5xl font-bold text-white/10 tracking-tighter">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 tracking-tight">{r.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
