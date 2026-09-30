import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMotionPreferences } from "./motion/MotionPreferences";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { reduceMotion } = useMotionPreferences();

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 900);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const returnToTop = () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="back-to-top"
          onClick={returnToTop}
          aria-label="Back to top"
          title="Back to top"
          initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.92 }}
          transition={{ duration: 0.2 }}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6.5 14.5 5.5-5 5.5 5" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
