import { useLanguage } from "../hooks/useLanguage";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Process from "../components/Process";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import WhyChange from "../components/WhyChange";
import Clients from "../components/Clients";
import Stats from "../components/Stats";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-[100dvh] w-full flex flex-col bg-background font-sans selection:bg-accent selection:text-white">
      <Nav />
      <main className="flex-1 w-full">
        <Hero />
        <About />
        <Process />
        <Services />
        <Portfolio />
        <WhyChange />
        <Clients />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
