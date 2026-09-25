import { useLanguage } from "../hooks/useLanguage";
import SectionHeading from "./SectionHeading";

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT LOGOS — two scrolling rows
//
// To add or replace a logo:
// 1. Drop the new PNG into:  public/logos/
// 2. Add or update an entry below, e.g.:  { alt: "Brand", src: "/logos/new-client.png" }
// ─────────────────────────────────────────────────────────────────────────────
const logos: { alt: string; src: string }[] = [
  { alt: "Rasia Luxury Hotel",    src: "/logos/rasia.png"           },
  { alt: "Le Royal",              src: "/logos/le-royal.png"        },
  { alt: "Delly Vet Clinic",      src: "/logos/delly-vet.png"       },
  { alt: "Nayyara",               src: "/logos/nayyara.png"         },
  { alt: "Atiaf Taiba Furniture", src: "/logos/atiaf.png"           },
  { alt: "Brand Furniture",       src: "/logos/brand-furniture.png" },
  { alt: "Dr. Al-Ahmadi Hospital",src: "/logos/al-ahmadi.png"       },
  { alt: "HIPPO",                 src: "/logos/hippo.png"           },
  { alt: "Abella",                src: "/logos/abella.png"          },
  { alt: "Paparazzi Restaurant",  src: "/logos/paparazzi.png"       },
  { alt: "BaKkari Medical",       src: "/logos/bakkari.png"         },
  { alt: "Smile Horizon",         src: "/logos/smile-horizon.png"   },
  { alt: "Ideal Home",            src: "/logos/ideal-home.png"      },
  { alt: "NAF Real Estate",       src: "/logos/naf.png"             },
  { alt: "DMC Medical Complex",   src: "/logos/dmc.png"             },
  { alt: "Dar Ward",              src: "/logos/dar-ward.png"        },
  { alt: "Dave",                  src: "/logos/dave.png"            },
  { alt: "Monasbty Sweet",        src: "/logos/monasbty.png"        },
  { alt: "Prince",                src: "/logos/prince.png"          },
  { alt: "Client logo",           src: "/logos/unnamed.png"         },
  { alt: "Kamikaz",               src: "/logos/kamikaz.png"         },
  { alt: "Laylat Zafafi",         src: "/logos/laylat-zafafi.png"   },
  { alt: "Pump Coffee",           src: "/logos/pump-coffee.png"     },
];

const half = Math.ceil(logos.length / 2);
const rows = [logos.slice(0, half), logos.slice(half)];

function LogoRow({ items, reverse }: { items: typeof logos; reverse?: boolean }) {
  // Duplicated so the loop is seamless; the copy is hidden from screen readers.
  return (
    <div
      className="marquee-container select-none"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <ul className={`marquee-content flex items-center gap-4 sm:gap-5 pe-4 sm:pe-5 ${reverse ? "reverse" : ""}`} style={{ animationDuration: "60s" }}>
        {[...items, ...items].map((logo, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length ? true : undefined}
            className="shrink-0 flex items-center justify-center w-40 sm:w-52 h-24 sm:h-32 rounded-2xl border border-black/[0.07] bg-white p-3 sm:p-4"
          >
            <img
              src={logo.src}
              alt={i >= items.length ? "" : logo.alt}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full w-auto object-contain mix-blend-multiply"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Clients() {
  const { t } = useLanguage();

  return (
    <section id="clients" className="py-24 md:py-28 overflow-hidden bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow={t("Our Clients", "عملاؤنا")}
          title={
            <>
              {t("700+ Brands", "أكثر من 700 علامة")}{" "}
              <span className="text-accent">{t("Trust Change", "تثق بتشينج")}</span>
            </>
          }
          intro={t(
            "From hotels and hospitals to restaurants, retail and real estate — businesses across the Kingdom grow with us.",
            "من الفنادق والمستشفيات إلى المطاعم والتجزئة والعقار — شركات في مختلف أنحاء المملكة تنمو معنا."
          )}
        />
      </div>

      <div className="flex flex-col gap-4 sm:gap-5">
        <LogoRow items={rows[0]} />
        <LogoRow items={rows[1]} reverse />
      </div>
    </section>
  );
}
