import { motion } from "framer-motion";
import { useMotionPreferences } from "./motion/MotionPreferences";

const statement = "I work on the interface, the API, the data behind it, and the tests that keep it working.";

export default function SystemStatement() {
  const { reduceMotion } = useMotionPreferences();
  const words = statement.split(" ");

  return (
    <section className="system-statement" aria-label="Engineering approach">
      <div className="system-statement-grid" aria-hidden="true" />
      <div className="system-statement-inner">
        <p className="system-statement-label">Across the full system</p>
        {reduceMotion ? (
          <p className="system-statement-copy">{statement}</p>
        ) : (
          <motion.p
            className="system-statement-copy"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.045 } },
            }}
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={{
                  hidden: { color: "var(--color-statement-muted)" },
                  visible: { color: "var(--color-ink)", transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {word}{index < words.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </motion.p>
        )}
      </div>
    </section>
  );
}
