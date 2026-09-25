import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { TrendingUp, Clapperboard, Printer, Check } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: TrendingUp,
      title: t("Change Growth", "تشينج للنمو"),
      subtitle: t("Brand Strategy & Digital Marketing", "استراتيجية العلامة التجارية والتسويق الرقمي"),
      desc: t(
        "Positioning, identity and performance campaigns that turn attention into customers.",
        "تمركز وهوية وحملات أداء تحوّل الانتباه إلى عملاء."
      ),
      items: [
        t("Branding & Visual Identity", "العلامة التجارية والهوية البصرية"),
        t("Digital Marketing", "التسويق الرقمي"),
        t("Advertising Campaigns", "الحملات الإعلانية"),
        t("Marketing Solutions", "الحلول التسويقية"),
      ],
    },
    {
      icon: Clapperboard,
      title: t("Change Production", "تشينج للإنتاج"),
      subtitle: t("Creative Production & Content", "الإنتاج الإبداعي والمحتوى"),
      desc: t(
        "Video, photography and content produced to perform on every platform.",
        "فيديو وتصوير ومحتوى يُنتَج ليحقق أثره على كل منصة."
      ),
      items: [
        t("Video Production", "الإنتاج المرئي"),
        t("Professional Photography", "التصوير الاحترافي"),
        t("Content Creation", "صناعة المحتوى"),
      ],
    },
    {
      icon: Printer,
      title: t("Change Print & Execution", "تشينج للطباعة والتنفيذ"),
      subtitle: t("Print & Field Execution", "الطباعة والتنفيذ الميداني"),
      desc: t(
        "From print to storefront signage and exhibition booths — produced and executed on the ground.",
        "من المطبوعات إلى لوحات الواجهات وأجنحة المعارض — إنتاج وتنفيذ على أرض الواقع."
      ),
      items: [
        t("Printing & Production", "الطباعة والإنتاج"),
        t("Physical Branding & Signage", "الهوية المكانية واللوحات"),
        t("Booths & Displays", "الأجنحة ومنصات العرض"),
      ],
    },
  ];

  const results = [
    { val: t("1.29 SAR", "1.29 ر.س"), label: t("Cost per result", "تكلفة النتيجة") },
    { val: "1.7M+", label: t("Paid views", "مشاهدة مدفوعة") },
    { val: "325K", label: t("Real reach", "وصول حقيقي") },
  ];

  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
          <SectionHeading
            eyebrow={t("What We Do", "خدماتنا")}
            title={
              <>
                {t("Everything Under", "كل شيء تحت")} <span className="text-accent">{t("One Roof", "سقف واحد")}</span>
              </>
            }
          />
          <p className="text-white/60 font-light text-base md:text-lg max-w-sm leading-relaxed">
            {t(
              "Three specialised divisions working as one team — so strategy, content and execution never get lost in hand-offs.",
              "ثلاثة أقسام متخصصة تعمل كفريق واحد — حتى لا تضيع الاستراتيجية والمحتوى والتنفيذ بين الجهات."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10 flex flex-col hover:border-accent/60 hover:bg-white/[0.06] transition-colors duration-500"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="w-12 h-12 rounded-xl bg-accent text-black flex items-center justify-center">
                    <Icon className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="text-white/30 text-sm font-bold tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-2xl md:text-[1.75rem] font-bold tracking-tight uppercase leading-tight">
                  {service.title}
                </h3>
                <p className="text-accent font-medium text-sm mt-2">{service.subtitle}</p>
                <p className="text-white/60 font-light leading-relaxed mt-5">{service.desc}</p>

                <ul className="mt-8 pt-8 border-t border-white/10 space-y-3.5">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* — Results band — */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-5 rounded-2xl bg-accent text-black p-8 md:p-12 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
        >
          <div className="lg:col-span-2">
            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
              {t("Real Results, Clear Numbers", "نتائج حقيقية، أرقام واضحة")}
            </h3>
            <p className="font-medium opacity-75 mt-2">
              {t("We measure success by business impact.", "نقيس النجاح بأثره على الأعمال.")}
            </p>
          </div>
          <dl className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {results.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse sm:border-s sm:border-black/15 sm:ps-6">
                <dt className="text-xs font-bold uppercase tracking-widest mt-2 opacity-70">{stat.label}</dt>
                <dd className="text-4xl xl:text-5xl font-bold tracking-tighter whitespace-nowrap"><bdi>{stat.val}</bdi></dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
