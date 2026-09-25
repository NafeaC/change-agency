import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SOCIAL } from "@/lib/site";
import SectionHeading from "./SectionHeading";

export default function Portfolio() {
  const { t } = useLanguage();

  // The first project is shown large; the grid is tuned for six items.
  const projects = [
    {
      src: "/work/rasia-branding.jpg", w: 1288, h: 851,
      client: t("Rasia Luxury Hotel", "فندق راسيا الفاخر"),
      category: t("Branding & Identity", "العلامة التجارية والهوية"),
      alt: t("Rasia Luxury Hotel brand identity — stationery and business cards", "هوية فندق راسيا الفاخر — المطبوعات وبطاقات العمل"),
    },
    {
      src: "/work/dynamite-shrimp-ad.jpg", w: 669, h: 831,
      client: "Havens",
      category: t("Digital Marketing", "التسويق الرقمي"),
      alt: t("Havens dynamite shrimp social media advertisement", "إعلان سوشيال ميديا لطبق الروبيان من Havens"),
    },
    {
      src: "/work/diviso-photography.jpg", w: 1080, h: 821,
      client: "Diviso",
      category: t("Product Photography", "تصوير المنتجات"),
      alt: t("Diviso product photography", "تصوير منتجات Diviso"),
    },
    {
      src: "/work/rasia-hotel.jpg", w: 1059, h: 1080,
      client: t("Rasia Luxury Hotel", "فندق راسيا الفاخر"),
      category: t("Architectural Photography", "التصوير المعماري"),
      alt: t("Rasia Luxury Hotel building exterior photography", "تصوير واجهة مبنى فندق راسيا الفاخر"),
    },
    {
      src: "/work/wonder-car-signage.jpg", w: 1297, h: 883,
      client: "Wonder Car",
      category: t("Signage & Physical Branding", "اللوحات والهوية المكانية"),
      alt: t("Wonder Car storefront signage", "لوحة واجهة Wonder Car"),
    },
    {
      src: "/work/taiba-booth.jpg", w: 1003, h: 744,
      client: t("Taiba Investments", "طيبة للاستثمار"),
      category: t("Booths & Displays", "الأجنحة ومنصات العرض"),
      alt: t("Taiba Investments exhibition booth", "جناح طيبة للاستثمار في المعرض"),
    },
  ];

  return (
    <section id="work" className="py-24 md:py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <SectionHeading
            tone="light"
            eyebrow={t("Selected Work", "أعمال مختارة")}
            title={
              <>
                {t("Work That", "أعمال")} <span className="text-accent">{t("Speaks", "تتحدث عنّا")}</span>
              </>
            }
            intro={t(
              "A selection of real projects we've delivered for our clients.",
              "مجموعة من المشاريع الحقيقية التي نفذناها لعملائنا."
            )}
          />
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start md:self-auto shrink-0 rounded-full border border-black/15 px-5 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-colors duration-300"
          >
            {t("More on Instagram", "المزيد على إنستغرام")}
            <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[290px] gap-5">
          {projects.map((project, i) => (
            <motion.figure
              key={project.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-2xl bg-neutral-100 aspect-[4/3] lg:aspect-auto ${
                i === 0 ? "sm:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <img
                src={project.src}
                alt={project.alt}
                width={project.w}
                height={project.h}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 p-6 md:p-7 text-white">
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent font-bold mb-1.5">{project.category}</p>
                  <p className={`font-bold ${i === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
                    {project.client}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
