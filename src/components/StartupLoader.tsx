import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { site } from "../content";
import { useMotionPreferences } from "./motion/MotionPreferences";
import { premiumEase } from "./motion/motionPresets";

type StartupPhase = "loading" | "ready" | "complete";

const startupPhrases = [site.title, "Full stack systems"];

export default function StartupLoader({ children }: { children: ReactNode }) {
  const { reduceMotion } = useMotionPreferences();
  const [phase, setPhase] = useState<StartupPhase>(reduceMotion ? "complete" : "loading");
  const [progress, setProgress] = useState(reduceMotion ? 100 : 0);
  const frameRef = useRef<number | null>(null);
  const finishedRef = useRef(reduceMotion);

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
      setProgress(Math.min(100, Math.floor(eased * 100)));

      if (raw < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setPhase("ready");
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (phase !== "ready") return;
    const timer = window.setTimeout(finish, 480);
    return () => window.clearTimeout(timer);
  }, [finish, phase]);

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
      {phase === "complete" && (
        <motion.div
          className="site-shell"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: premiumEase }}
        >
          {children}
        </motion.div>
      )}

      <AnimatePresence>
        {phase !== "complete" && (
          <motion.div
            key="startup-loader"
            className="startup-loader fixed inset-0 z-[100] overflow-hidden"
            initial={false}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: premiumEase }}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio loading"
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

            <div className="absolute inset-0 flex items-center justify-center px-5">
              <motion.div
                className="startup-pill relative flex min-w-[16rem] items-center justify-between gap-8 overflow-hidden rounded-full bg-bg px-7 py-5 text-white sm:min-w-[20rem]"
                animate={phase === "ready" ? { scale: [1, 1.035, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: premiumEase }}
              >
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em]">
                  {phase === "ready" ? "Welcome" : "Loading"}
                </span>
                <span className="flex items-center gap-2 font-mono text-sm tabular-nums text-white/70">
                  {String(progress).padStart(3, "0")}<span className="text-white/35">%</span>
                  <span className="h-4 w-2 bg-amber" aria-hidden="true" />
                </span>
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-1 origin-left bg-amber"
                  style={{ scaleX: progress / 100 }}
                />
              </motion.div>
            </div>

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.18em] text-loader-ink/55 sm:inset-x-10 sm:bottom-8 sm:text-[10px]">
              <span>{site.title}</span>
              <span className="hidden text-right sm:block">React / Spring / PostgreSQL / Docker</span>
              <span aria-live="polite">{phase === "ready" ? "System ready" : "Booting portfolio"}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
