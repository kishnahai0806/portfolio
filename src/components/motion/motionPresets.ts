import type { Easing, Variants } from "framer-motion";

export type MotionPreset = "hero" | "section" | "heading" | "body" | "card" | "metric" | "media";

export const premiumEase: Easing = [0.16, 1, 0.3, 1];

const presetSettings: Record<MotionPreset, { distance: number; duration: number; scale?: number }> = {
  hero: { distance: 16, duration: 0.56 },
  section: { distance: 14, duration: 0.52 },
  heading: { distance: 16, duration: 0.54 },
  body: { distance: 10, duration: 0.46 },
  card: { distance: 10, duration: 0.48 },
  metric: { distance: 6, duration: 0.38 },
  media: { distance: 12, duration: 0.52, scale: 0.995 },
};

export function createRevealVariants(
  preset: MotionPreset,
  delay = 0,
  distance?: number,
): Variants {
  const settings = presetSettings[preset];

  return {
    hidden: {
      opacity: 0,
      y: distance ?? settings.distance,
      scale: settings.scale ?? 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: settings.duration,
        ease: premiumEase,
      },
    },
  };
}

export const defaultViewport = {
  once: true,
  amount: 0.12,
  margin: "0px 0px -4% 0px",
} as const;
