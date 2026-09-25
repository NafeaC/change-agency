import { useLanguage } from "../hooks/useLanguage";
import { Plus } from "lucide-react";
import { FAQ as ITEMS } from "@/content/faq";
import { CONTACT } from "@/lib/site";
import SectionHeading from "./SectionHeading";

// Native <details> keeps every answer in the HTML (good for search engines)
// and works without JavaScript.
export default function FAQ() {
  const { t, language } = useLanguage();

  return (
    <section id="faq" className="py-24 md:py-32 px-6 bg-neutral-100 text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="light"
            eyebrow={t("FAQ", "الأسئلة الشائعة")}
            title={
              <>
                {t("Questions,", "أسئلة")} <span className="text-accent">{t("Answered", "وإجابات")}</span>
              </>
            }
            intro={t(
              "Everything you need to know before we start. Can't find your answer? Just ask.",
              "كل ما تحتاج معرفته قبل أن نبدأ. لم تجد إجابتك؟ اسألنا مباشرة."
            )}
          />
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3.5 text-sm font-bold hover:bg-accent hover:text-black transition-colors duration-300"
          >
            {t("Ask on WhatsApp", "اسألنا عبر واتساب")}
          </a>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-3">
          {ITEMS.map((item, i) => (
            <details
              key={i}
              open={i === 0}
              className="group rounded-2xl bg-white border border-black/5 open:shadow-lg open:shadow-black/5 transition-shadow"
            >
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none p-6 md:p-7 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base md:text-lg font-bold">{item.q[language]}</h3>
                <span className="w-9 h-9 shrink-0 rounded-full border border-black/10 flex items-center justify-center group-open:bg-accent group-open:border-accent transition-colors">
                  <Plus className="w-4 h-4 transition-transform duration-300 group-open:rotate-45" aria-hidden="true" />
                </span>
              </summary>
              <p className="px-6 md:px-7 pb-7 -mt-1 text-black/65 font-light leading-relaxed">{item.a[language]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
