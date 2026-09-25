import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { Target, BarChart3, MapPinned, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { t } = useLanguage();

  const pillars = [
    { icon: Target,    label: t("Strategic Thinking", "التفكير الاستراتيجي") },
    { icon: BarChart3, label: t("Data-Driven Decisions", "قرارات مبنية على البيانات") },
    { icon: MapPinned, label: t("Local Market Expertise", "خبرة السوق المحلي") },
    { icon: Sparkles,  label: t("Results-Tied Creativity", "إبداع مرتبط بالنتائج") },
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* — Copy — */}
          <div className="lg:col-span-6">
            <SectionHeading
              tone="light"
              eyebrow={t("About Change", "من نحن")}
              title={
                <>
                  {t("We Think Business,", "نفكر بعقلية الأعمال،")}
                  <br />
                  <span className="text-accent">{t("Not Just Marketing", "لا التسويق فقط")}</span>
                </>
              }
            />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="mt-8 text-lg md:text-xl text-black/75 font-light leading-relaxed">
                {t(
                  "Change is a full-service advertising agency headquartered in Al-Madinah, Saudi Arabia. Since 2010 we have helped businesses across the Kingdom build marketing strategies rooted in market reality — not guesswork.",
                  "تشينج وكالة إعلانية متكاملة الخدمات مقرها المدينة المنورة. منذ عام 2010 نساعد الشركات في مختلف مناطق المملكة على بناء استراتيجيات تسويقية تستند إلى واقع السوق — لا إلى التخمين."
                )}
              </p>
              <p className="mt-5 text-base md:text-lg text-black/60 font-light leading-relaxed">
                {t(
                  "Successful marketing doesn't start with advertising — it starts with understanding the project, the market and the audience, then building a clear strategy that guides every step that follows.",
                  "التسويق الناجح لا يبدأ من الإعلان، بل من فهم المشروع والسوق والجمهور، ثم بناء استراتيجية واضحة تقود كل خطوة لاحقة."
                )}
              </p>

              <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3.5"
                  >
                    <span className="w-9 h-9 shrink-0 rounded-lg bg-accent/15 text-accent-ink flex items-center justify-center">
                      <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-semibold text-sm">{label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* — Visual — */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col gap-5"
          >
            <figure className="relative rounded-2xl overflow-hidden group">
              <img
                src="/about/madinah.jpg"
                alt={t("Al-Masjid an-Nabawi in Al-Madinah, home of Change Agency", "المسجد النبوي في المدينة المنورة، مقر وكالة تشينج")}
                width={1400}
                height={1050}
                loading="lazy"
                decoding="async"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <figcaption className="absolute bottom-6 start-6 end-6 text-white">
                <p className="text-xs uppercase tracking-widest text-accent font-bold mb-1">
                  {t("Home Base", "مقرنا")}
                </p>
                <p className="text-lg sm:text-2xl font-bold">
                  {t("Proudly rooted in Al-Madinah, KSA", "بفخر من المدينة المنورة")}
                </p>
              </figcaption>
            </figure>

            <blockquote className="relative bg-black text-white rounded-2xl p-8 md:p-10 overflow-hidden">
              <span aria-hidden="true" className="absolute -top-4 end-6 text-[8rem] leading-none font-serif text-accent/25">
                ”
              </span>
              <p className="relative text-xl md:text-2xl font-light leading-snug">
                {t(
                  "Our experience isn't measured in years — it's measured in the right decisions made at critical moments.",
                  "خبرتنا لا تقاس بالسنوات — بل بالقرارات الصحيحة في اللحظات الحاسمة."
                )}
              </p>
              <footer className="relative mt-6 text-sm text-white/50">
                {t("15+ years of market shifts across the Kingdom", "أكثر من 15 عامًا من تحولات السوق في المملكة")}
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
