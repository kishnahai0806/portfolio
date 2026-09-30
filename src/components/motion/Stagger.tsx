import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionPreferences } from "./MotionPreferences";
import { createRevealVariants, defaultViewport } from "./motionPresets";
import type { MotionPreset } from "./motionPresets";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "viewport";
  once?: boolean;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  preset?: MotionPreset;
  distance?: number;
};

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
  trigger = "viewport",
  once = true,
}: StaggerProps) {
  const { reduceMotion } = useMotionPreferences();

  if (reduceMotion) return <div className={className}>{children}</div>;

  const triggerProps = trigger === "mount"
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { ...defaultViewport, once } };

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
      {...triggerProps}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, preset = "body", distance }: StaggerItemProps) {
  const { reduceMotion } = useMotionPreferences();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={createRevealVariants(preset, 0, distance)}>
      {children}
    </motion.div>
  );
}
