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
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
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

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsidePress);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [open]);

  useEffect(() => {
    const desktopNavigation = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    if (desktopNavigation.matches) setOpen(false);
    desktopNavigation.addEventListener("change", closeAtDesktop);
    return () => desktopNavigation.removeEventListener("change", closeAtDesktop);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="nav-shell mx-auto flex h-14 max-w-[88rem] items-center justify-between rounded-full border border-line/90 bg-bg/80 px-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-5" aria-label="Primary navigation">
        <a href="#home" className="group flex items-center gap-3 rounded-full" aria-label={`${site.name}, home`}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-amber font-mono text-[11px] font-bold text-bg transition-transform group-hover:rotate-6">KP</span>
          <span className="hidden font-mono text-xs text-mut sm:block">{site.title}</span>
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
          <a href={`mailto:${site.email}`} className="hidden rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-amber hover:text-amber sm:block">
            Email me
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="mobile-menu-toggle lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <span className={`menu-icon ${open ? "menu-icon-open" : ""}`} aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </nav>

      {open && (
        <nav
          ref={menuRef}
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
        >
          <div className="mobile-navigation-heading">
            <span>Menu</span>
          </div>
          <div className="mobile-navigation-grid">
            {nav.map((item) => {
              const active = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => { setActiveHref(item.href); setOpen(false); }}
                  className={`mobile-navigation-link ${active ? "mobile-navigation-link-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <strong>{item.label}</strong>
                  <span aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <div className="mobile-navigation-actions">
            <a href={`mailto:${site.email}`}>Email me</a>
            <a href={site.resumeUrl} download={site.resumeFilename}>Résumé</a>
          </div>
        </nav>
      )}
    </header>
  );
}
