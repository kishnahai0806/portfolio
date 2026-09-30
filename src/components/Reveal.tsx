import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionPreferences } from "./motion/MotionPreferences";
import { createRevealVariants, defaultViewport } from "./motion/motionPresets";
import type { MotionPreset } from "./motion/motionPresets";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  preset?: MotionPreset;
  trigger?: "mount" | "viewport";
  once?: boolean;
  amount?: number;
  margin?: string;
};

/** A single layered reveal. Use Stagger when child sequencing matters. */
export default function Reveal({
  children,
  className,
  delay = 0,
  distance,
  preset = "body",
  trigger = "viewport",
  once = true,
  amount = defaultViewport.amount,
  margin = defaultViewport.margin,
}: RevealProps) {
  const { reduceMotion } = useMotionPreferences();

  if (reduceMotion) return <div className={className}>{children}</div>;

  const triggerProps = trigger === "mount"
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once, amount, margin } };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={createRevealVariants(preset, delay, distance)}
      {...triggerProps}
    >
      {children}
    </motion.div>
  );
}
