import { motion, useScroll, useSpring } from "framer-motion";
import { useMotionPreferences } from "./motion/MotionPreferences";

function AnimatedScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 105,
    damping: 30,
    mass: 0.3,
    restDelta: 0.001,
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-line/45">
      <motion.div
        className="h-full origin-left bg-amber/75"
        style={{ scaleX: smoothProgress }}
      />
    </div>
  );
}

export default function ScrollProgress() {
  const { reduceMotion } = useMotionPreferences();
  return reduceMotion ? null : <AnimatedScrollProgress />;
}
