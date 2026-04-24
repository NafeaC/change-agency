import { useLanguage } from "../hooks/useLanguage";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function CTA() {
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="contact" className="py-32 px-6 bg-accent text-white relative overflow-hidden">
      {/* Abstract geometric shapes */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-8 leading-none"
        >
          {t("Ready to Build Your", "هل أنت مستعد لبناء")}
          <br />
          <span className="text-black">{t("Brand Right?", "علامتك بشكل صحيح؟")}</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-light mb-16 opacity-90 max-w-2xl mx-auto"
        >
          {t(
            "No templates. No guesswork. Just a real conversation to understand your business and map the first step together.",
            "لا قوالب جاهزة. لا تخمينات. مجرد نقاش حقيقي لفهم عملك ورسم الخطوة الأولى معاً."
          )}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a 
            href="https://wa.me/966534060044" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-colors duration-300"
          >
            {t("WhatsApp Us", "تواصل عبر واتساب")}
            <Arrow className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="mailto:info@change.sa"
            className="flex items-center justify-center px-10 py-5 rounded-full font-bold text-lg border-2 border-black text-black hover:bg-black hover:text-white transition-colors duration-300"
          >
            info@change.sa
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 pt-10 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6 font-medium text-black"
        >
          <div>{t("Al-Madinah, Hizam Road", "المدينة المنورة، طريق الحزام")}</div>
          <div>+966 53 406 0044</div>
          <div>info@change.sa</div>
        </motion.div>
      </div>
    </section>
  );
}