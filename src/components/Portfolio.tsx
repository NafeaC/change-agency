import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";

export default function Portfolio() {
  const { t } = useLanguage();

  const projects = [
    {
      src: "/work/rasia-branding.jpg",
      client: "Rasia Luxury Hotel",
      category: t("Branding & Identity", "العلامة التجارية والهوية"),
    },
    {
      src: "/work/dynamite-shrimp-ad.jpg",
      client: "Havens",
      category: t("Digital Marketing", "التسويق الرقمي"),
    },
    {
      src: "/work/diviso-photography.jpg",
      client: "Diviso",
      category: t("Professional Photography", "التصوير الفوتوغرافي"),
    },
    {
      src: "/work/rasia-hotel.jpg",
      client: "Rasia Luxury Hotel",
      category: t("Photography", "التصوير"),
    },
    {
      src: "/work/wonder-car-signage.jpg",
      client: "Wonder Car",
      category: t("Signage & Physical Branding", "الهوية المكانية"),
    },
    {
      src: "/work/taiba-booth.jpg",
      client: "Taiba Investments",
      category: t("Booths & Displays", "الأجنحة ومنصات العرض"),
    },
  ];

  return (
    <section id="work" className="py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6">
            {t("Selected", "أعمال")} <span className="text-accent">{t("Work", "مختارة")}</span>
          </h2>
          <p className="text-black/60 text-lg md:text-xl font-light">
            {t(
              "A selection of real projects we've delivered for our clients.",
              "مجموعة من المشاريع الحقيقية التي نفذناها لعملائنا."
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
                src={project.src}
                alt={project.client}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs uppercase tracking-widest text-accent font-bold mb-1">
                  {project.category}
                </p>
                <p className="text-lg sm:text-xl font-bold">{project.client}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
