import { useEffect } from "react";
import { Link } from "wouter";
import { LOGO_WHITE } from "@/lib/site";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 | Page not found | Change Advertising Agency";
  }, []);

  return (
    <main className="min-h-[100dvh] w-full flex flex-col items-center justify-center gap-8 bg-black text-white px-6 text-center noise-bg">
      <img src={LOGO_WHITE} alt="Change Advertising Agency" width={170} height={40} className="h-10 w-auto" />
      <p className="text-accent font-bold tracking-[0.3em] text-sm">404</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">
        Page not found
        <span className="block mt-3 text-2xl md:text-3xl font-arabic text-white/60 normal-case tracking-normal" dir="rtl" lang="ar">
          الصفحة غير موجودة
        </span>
      </h1>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-accent text-black px-6 py-3 font-bold hover:bg-white transition-colors">
          Back to home
        </Link>
        <Link href="/ar" className="rounded-full border border-white/25 px-6 py-3 font-bold font-arabic hover:bg-white hover:text-black transition-colors" lang="ar">
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}
