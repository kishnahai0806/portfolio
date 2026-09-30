import BackToTop from "./components/BackToTop";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import PlaceholderSections from "./components/PlaceholderSections";
import ScrollProgress from "./components/ScrollProgress";
import StartupLoader from "./components/StartupLoader";
import { MotionPreferencesProvider } from "./components/motion/MotionPreferences";
import { site } from "./content";

export default function App() {
  return (
    <MotionPreferencesProvider>
      <StartupLoader>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-panel focus:px-4 focus:py-3 focus:font-mono focus:text-sm focus:text-amber"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Nav />
        <BackToTop />
        <main id="main" tabIndex={-1} className="relative overflow-clip">
          <Hero />
          <PlaceholderSections />
        </main>
        <footer className="flex flex-col gap-3 border-t border-line px-6 py-7 font-mono text-[9px] uppercase tracking-[0.16em] text-dim sm:flex-row sm:items-center sm:justify-between">
          <span>{"\u00A9"} {new Date().getFullYear()} {site.name}</span>
          <span>Designed with intent <span className="text-amber">/</span> Engineered for production</span>
        </footer>
      </StartupLoader>
    </MotionPreferencesProvider>
  );
}
