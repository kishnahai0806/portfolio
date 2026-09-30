import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { heroMetrics, site } from "../content";
import { Stagger, StaggerItem } from "./motion/Stagger";

const graphNodes = [
  { label: "BACKEND", className: "node-api", routeClass: "signal-route-api", path: "M310 310 C225 225 190 215 112 175" },
  { label: "WEB", className: "node-kafka", routeClass: "signal-route-kafka", path: "M310 310 C390 230 430 200 510 175" },
  { label: "DATA", className: "node-redis", routeClass: "signal-route-redis", path: "M310 310 C215 355 180 400 112 455" },
  { label: "TESTING", className: "node-postgres", routeClass: "signal-route-postgres", path: "M310 310 C395 355 438 400 510 455" },
  { label: "CLOUD", className: "node-k8s", routeClass: "signal-route-k8s", path: "M310 310 L310 82" },
];

type TrafficState = {
  cycle: number;
  routes: number[];
};

function nextTrafficRoutes(previous: number[]) {
  const previousRoutes = new Set(previous);
  const available = graphNodes
    .map((_, index) => index)
    .filter((index) => !previousRoutes.has(index));

  for (let index = available.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [available[index], available[swapIndex]] = [available[swapIndex], available[index]];
  }

  return available.slice(0, 2);
}

export default function Hero() {
  const [traffic, setTraffic] = useState<TrafficState>({ cycle: 0, routes: [4, 1] });

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTraffic((current) => ({
        cycle: current.cycle + 1,
        routes: nextTrafficRoutes(current.routes),
      }));
    }, 3900);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="home" aria-labelledby="hero-heading" className="hero relative min-h-[100svh] overflow-hidden border-b border-line">

      <div className="mx-auto flex min-h-[100svh] w-full max-w-[90rem] flex-col px-5 pb-7 pt-28 sm:px-8 lg:px-12">
        <Stagger trigger="mount" stagger={0.055} delay={0.12} className="relative z-10 grid flex-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
          <div className="self-center">
            <StaggerItem preset="metric">
              <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mut sm:text-xs">
                <span className="availability-chip"><span className="status-dot bg-ok text-ok" /> Available for opportunities</span>
              </div>
            </StaggerItem>

            <StaggerItem preset="hero" distance={28}>
              <h1 id="hero-heading" className="hero-title max-w-5xl text-[clamp(4rem,10.5vw,9.8rem)] font-semibold uppercase leading-[0.76] tracking-[-0.075em]">
                <span className="block text-ink">Krish</span>
                <span className="block text-amber">Prajapati</span>
              </h1>
            </StaggerItem>

            <StaggerItem preset="body" distance={14}>
              <div className="mt-9 grid max-w-3xl gap-5 border-t border-line pt-6 sm:grid-cols-[auto_1fr] sm:gap-10">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink">{site.title}</p>
                <p className="max-w-xl text-sm leading-7 text-mut sm:text-base">{site.tagline}</p>
              </div>
            </StaggerItem>

            <StaggerItem preset="body" distance={10}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className="button-primary">Explore my work <span aria-hidden="true">↘</span></a>
                <a href={site.resumeUrl} download={site.resumeFilename} className="button-quiet">Résumé <span aria-hidden="true">↓</span></a>
              </div>
            </StaggerItem>
          </div>

          <StaggerItem preset="media" className="hidden lg:block">
            <div className="system-orbit" aria-label="Animated diagram showing the areas Krish works across as a full stack software engineer">
              <div className="orbit-grid" aria-hidden="true" />
              <svg className="orbit-lines" viewBox="0 0 620 620" aria-hidden="true">
                {graphNodes.map((node) => <path key={node.label} className="route-line" d={node.path} />)}
                {traffic.routes.map((route, index) => (
                  <circle
                    key={`${traffic.cycle}-${route}`}
                    className={`signal ${index === 1 ? "signal-lag" : ""} ${graphNodes[route].routeClass}`}
                    cx="0"
                    cy="0"
                    r="4"
                  />
                ))}
              </svg>

              <div className="core-node">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">Core</span>
                <strong>SOFTWARE<br />SYSTEMS</strong>
                <small>tested / deployed</small>
              </div>

              {graphNodes.map((node) => (
                <motion.div
                  key={node.label}
                  className={`orbit-node ${node.className}`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: graphNodes.indexOf(node) * 0.22 }}
                >
                  <span className="status-dot bg-ok text-ok" />
                  {node.label}
                </motion.div>
              ))}

              <span className="orbit-label orbit-label-top">full stack / 05 layers</span>
              <span className="orbit-label orbit-label-bottom">built to work together</span>
            </div>
          </StaggerItem>
        </Stagger>

        <div className="relative z-10 mt-10 flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
          <span>Selected results</span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>

        <Stagger trigger="mount" delay={0.52} stagger={0.06} className="hero-metrics relative z-10 mt-4 grid border-y border-line sm:grid-cols-2">
          {heroMetrics.map((metric) => (
            <StaggerItem key={metric.label} preset="metric" className="metric-cell">
              <div className="hero-metric h-full px-5 py-5 sm:px-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-dim">{metric.label}</p>
                <p className="metric-value mt-1 text-xl font-medium tracking-tight text-ink">{metric.value}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="relative z-10 mt-5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
          <span>Scroll to inspect</span>
          <span className="scroll-indicator"><i /> 01 / 05</span>
        </div>
      </div>
    </section>
  );
}
