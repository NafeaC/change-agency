import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      title: t("Change Growth", "تشينج للنمو"),
      subtitle: t("Brand Strategy & Digital Marketing", "استراتيجية العلامة التجارية والتسويق الرقمي"),
      items: t(
        "Branding & Identity, Digital Marketing, Advertising Campaigns, Marketing Solutions",
        "العلامات التجارية والهوية، التسويق الرقمي، الحملات الإعلانية، الحلول التسويقية"
      ).split(", ")
    },
    {
      title: t("Change Production", "تشينج للإنتاج"),
      subtitle: t("Creative Production & Content", "الإنتاج الإبداعي والمحتوى"),
      items: t(
        "Video Production, Photography, Content Creation",
        "الإنتاج المرئي، التصوير الفوتوغرافي، صناعة المحتوى"
      ).split(", ")
    },
    {
      title: t("Change Print & Execution", "تشينج للطباعة والتنفيذ"),
      subtitle: t("Print & Field Execution", "الطباعة والتنفيذ الميداني"),
      items: t(
        "Printing & Production, Physical Branding, Booths & Displays",
        "الطباعة والإنتاج، الهوية المكانية، الأجنحة ومنصات العرض"
      ).split(", ")
    }
  ];

  return (
    <section id="services" className="py-32 px-6 bg-black text-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase max-w-2xl">
            {t("Everything Under", "كل شيء تحت")} <span className="text-accent">{t("One Roof", "سقف واحد")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2 }}
              className="group border border-white/10 p-10 hover:bg-white hover:text-black transition-colors duration-500 flex flex-col min-h-[400px]"
            >
              <div className="text-accent text-sm font-bold tracking-widest mb-6 uppercase">
                0{i + 1}
              </div>
              <h3 className="text-3xl font-bold tracking-tight mb-2 uppercase">{service.title}</h3>
              <p className="text-white/50 group-hover:text-black/60 font-medium mb-10 transition-colors duration-500">
                {service.subtitle}
              </p>
              
              <ul className="mt-auto space-y-4">
                {service.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-accent mt-1">✦</span>
                    <span className="font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-6 bg-accent text-white p-10 md:p-16 flex flex-col md:flex-row justify-between items-center gap-10"
        >
          <div>
            <h3 className="text-3xl font-bold uppercase mb-2">
              {t("Real Results, Clear Numbers", "نتائج حقيقية، أرقام واضحة")}
            </h3>
            <p className="font-light opacity-90 text-lg">
              {t("We measure success by business impact.", "نقيس النجاح بتأثيره على الأعمال.")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 w-full md:w-auto">
            {[
              { val: "1.29 SAR", label: t("Cost per result", "تكلفة النتيجة") },
              { val: "1.7M+", label: t("Paid views", "مشاهدات مدفوعة") },
              { val: "325K", label: t("Real reach", "وصول حقيقي") }
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-4xl font-bold tracking-tighter">{stat.val}</div>
                <div className="text-sm font-medium uppercase tracking-widest mt-2 opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}