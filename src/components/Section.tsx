import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionProps = {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
  wide?: boolean;
};

export default function Section({ id, index, title, children, wide = false }: SectionProps) {
  const headingId = `${id}-heading`;
  const sectionNumber = String(index).padStart(2, "0");

  return (
    <section id={id} aria-labelledby={headingId} className="section-frame relative scroll-mt-24 border-b border-line py-20 md:py-28">
      <div className={`mx-auto px-5 sm:px-8 lg:px-12 ${wide ? "max-w-[90rem]" : "max-w-[82rem]"}`}>
        <Reveal preset="heading" distance={18}>
          <div className="mb-12 grid gap-5 border-t border-line pt-5 md:mb-16 md:grid-cols-[8rem_1fr] md:items-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">{sectionNumber} / {id}</p>
            <h2 id={headingId} className="section-title text-[clamp(2.6rem,5vw,5.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.06em] text-ink">{title}</h2>
          </div>
        </Reveal>

        <Reveal preset="body" amount={0.06}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
