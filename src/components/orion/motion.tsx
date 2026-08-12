/* eslint-disable react-refresh/only-export-components */

import { useRef, type ReactNode, type ElementType } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  type Variants,
  type Transition,
} from "framer-motion";

/**
 * Motion design primitives — Orion
 * -----------------------------------------------------------------------
 * Camada fina sobre o framer-motion para padronizar as animações de
 * entrada, stagger e microinterações usadas em todo o site, mantendo
 * uma linguagem de movimento única e consistente.
 */

export const EASE_ORION: Transition["ease"] = [0.16, 1, 0.3, 1];

/* ----------------------------- Reveal ----------------------------- */

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
  amount?: number;
  style?: React.CSSProperties;
};

/** Faz o conteúdo entrar suavemente (fade + slide) quando entra na viewport. */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  duration = 0.7,
  y = 28,
  x = 0,
  once = true,
  amount = 0.3,
  style,
}: RevealProps) {
  const MotionTag = motion[as as "div"] ?? motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_ORION }}
    >
      {children}
    </MotionTag>
  );
}

/* --------------------------- Stagger group -------------------------- */

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const staggerItem = (y = 24, duration = 0.6): Variants => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration, ease: EASE_ORION } },
});

export function StaggerGroup({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0,
  once = true,
  amount = 0.2,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
} & Record<string, unknown>) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={staggerContainer(stagger, delayChildren)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
  duration = 0.6,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div className={className} variants={staggerItem(y, duration)}>
      {children}
    </motion.div>
  );
}

/* ------------------------- Scroll progress bar ------------------------ */

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, oklch(0.7 0.2 260), oklch(0.66 0.22 295), oklch(0.72 0.18 250))",
      }}
    />
  );
}

/* ------------------------------ Magnetic ------------------------------ */

/** Envolve um botão/link com um leve efeito magnético ao passar o mouse. */
export function Magnetic({
  children,
  className,
  strength = 14,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ Parallax ------------------------------- */

/** Parallax simples baseado na posição do mouse dentro do container pai. */
export function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { x: springX, y: springY, onMouseMove, onMouseLeave };
}

/* ------------------------------ Engine flame ------------------------------- */

/**
 * Chama de turbina com movimento real: glow pulsante, núcleo incandescente,
 * cone de exaustão flamejante e faíscas que escapam continuamente.
 * `angle` é medido em graus, sentido horário, a partir de "reto para baixo"
 * (0deg = chama descendo reto; valores positivos inclinam para baixo-esquerda).
 */
export function EngineFlame({
  top,
  left,
  size = 120,
  angle = 25,
  scale = 1,
  delay = 0,
}: {
  top: string;
  left: string;
  size?: number;
  angle?: number;
  scale?: number;
  delay?: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const mag = size * 0.85;
  const dx = -Math.sin(rad) * mag;
  const dy = Math.cos(rad) * mag;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-10"
      style={{
        top,
        left,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      {/* glow ambiente, respirando */}
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.82 0.19 230 / 0.85), oklch(0.62 0.24 265 / 0.4) 45%, transparent 72%)",
        }}
        animate={{
          opacity: [0.55, 0.92, 0.6, 0.88, 0.55],
          scale: [0.9, 1.1, 0.95, 1.06, 0.9],
        }}
        transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay }}
      />

      {/* núcleo incandescente */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[36%] w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[2px]"
        style={{
          background: "radial-gradient(circle, white, oklch(0.86 0.14 220) 42%, transparent 75%)",
        }}
        animate={{
          opacity: [0.7, 1, 0.75, 1, 0.8],
          scale: [1, 1.18, 0.9, 1.12, 1],
        }}
        transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut", delay: delay + 0.1 }}
      />

      {/* cone de exaustão flamejante */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{
          width: size * 0.34,
          height: size * 0.88,
          transformOrigin: "50% 0%",
          transform: `translate(-50%, -6%) rotate(${angle}deg)`,
          background:
            "linear-gradient(180deg, oklch(0.86 0.17 225 / 0.9), oklch(0.6 0.22 265 / 0.55) 45%, transparent 85%)",
          clipPath: "polygon(18% 0%, 82% 0%, 50% 100%)",
          filter: "blur(3px)",
        }}
        animate={{
          scaleY: [0.8, 1.2, 0.88, 1.25, 0.8],
          opacity: [0.6, 0.92, 0.65, 0.95, 0.6],
        }}
        transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut", delay: delay + 0.05 }}
      />

      {/* faíscas escapando do bico */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 h-[3px] w-[3px] rounded-full bg-cyan-50"
          style={{ boxShadow: "0 0 6px 1.5px oklch(0.85 0.2 230 / 0.9)" }}
          animate={{
            x: [0, dx * 0.35, dx],
            y: [0, dy * 0.35, dy],
            opacity: [0, 0.95, 0],
            scale: [0.6, 1, 0.3],
          }}
          transition={{
            duration: 1.15 + (i % 3) * 0.22,
            repeat: Infinity,
            ease: "easeOut",
            delay: delay + i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

export { motion, useScroll, useTransform };
