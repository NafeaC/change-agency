import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-8">
              {t("We Think Business,", "نفكر بأسلوب الأعمال،")}
              <br />
              <span className="text-accent">{t("Not Just Marketing", "ليس فقط التسويق")}</span>
            </h2>
            <p className="text-xl md:text-2xl text-black/70 font-light leading-relaxed">
              {t(
                "A full-service advertising agency headquartered in Al-Madinah, KSA. We've served businesses across the Kingdom since 2010, building marketing strategies rooted in market reality — not guesswork.",
                "وكالة إعلانات متكاملة الخدمات مقرها المدينة المنورة، المملكة العربية السعودية. قدمنا خدماتنا للشركات في جميع أنحاء المملكة منذ عام 2010، حيث نبني استراتيجيات تسويقية تستند إلى واقع السوق — وليس التخمين."
              )}
            </p>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6">
              {[
                t("Strategic Thinking", "التفكير الاستراتيجي"),
                t("Data-Driven Decisions", "قرارات مبنية على البيانات"),
                t("Local Market Expertise", "خبرة السوق المحلي"),
                t("Results-Tied Creativity", "إبداع مرتبط بالنتائج")
              ].map((pillar, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="font-medium text-sm uppercase tracking-wide">{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-black text-white p-10 lg:p-12">
              <p className="text-xl leading-relaxed">
                {t(
                  "We work with companies seeking sustainable growth. 15+ years of market shifts taught us to separate what actually works from what's just noise.",
                  "نعمل مع الشركات التي تبحث عن النمو المستدام. 15+ عاماً من تحولات السوق علمتنا أن نفصل بين ما ينجح فعلياً وبين ما هو مجرد ضجيج."
                )}
              </p>
            </div>
            
            <div className="border border-black/10 p-10 lg:p-12 relative overflow-hidden">
              <div className="text-6xl text-accent/20 absolute top-4 left-6 font-serif">"</div>
              <p className="text-2xl font-light italic relative z-10 mt-6">
                {t(
                  "Our experience isn't measured in years — it's measured in the right decisions made at critical moments.",
                  "خبرتنا لا تقاس بالسنوات — بل تقاس بالقرارات الصحيحة المتخذة في اللحظات الحاسمة."
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}