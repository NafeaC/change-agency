import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";

export default function WhyChange() {
  const { t } = useLanguage();

  const reasons = [
    {
      title: t("Partner, Not a Vendor", "شريك، وليس مجرد مورد"),
      desc: t(
        "We work as part of your team. We share the logic behind every decision.",
        "نعمل كجزء من فريقك. نشاركك المنطق وراء كل قرار."
      )
    },
    {
      title: t("Deep Local Expertise", "خبرة محلية عميقة"),
      desc: t(
        "15+ years of field work in Saudi Arabia. We build solutions for the local market — not imported templates.",
        "أكثر من 15 عاماً من العمل الميداني في السعودية. نبني حلولاً للسوق المحلي — لا نعتمد على قوالب مستوردة."
      )
    },
    {
      title: t("Creativity Measured by Results", "إبداع يقاس بالنتائج"),
      desc: t(
        "Every creative decision is tied to a clear goal. We separate what drives results from what drives noise.",
        "كل قرار إبداعي مرتبط بهدف واضح. نفصل بين ما يحقق نتائج وما يثير مجرد ضجة."
      )
    }
  ];

  return (
    <section id="why" className="py-32 px-6 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">
            {t("Why Choose", "لماذا تختار")} <span className="text-accent">{t("Change?", "تشينج؟")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 p-10 hover:bg-white/10 transition-colors border border-white/5"
            >
              <div className="text-accent text-5xl mb-6">{(i + 1).toString().padStart(2, '0')}</div>
              <h3 className="text-2xl font-bold uppercase mb-4">{r.title}</h3>
              <p className="text-white/60 font-light leading-relaxed text-lg">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}