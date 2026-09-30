import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  index: number;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  wide?: boolean;
  emphasis?: boolean;
  status?: string;
};

export default function Section({ id, index, title, eyebrow, children, wide = false, emphasis = false, status }: SectionProps) {
  const headingId = `${id}-heading`;
  const sectionNumber = String(index).padStart(2, "0");

  return (
    <section id={id} aria-labelledby={headingId} className={`section-frame relative scroll-mt-24 border-b border-line ${emphasis ? "py-24 md:py-36" : "py-20 md:py-28"}`}>
      <div className={`mx-auto px-5 sm:px-8 lg:px-12 ${wide ? "max-w-[90rem]" : "max-w-[82rem]"}`}>
        <Reveal preset="heading" distance={18}>
          <div className="mb-12 grid gap-5 border-t border-line pt-5 md:mb-16 md:grid-cols-[8rem_1fr_auto] md:items-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">{sectionNumber} / {id}</p>
            <div>
              {eyebrow && <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">{eyebrow}</p>}
              <h2 id={headingId} className="section-title text-[clamp(2.8rem,6vw,6.5rem)] font-semibold uppercase leading-[0.86] tracking-[-0.065em] text-ink">{title}</h2>
            </div>
            {status && <p className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-dim md:flex"><span className="status-dot bg-ok text-ok" />{status}</p>}
          </div>
        </Reveal>

        <Reveal preset={emphasis ? "media" : "body"} amount={0.06}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
