import { useEffect } from "react";
import Lenis from "lenis";

// Buttery smooth wheel scrolling (desktop). Anchor links scroll with an offset
// for the fixed header. Disabled for users who prefer reduced motion.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.15,
      anchors: { offset: -72 },
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
