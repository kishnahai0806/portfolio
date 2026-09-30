import { motion } from "framer-motion";
import { useMotionPreferences } from "./MotionPreferences";
import { defaultViewport, premiumEase } from "./motionPresets";

type MotionLineProps = {
  className?: string;
  delay?: number;
};

export default function MotionLine({ className, delay = 0 }: MotionLineProps) {
  const { reduceMotion } = useMotionPreferences();
  const classes = `block h-px origin-left bg-line ${className ?? ""}`;

  if (reduceMotion) return <span aria-hidden="true" className={classes} />;

  return (
    <motion.span
      aria-hidden="true"
      className={classes}
      initial={{ scaleX: 0, opacity: 0.35 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={defaultViewport}
      transition={{ delay, duration: 0.72, ease: premiumEase }}
    />
  );
}
