import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
};

export default function Section({ id, title, children, wide = false }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="section-frame relative scroll-mt-24 border-b border-line py-20 md:py-28">
      <div className={`mx-auto px-5 sm:px-8 lg:px-12 ${wide ? "max-w-[90rem]" : "max-w-[82rem]"}`}>
        <div className="section-heading mb-12 border-t border-line pt-5 md:mb-16">
          <h2 id={headingId} className="section-title max-w-4xl text-5xl font-semibold leading-none tracking-[-0.055em] text-ink md:text-6xl">{title}</h2>
        </div>

        {children}
      </div>
    </section>
  );
}
