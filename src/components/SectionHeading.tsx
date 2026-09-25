import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Shared heading used by every section: small eyebrow label, large title and
// an optional intro paragraph.
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "start",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  tone?: "dark" | "light";
  align?: "start" | "center";
  className?: string;
}) {
  const onDark = tone === "dark";
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`${centered ? "text-center mx-auto" : ""} max-w-3xl ${className}`}
    >
      <p
        className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] mb-5 ${
          onDark ? "text-accent" : "text-accent-ink"
        }`}
      >
        <span className={`h-px w-8 ${onDark ? "bg-accent" : "bg-accent-ink"}`} />
        {eyebrow}
      </p>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-[0.95]">
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-6 text-base sm:text-lg md:text-xl font-light leading-relaxed ${
            centered ? "mx-auto" : ""
          } max-w-2xl ${onDark ? "text-white/60" : "text-black/60"}`}
        >
          {intro}
        </p>
      )}
    </motion.div>
  );
}
