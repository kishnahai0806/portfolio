import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type MotionPreferences = {
  reduceMotion: boolean;
  isDesktop: boolean;
  allowScrollMotion: boolean;
};

const MotionPreferencesContext = createContext<MotionPreferences>({
  reduceMotion: true,
  isDesktop: false,
  allowScrollMotion: false,
});

export function MotionPreferencesProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const updateDesktop = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    setIsDesktop(query.matches);
    query.addEventListener("change", updateDesktop);
    return () => query.removeEventListener("change", updateDesktop);
  }, []);

  const value = useMemo(() => {
    const reduceMotion = Boolean(prefersReducedMotion);
    return {
      reduceMotion,
      isDesktop,
      allowScrollMotion: !reduceMotion && isDesktop,
    };
  }, [isDesktop, prefersReducedMotion]);

  return <MotionPreferencesContext.Provider value={value}>{children}</MotionPreferencesContext.Provider>;
}

export function useMotionPreferences() {
  return useContext(MotionPreferencesContext);
}
