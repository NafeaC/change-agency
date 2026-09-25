import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Process from "../components/Process";
import WhyChange from "../components/WhyChange";
import Clients from "../components/Clients";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import WhatsAppFab from "../components/WhatsAppFab";
import { useLanguage } from "../hooks/useLanguage";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background font-sans selection:bg-accent selection:text-black">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[60] focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded-full focus:font-bold"
      >
        {t("Skip to content", "تخطَّ إلى المحتوى")}
      </a>
      <Nav />
      <main id="main" className="flex-1 w-full">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <WhyChange />
        <Clients />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
