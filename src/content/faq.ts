import type { Language } from "@/lib/site";

// Frequently asked questions — rendered in the FAQ section and also exposed
// to search engines as FAQPage structured data.
export const FAQ: { q: Record<Language, string>; a: Record<Language, string> }[] = [
  {
    q: {
      en: "What services does Change Agency offer?",
      ar: "ما الخدمات التي تقدمها وكالة تشينج؟",
    },
    a: {
      en: "We are a full-service advertising agency: brand strategy and identity, digital marketing and paid campaigns, video production, photography and content creation, plus printing, physical branding, signage and exhibition booths — all under one roof.",
      ar: "نحن وكالة إعلانية متكاملة: استراتيجية العلامة التجارية والهوية، التسويق الرقمي والحملات الإعلانية، إنتاج الفيديو والتصوير وصناعة المحتوى، إضافة إلى الطباعة والهوية المكانية واللوحات وأجنحة المعارض — كل ذلك تحت سقف واحد.",
    },
  },
  {
    q: {
      en: "Where is Change Agency located?",
      ar: "أين يقع مقر وكالة تشينج؟",
    },
    a: {
      en: "Our headquarters is on Hizam Road in Al-Madinah, Saudi Arabia. We have been serving businesses across the Kingdom since 2010.",
      ar: "مقرنا في طريق الحزام بالمدينة المنورة، المملكة العربية السعودية، ونخدم الشركات في مختلف مناطق المملكة منذ عام 2010.",
    },
  },
  {
    q: {
      en: "Do you work with clients outside Al-Madinah?",
      ar: "هل تعملون مع عملاء خارج المدينة المنورة؟",
    },
    a: {
      en: "Yes. We work with brands across Saudi Arabia. Strategy, digital marketing and content can be delivered remotely, and we coordinate on-ground production and execution wherever the project needs it.",
      ar: "نعم، نعمل مع علامات تجارية في مختلف مناطق المملكة. يمكن تقديم الاستراتيجية والتسويق الرقمي والمحتوى عن بُعد، وننسّق الإنتاج والتنفيذ الميداني حيثما يتطلب المشروع.",
    },
  },
  {
    q: {
      en: "Which industries do you have experience in?",
      ar: "ما القطاعات التي لديكم خبرة فيها؟",
    },
    a: {
      en: "We have served 700+ brands across hospitality and hotels, restaurants and cafés, healthcare and clinics, real estate, retail and furniture, events and more.",
      ar: "خدمنا أكثر من 700 علامة تجارية في قطاعات الضيافة والفنادق، والمطاعم والمقاهي، والرعاية الصحية والعيادات، والعقار، والتجزئة والأثاث، والمناسبات وغيرها.",
    },
  },
  {
    q: {
      en: "How do we start working together?",
      ar: "كيف نبدأ العمل معًا؟",
    },
    a: {
      en: "Send us a message on WhatsApp or email. We start with a discovery conversation to understand your business, audience and goals, then propose a clear strategy and scope before any execution begins.",
      ar: "راسلنا عبر واتساب أو البريد الإلكتروني. نبدأ بجلسة تعارف لفهم نشاطك وجمهورك وأهدافك، ثم نقترح استراتيجية ونطاق عمل واضحين قبل بدء أي تنفيذ.",
    },
  },
];
