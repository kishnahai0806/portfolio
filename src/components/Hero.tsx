import { site } from "../content";
import { Stagger, StaggerItem } from "./motion/Stagger";

const systemLayers = [
  { label: "Interfaces", className: "system-layer-interface" },
  { label: "APIs", className: "system-layer-api" },
  { label: "Data", className: "system-layer-data" },
  { label: "Testing", className: "system-layer-tests" },
  { label: "Infrastructure", className: "system-layer-deploy" },
];

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="hero cinematic-hero relative min-h-[100svh] overflow-hidden border-b border-line">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-light hero-light-blue" />
        <span className="hero-light hero-light-pink" />
        <span className="hero-light hero-light-coral" />
        <span className="hero-signal-field" />
        <span className="hero-grain" />
      </div>

      <div className="cinematic-hero-inner mx-auto flex min-h-[100svh] w-full max-w-[90rem] flex-col px-5 pb-8 pt-28 sm:px-8 lg:px-12">
        <Stagger trigger="mount" stagger={0.05} delay={0.12} className="hero-intro relative z-10">
          <StaggerItem preset="metric">
            <div className="hero-identity-rail">
              <span>{site.name}</span>
              <span className="hero-identity-role"><i aria-hidden="true" /> {site.title}</span>
              <span>Java / Spring Boot / backend systems</span>
            </div>
          </StaggerItem>

          <StaggerItem preset="hero" distance={24}>
            <h1 id="hero-heading" className="cinematic-title">
              <span>{site.title}</span>
              <span>across the stack.</span>
            </h1>
          </StaggerItem>

          <StaggerItem preset="body" distance={12}>
            <p className="cinematic-subtitle">{site.tagline}</p>
          </StaggerItem>

          <StaggerItem preset="body" distance={10}>
            <div className="hero-actions">
              <a href="#projects" className="button-primary">View selected projects</a>
              <a href={site.resumeUrl} download={site.resumeFilename} className="button-quiet">Download résumé</a>
            </div>
          </StaggerItem>
        </Stagger>

        <StaggerItem preset="media" className="hero-system-wrap">
          <div className="cinematic-system" aria-label="A visual map of Krish's work across interfaces, APIs, data, testing, and infrastructure">
            <div className="system-horizon" aria-hidden="true" />
            <div className="system-halo system-halo-outer" aria-hidden="true" />
            <div className="system-halo system-halo-mid" aria-hidden="true" />
            <div className="system-halo system-halo-inner" aria-hidden="true" />

            <svg className="system-routes" viewBox="0 0 900 540" aria-hidden="true">
              <path d="M450 265 C335 265 260 205 144 140" />
              <path d="M450 265 C565 265 640 205 756 140" />
              <path d="M450 265 C330 285 250 365 117 410" />
              <path d="M450 265 C570 285 650 365 783 410" />
              <path d="M450 265 C450 195 450 112 450 49" />
            </svg>

            <div className="system-core">
              <span>Java 21 / Spring Boot</span>
              <strong>Backend<br />systems</strong>
              <small><i aria-hidden="true" /> tested / deployed</small>
            </div>

            {systemLayers.map((layer) => (
              <div key={layer.label} className={`system-layer ${layer.className}`}>
                <i aria-hidden="true" />
                <span>{layer.label}</span>
              </div>
            ))}

            <p className="system-caption">Interfaces / APIs / data / testing / infrastructure</p>
          </div>
        </StaggerItem>
      </div>
    </section>
  );
}
