import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT LOGOS — scrolling marquee
//
// To add or replace a logo:
// 1. Drop the new PNG into:  artifacts/change-agency/public/logos/
// 2. Update the src value below, e.g.:  src: "/logos/new-client.png"
// 3. Update the alt text to match the brand name.
// ─────────────────────────────────────────────────────────────────────────────
const logos: { alt: string; src: string }[] = [
  { alt: "Rasia Luxury Hotel",   src: "/logos/rasia.png"          },
  { alt: "Le Royal",             src: "/logos/le-royal.png"       },
  { alt: "Delly Vet Clinic",     src: "/logos/delly-vet.png"      },
  { alt: "Nayyara",              src: "/logos/nayyara.png"        },
  { alt: "Atiaf Taiba",          src: "/logos/atiaf.png"          },
  { alt: "Brand Furniture",      src: "/logos/brand-furniture.png"},
  { alt: "Dr Al-Ahmadi Hospital",src: "/logos/al-ahmadi.png"      },
  { alt: "HIPPO",                src: "/logos/hippo.png"          },
  { alt: "Abella",               src: "/logos/abella.png"         },
  { alt: "Paparazzi Restaurant", src: "/logos/paparazzi.png"      },
  { alt: "BaKkari Medical",      src: "/logos/bakkari.png"        },
  { alt: "Smile Horizon",        src: "/logos/smile-horizon.png"  },
  { alt: "Ideal Home",           src: "/logos/ideal-home.png"     },
  { alt: "NAF Real Estate",      src: "/logos/naf.png"            },
  { alt: "DMC Medical",          src: "/logos/dmc.png"            },
  { alt: "Dar Ward",             src: "/logos/dar-ward.png"       },
  { alt: "Dave",                 src: "/logos/dave.png"           },
  { alt: "Monasbty Sweet",       src: "/logos/monasbty.png"       },
  { alt: "Prince",               src: "/logos/prince.png"         },
  { alt: "Client 20",            src: "/logos/unnamed.png"        },
];

export default function Clients() {
  const { t } = useLanguage();

  // Marquee: starts fast (10 s/cycle) then slows to a cruise (50 s/cycle).
  const [duration, setDuration] = useState(10);
  useEffect(() => {
    const timer = setTimeout(() => setDuration(50), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Duplicate so the loop feels seamless
  const track = [...logos, ...logos];

  return (
    <section className="py-20 sm:py-28 overflow-hidden bg-white text-black border-y border-black/8">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 mb-12 sm:mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-xl sm:text-2xl md:text-4xl font-bold uppercase tracking-tight"
        >
          {t("700+ Brands Trusted Change", "أكثر من 700 علامة تجارية وثقت في تشينج")}
        </motion.h2>
      </div>

      {/* ── Scrolling logo strip ── */}
      <div
        className="marquee-container select-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          className="marquee-content flex items-center gap-8 sm:gap-12 px-6"
          style={{
            animationDuration: `${duration}s`,
            transition: "animation-duration 2s ease-out",
          }}
        >
          {track.map((logo, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center w-36 sm:w-44 h-20 sm:h-24 rounded-xl border border-black/8 bg-black/[0.018] hover:bg-black/[0.06] transition-colors duration-300 overflow-hidden p-4"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-12 max-w-full w-auto object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-400"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
