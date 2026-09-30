import { about, education, experience, projects, site, skills } from "../content";
import type { ProjectStatus } from "../content";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import Section from "./Section";
import TechIcon from "./TechIcon";
import { Stagger, StaggerItem } from "./motion/Stagger";

const statusTone: Record<ProjectStatus["tone"], string> = {
  ok: "text-ok",
  amber: "text-amber",
  dim: "text-dim",
};

const aboutHighlights = [
  ["Primary focus", "Reliable full stack software"],
  ["Engineering bias", "Tested & observable"],
  ["Current target", "Entry level software engineering"],
] as const;

const socialLinks = [
  { label: "GitHub", href: site.github, Icon: FaGithub },
  { label: "LinkedIn", href: site.linkedin, Icon: FaLinkedinIn },
];

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return <a {...props} target="_blank" rel="noreferrer">{children}</a>;
}

function ProjectDecision({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-xs leading-6 text-mut sm:text-sm">
      <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-amber" aria-hidden="true" />
      {children}
    </li>
  );
}

export default function PortfolioSections() {
  return (
    <div className="portfolio-sections">
      <Section id="about" index={1} title="How I work." eyebrow="Profile / approach" status="open to work">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="about-statement">
            <p className="text-2xl font-medium leading-tight tracking-[-0.035em] text-ink sm:text-3xl md:text-4xl">
              I care about how software behaves when things <span className="text-amber">go wrong.</span>
            </p>
            <p className="mt-6 font-mono text-xs uppercase leading-6 tracking-[0.12em] text-dim">
              Race conditions. Data boundaries. Failed requests. Traffic spikes. The problems that separate a working demo from dependable software.
            </p>
          </div>

          <div className="grid gap-8 text-base leading-8 text-mut sm:grid-cols-2 sm:text-lg">
            {about.paragraphs.map((paragraph, index) => (
              <div key={paragraph} className={index === 0 ? "sm:col-span-2 sm:max-w-4xl" : ""}>
                <span className="mb-3 block font-mono text-[10px] tracking-[0.18em] text-amber">0{index + 1}</span>
                <p>{paragraph}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {aboutHighlights.map(([label, value]) => (
            <div key={label} className="bg-panel px-6 py-7">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">{label}</p>
              <p className="mt-3 text-sm font-medium text-ink">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" index={2} title="Selected systems." eyebrow="Production work" wide emphasis status={`${projects.length} systems indexed`}>
        <Stagger className="grid gap-4 lg:grid-cols-2" stagger={0.06}>
          {projects.map((project, projectIndex) => (
            <StaggerItem key={project.id} preset="card" className={project.featured ? "lg:col-span-2" : ""}>
              <article className={`project-card group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-panel ${project.featured ? "project-card-featured" : ""}`}>
                <div className="project-scan" aria-hidden="true" />
                <div className="relative z-10 flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">System / {String(projectIndex + 1).padStart(2, "0")}</p>
                  <p className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] ${statusTone[project.status.tone]}`}>
                    <span className="status-dot bg-current" />{project.status.label}
                  </p>
                </div>

                <div className={`relative z-10 flex flex-1 flex-col p-5 sm:p-7 ${project.featured ? "lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16" : ""}`}>
                  <div>
                    <h3 className="text-3xl font-semibold uppercase leading-none tracking-[-0.05em] text-ink sm:text-4xl">{project.name}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-amber">{project.oneLiner}</p>
                    <p className="mt-5 text-sm leading-7 text-mut">{project.description}</p>
                    {project.role && <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">{project.role}</p>}
                  </div>

                  <div className={`mt-8 flex flex-1 flex-col ${project.featured ? "lg:mt-0" : ""}`}>
                    <div className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line">
                      {project.metrics.slice(0, 3).map((metric) => (
                        <div key={metric.label} className="bg-bg/65 p-3 sm:p-4">
                          <p className="metric-value text-lg font-semibold text-ink">{metric.value}</p>
                          <p className="mt-1 truncate font-mono text-[8px] uppercase tracking-[0.12em] text-dim">{metric.label}</p>
                        </div>
                      ))}
                    </div>

                    <ul className="mt-6 space-y-3">
                      {project.decisions.slice(0, 1).map((decision) => (
                        <ProjectDecision key={decision}>{decision}</ProjectDecision>
                      ))}
                    </ul>

                    {project.decisions.length > 1 && (
                      <details className="project-details mt-5 border-t border-line pt-4">
                        <summary className="cursor-pointer list-none font-mono text-[9px] uppercase tracking-[0.14em] text-dim transition-colors hover:text-amber">
                          <span>More engineering details</span><span className="detail-marker" aria-hidden="true">+</span>
                        </summary>
                        <ul className="mt-4 space-y-3">
                          {project.decisions.slice(1).map((decision) => (
                            <ProjectDecision key={decision}>{decision}</ProjectDecision>
                          ))}
                        </ul>
                      </details>
                    )}

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-7">
                      <div className="flex max-w-xl flex-wrap gap-2">
                        {project.tags.slice(0, project.featured ? 8 : 4).map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
                      </div>
                      {project.links.length > 0 && (
                        <div className="ml-auto flex shrink-0 gap-2">
                          {project.links.map((link) => (
                            <ExternalLink key={link.label} href={link.href} className="project-link whitespace-nowrap">{link.label} ↗</ExternalLink>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-8 flex justify-end">
          <ExternalLink href={site.github} className="button-quiet project-all-link">
            View all projects on GitHub <span aria-hidden="true">↗</span>
          </ExternalLink>
        </div>
      </Section>

      <Section id="skills" index={3} title="The toolkit." eyebrow="Technologies with a job to do" status="toolchain online">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-2xl font-medium leading-tight tracking-[-0.03em] text-ink sm:text-3xl">I work across the stack, with a strong foundation in backend systems.</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-mut">I pick tools based on the work they need to do: keep data correct, make failures visible, and get the service into production.</p>
          </div>

          <div className="border-t border-line">
            {skills.map((group, index) => (
              <div key={group.group} className="skill-row grid gap-5 border-b border-line py-6 md:grid-cols-[3rem_14rem_1fr]">
                <span className="font-mono text-[10px] text-amber">0{index + 1}</span>
                <h3 className="text-sm font-semibold uppercase tracking-[-0.01em] text-ink">{group.group}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                  {group.items.map((item) => (
                    <span key={item} className="skill-item font-mono text-xs text-mut">
                      <TechIcon name={item} />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="experience" index={4} title="Experience." eyebrow="Built under real constraints" status="history loaded">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
          <div className="border-t border-line">
            {experience.map((item, index) => (
              <article key={`${item.org}-${item.role}`} className="grid gap-5 border-b border-line py-7 sm:grid-cols-[3rem_1fr_auto]">
                <span className="font-mono text-[10px] text-amber">0{index + 1}</span>
                <div>
                  <h3 className="text-lg font-medium text-ink">{item.role}</h3>
                  <p className="mt-1 text-sm text-mut">{item.org}</p>
                  {item.bullets.length > 0 && <p className="mt-4 max-w-2xl text-sm leading-7 text-dim">{item.bullets.join(" ")}</p>}
                </div>
                <div className="font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-dim sm:text-right">
                  <p>{item.period}</p><p>{item.location}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="education-card rounded-[1.5rem] border border-line p-7 sm:p-9 lg:-mt-px lg:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber">Education / completed</p>
            <h3 className="mt-10 text-3xl font-semibold uppercase leading-none tracking-[-0.045em] text-ink">{education.degree}</h3>
            <p className="mt-4 text-base text-mut">{education.school}</p>
            <div className="mt-6 border-t border-line pt-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">Relevant coursework</p>
              <p className="mt-3 text-xs leading-6 text-mut">{education.coursework.join(" · ")}</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line">
              <div className="bg-bg/75 p-4"><p className="font-mono text-[9px] uppercase text-dim">GPA</p><p className="mt-2 text-2xl text-ink">{education.gpa}</p></div>
              <div className="bg-bg/75 p-4"><p className="font-mono text-[9px] uppercase text-dim">Graduated</p><p className="mt-2 text-lg text-ink">{education.grad}</p></div>
            </div>
          </aside>
        </div>
      </Section>

      <Section id="contact" index={5} title="Let's build something reliable." eyebrow="Contact / channel open" wide>
        <div className="contact-panel relative overflow-hidden rounded-[1.75rem] border border-line px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
          <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="max-w-2xl text-lg leading-8 text-mut">I&apos;m applying for entry level software engineering roles, including full stack and backend work. If your team is hiring, send me a note.</p>
              <a href={`mailto:${site.email}`} className="mt-9 inline-flex border-b border-amber pb-2 text-[clamp(1.45rem,4vw,4rem)] font-semibold tracking-[-0.045em] text-ink transition-colors hover:text-amber">{site.email} ↗</a>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {socialLinks.map(({ label, href, Icon }) => (
                <ExternalLink key={label} href={href} className="social-link"><Icon aria-hidden="true" /><span>{label} ↗</span></ExternalLink>
              ))}
              <a href={site.resumeUrl} download={site.resumeFilename} className="social-link">Résumé ↓</a>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
