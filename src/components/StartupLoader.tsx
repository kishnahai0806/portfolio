import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { site } from "../content";
import { useMotionPreferences } from "./motion/MotionPreferences";
import { premiumEase } from "./motion/motionPresets";

type StartupPhase = "loading" | "welcome" | "expanding" | "complete";

const startupPhrases = [site.title, "Full stack systems"];

export default function StartupLoader({ children }: { children: ReactNode }) {
  const { reduceMotion } = useMotionPreferences();
  const [phase, setPhase] = useState<StartupPhase>(reduceMotion ? "complete" : "loading");
  const [progress, setProgress] = useState(reduceMotion ? 100 : 0);
  const frameRef = useRef<number | null>(null);
  const finishedRef = useRef(reduceMotion);
  const lastProgressRef = useRef(reduceMotion ? 100 : 0);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setPhase("complete");
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setProgress(100);
      setPhase("complete");
      return;
    }

    const startedAt = performance.now();
    const duration = 2_550;

    const tick = (now: number) => {
      const raw = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      const nextProgress = Math.min(100, Math.floor(eased * 100));

      if (nextProgress !== lastProgressRef.current) {
        lastProgressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      if (raw < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setPhase("welcome");
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (phase !== "welcome") return;
    const timer = window.setTimeout(() => setPhase("expanding"), 920);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "complete") return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finish, phase]);

  return (
    <>
      <div className="site-shell" aria-hidden={phase !== "complete"}>
        {children}
      </div>

      <AnimatePresence initial={false}>
        {phase !== "complete" && (
          <motion.div
            key="startup-loader"
            className="startup-loader fixed inset-0 z-[100] overflow-hidden"
            initial={false}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio loading"
          >
            <motion.div
              className="absolute inset-0 z-10"
              animate={{ opacity: phase === "expanding" ? 0 : 1 }}
              transition={{ duration: 0.2, ease: premiumEase }}
            >
              <div className="startup-grain" aria-hidden="true" />

              <div className="absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-loader-ink sm:inset-x-10 sm:top-8">
                <span>KP / 2026</span>
                <button
                  type="button"
                  onClick={finish}
                  className="rounded-full border border-loader-ink/25 px-4 py-2 transition-colors hover:border-loader-ink"
                >
                  Skip intro
                </button>
              </div>

              <div className="absolute inset-0 flex items-center overflow-hidden" aria-hidden="true">
                <div className="startup-track whitespace-nowrap text-[clamp(3rem,7vw,7.5rem)] font-semibold uppercase leading-none tracking-[-0.055em] text-loader-ink">
                  {[...startupPhrases, ...startupPhrases].map((phrase, index) => (
                    <span key={`${phrase}-${index}`}>{phrase} <i>•</i> </span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.18em] text-loader-ink/55 sm:inset-x-10 sm:bottom-8 sm:text-[10px]">
                <span>{site.title}</span>
                <span className="hidden text-right sm:block">React / Spring / PostgreSQL / Docker</span>
                <span aria-live="polite">
                  {phase === "loading" ? "Booting portfolio" : phase === "welcome" ? "System ready" : "Entering portfolio"}
                </span>
              </div>
            </motion.div>

            <div
              className={`startup-portal absolute left-1/2 top-1/2 z-20 h-16 w-64 rounded-full bg-bg sm:w-80 ${phase === "expanding" ? "startup-portal-open" : ""}`}
              onAnimationEnd={() => {
                if (phase === "expanding") finish();
              }}
              aria-hidden="true"
            />

            <div className="absolute inset-0 z-30 flex items-center justify-center px-5">
              <motion.div
                className={`startup-pill relative flex h-16 min-w-[16rem] items-center overflow-hidden rounded-full bg-bg px-7 text-ink sm:min-w-[20rem] ${phase === "expanding" ? "startup-pill-expanding" : ""}`}
                animate={
                  phase === "expanding"
                    ? { opacity: 0 }
                    : phase === "welcome"
                      ? { scale: [1, 1.025, 1], opacity: 1 }
                      : { scale: 1, opacity: 1 }
                }
                transition={
                  phase === "expanding"
                    ? { delay: 0.08, duration: 0.18, ease: premiumEase }
                    : { duration: 0.36, ease: premiumEase }
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  {phase === "loading" ? (
                    <motion.div
                      key="loading"
                      className="flex w-full items-center justify-between gap-8"
                      initial={false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12, ease: premiumEase }}
                    >
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">Loading</span>
                      <span className="flex items-center gap-2 font-mono text-sm tabular-nums text-ink/70">
                        {String(progress).padStart(3, "0")}<span className="text-ink/35">%</span>
                        <span className="h-4 w-2 bg-amber" aria-hidden="true" />
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="welcome"
                      className="flex w-full items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: phase === "expanding" ? 0 : 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: phase === "expanding" ? 0.16 : 0.08, ease: premiumEase }}
                    >
                      <div className="relative h-5 w-28 overflow-hidden font-mono text-xs font-semibold uppercase tracking-[0.12em]">
                        <motion.span
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ clipPath: "inset(0 0% 0 0)" }}
                          animate={{ clipPath: "inset(0 100% 0 0)" }}
                          transition={{ delay: 0.04, duration: 0.58, ease: premiumEase }}
                        >
                          Loading
                        </motion.span>
                        <motion.span
                          className="absolute inset-0 flex items-center justify-center"
                          initial={{ clipPath: "inset(0 0 0 100%)" }}
                          animate={{ clipPath: "inset(0 0 0 0%)" }}
                          transition={{ delay: 0.04, duration: 0.58, ease: premiumEase }}
                        >
                          Welcome
                        </motion.span>
                        <motion.span
                          className="absolute left-1/2 top-0 h-5 w-2 -translate-x-1/2 bg-ink"
                          initial={{ x: 54, opacity: 1 }}
                          animate={{ x: -54, opacity: [1, 1, 0] }}
                          transition={{
                            x: { delay: 0.04, duration: 0.58, ease: premiumEase },
                            opacity: { delay: 0.04, duration: 0.68, times: [0, 0.84, 1], ease: premiumEase },
                          }}
                          aria-hidden="true"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.span
                  className="absolute inset-x-0 bottom-0 h-1 origin-left bg-amber"
                  animate={{ opacity: phase === "expanding" ? 0 : 1 }}
                  style={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.14 }}
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
