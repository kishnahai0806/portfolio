import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "../content";

type Theme = "dark" | "light";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const [theme, setTheme] = useState<Theme>(readTheme);
  const visibilityRef = useRef(new Map<string, number>());
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("krish-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#ece9e1" : "#080908");
  }, [theme]);

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);
    const isAtPageEnd = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibilityRef.current.set(`#${entry.target.id}`, entry.isIntersecting ? entry.intersectionRatio : 0));
      if (isAtPageEnd()) {
        setActiveHref("#contact");
        return;
      }
      const next = [...visibilityRef.current.entries()].filter(([, ratio]) => ratio > 0).sort((a, b) => b[1] - a[1])[0]?.[0];
      if (next) setActiveHref(next);
    }, { rootMargin: "-20% 0px -68%", threshold: [0, 0.08, 0.2, 0.4] });

    const updatePageEnd = () => {
      if (isAtPageEnd()) setActiveHref("#contact");
    };

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", updatePageEnd, { passive: true });
    updatePageEnd();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updatePageEnd);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="nav-shell mx-auto flex h-14 max-w-[88rem] items-center justify-between rounded-full border border-line/90 bg-bg/80 px-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5" aria-label="Primary navigation">
        <a href="#home" className="group flex items-center gap-3 rounded-full" aria-label={`${site.name}, home`}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-amber font-mono text-[11px] font-bold text-bg transition-transform group-hover:rotate-6">KP</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-mut sm:block">{site.title}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = activeHref === item.href;
            return (
              <a key={item.href} href={item.href} onClick={() => setActiveHref(item.href)} className={`nav-link ${active ? "nav-link-active" : ""}`} aria-current={active ? "page" : undefined}>
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(nextTheme)}
            className="theme-toggle"
            aria-label={`Switch to ${nextTheme} mode`}
            title={`Switch to ${nextTheme} mode`}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M12 2.25v2M12 19.75v2M2.25 12h2M19.75 12h2M5.1 5.1l1.4 1.4M17.5 17.5l1.4 1.4M18.9 5.1l-1.4 1.4M6.5 17.5l-1.4 1.4" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20 15.25A8.4 8.4 0 0 1 8.75 4 8.4 8.4 0 1 0 20 15.25Z" />
                </svg>
              )}
            </span>
          </button>
          <a href={`mailto:${site.email}`} className="hidden rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-amber hover:text-amber sm:block">
            Start a conversation
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <span className={`menu-icon ${open ? "menu-icon-open" : ""}`} aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            className="mx-auto mt-2 max-w-[88rem] overflow-hidden rounded-3xl border border-line bg-panel p-3 shadow-2xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
          >
            {nav.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => { setActiveHref(item.href); setOpen(false); }} className="flex items-center justify-between border-b border-line px-4 py-4 font-mono text-sm uppercase text-ink last:border-0">
                <span><span className="mr-3 text-amber">0{index + 1}</span>{item.label}</span><span aria-hidden="true">↘</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
