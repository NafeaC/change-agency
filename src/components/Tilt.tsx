import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// 3D tilt on hover with a moving highlight (mouse only).
export default function Tilt({
  children,
  className = "",
  max = 10,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const cfg = { stiffness: 180, damping: 18 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), cfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), cfg);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useTransform(
    [glareX, glareY] as never,
    ([gx, gy]: string[]) => `radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.18), transparent 55%)`,
  );

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group/tilt relative h-full will-change-transform"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            style={{ background: glareBg }}
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300"
          />
        )}
      </motion.div>
    </div>
  );
}
