import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import type { AnchorHTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { about, aiSupportFlow, education, experience, issueTrackerArchitecture, projects, site, skills } from "../content";
import type { Project } from "../content";
import Reveal from "./Reveal";
import Section from "./Section";
import TechIcon from "./TechIcon";
import { useMotionPreferences } from "./motion/MotionPreferences";
import { premiumEase } from "./motion/motionPresets";

const [issueTracker, aiSupport, schoolem, steelworks] = projects;

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
    <li className="project-decision">
      <span aria-hidden="true" />
      <p>{children}</p>
    </li>
  );
}

function ProjectMetrics({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-metrics ${compact ? "project-metrics-compact" : ""}`}>
      {project.metrics.slice(0, 3).map((metric) => (
        <div key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label.replaceAll("_", " ")}</span>
        </div>
      ))}
    </div>
  );
}

function ProjectTags({ project, limit }: { project: Project; limit?: number }) {
  const tags = typeof limit === "number" ? project.tags.slice(0, limit) : project.tags;
  return (
    <div className="project-tags" aria-label={`${project.name} technologies`}>
      {tags.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
    </div>
  );
}

function ProjectDetailDisclosure({
  id,
  label,
  hideLabel = "Hide details",
  children,
}: {
  id: string;
  label: string;
  hideLabel?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { reduceMotion } = useMotionPreferences();

  return (
    <div className={`project-disclosure ${open ? "project-disclosure-open" : ""}`}>
      <button
        type="button"
        className="project-disclosure-button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{open ? hideLabel : label}</span>
        <i aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="project-disclosure-panel"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: premiumEase }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="project-links">
      {project.links.map((link) => (
        <ExternalLink key={link.label} href={link.href} className="project-link">{link.label}</ExternalLink>
      ))}
    </div>
  );
}

function ArchitectureLayers() {
  const { reduceMotion, allowScrollMotion } = useMotionPreferences();
  const scrollMotion = !reduceMotion && allowScrollMotion;

  return (
    <div
      className="architecture-linework"
      role="img"
      aria-label="Issue Tracker architecture with Kubernetes infrastructure, a Java and Spring Boot application layer, and PostgreSQL, Redis, and MinIO data services."
    >
      <div className="architecture-linework-heading" aria-hidden="true">
        <span>System architecture</span>
        <span>Request path</span>
      </div>

      <motion.div
        className="architecture-layers"
        initial={scrollMotion ? "hidden" : "visible"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.14 } },
        }}
        aria-hidden="true"
      >
        <svg className="architecture-trace" viewBox="0 0 48 320" preserveAspectRatio="none">
          <path d="M24 20 L24 300" />
          {scrollMotion && (
            <motion.circle
              cx="24"
              cy="32"
              r="5"
              initial={{ opacity: 0, y: 0 }}
              whileInView={{ opacity: [0, 1, 1, 0], y: [0, 0, 256, 256] }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 2.2, times: [0, 0.12, 0.86, 1], ease: premiumEase }}
            />
          )}
        </svg>

        {issueTrackerArchitecture.map((item, index) => (
          <motion.div
            key={item.layer}
            className={`architecture-layer architecture-layer-${index + 1}`}
            variants={{
              hidden: { opacity: 0, x: 16 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.52, ease: premiumEase } },
            }}
          >
            <span className="architecture-layer-index">0{index + 1}</span>
            <div>
              <span>{item.layer}</span>
              <strong>{item.primary}</strong>
              <small>{item.secondary}</small>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function FeaturedProject() {
  return (
    <article className="featured-project">
      <div className="featured-project-copy">
        <h3>{issueTracker.name}</h3>
        <p className="project-one-liner">{issueTracker.oneLiner}</p>
        <p className="project-description">{issueTracker.description}</p>
        <ProjectMetrics project={issueTracker} />
        <ul className="project-decisions project-decisions-primary">
          {issueTracker.decisions.slice(0, 2).map((decision) => <ProjectDecision key={decision}>{decision}</ProjectDecision>)}
        </ul>
        <ProjectDetailDisclosure id="issue-tracker-engineering-details" label="Explore implementation details">
          <ul className="project-decisions project-decisions-secondary">
            {issueTracker.decisions.slice(2).map((decision) => <ProjectDecision key={decision}>{decision}</ProjectDecision>)}
          </ul>
          <div className="project-detail-tags" aria-label="Additional Issue Tracker technologies">
            {issueTracker.tags.slice(6).map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
          </div>
        </ProjectDetailDisclosure>
        <div className="project-footer">
          <ProjectTags project={issueTracker} limit={6} />
          <ProjectLinks project={issueTracker} />
        </div>
      </div>
      <div className="featured-project-visual">
        <ArchitectureLayers />
      </div>
    </article>
  );
}

function KafkaLinework() {
  const { reduceMotion, allowScrollMotion } = useMotionPreferences();
  const scrollMotion = !reduceMotion && allowScrollMotion;

  return (
    <div
      className="kafka-linework"
      role="img"
      aria-label="The Ticket service publishes a ticket through Kafka to the Classification service. The classification result returns through Kafka to update the ticket."
    >
      <div className="kafka-linework-note">
        <span>Why asynchronous?</span>
        <p>{aiSupportFlow.note}</p>
      </div>

      <div className="kafka-flow" aria-hidden="true">
        <div className="kafka-flow-nodes">
          <div className="kafka-flow-node kafka-flow-ticket">
            <strong>{aiSupportFlow.ticketService.name}</strong>
            <span>{aiSupportFlow.ticketService.detail}</span>
          </div>
          <div className="kafka-flow-node kafka-flow-broker">
            <strong>{aiSupportFlow.broker.name}</strong>
          </div>
          <div className="kafka-flow-node kafka-flow-classification">
            <strong>{aiSupportFlow.classificationService.name}</strong>
            <span>{aiSupportFlow.classificationService.detail}</span>
          </div>
        </div>

        <svg className="kafka-flow-routes" viewBox="0 0 720 176" preserveAspectRatio="none">
          <path className="kafka-flow-route kafka-flow-route-outbound" d="M72 56 H648" />
          <path className="kafka-flow-route kafka-flow-route-inbound" d="M648 124 H72" />
          <circle className="kafka-flow-junction" cx="360" cy="56" r="4" />
          <circle className="kafka-flow-junction" cx="360" cy="124" r="4" />
          {scrollMotion && (
            <>
              <motion.circle
                className="kafka-flow-signal kafka-flow-signal-outbound"
                cx="72"
                cy="56"
                r="5"
                initial={{ opacity: 0, x: 0 }}
                whileInView={{ opacity: [0, 1, 1, 0], x: [0, 0, 576, 576] }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, delay: 0.2, times: [0, 0.1, 0.9, 1], ease: premiumEase }}
              />
              <motion.circle
                className="kafka-flow-signal kafka-flow-signal-inbound"
                cx="648"
                cy="124"
                r="5"
                initial={{ opacity: 0, x: 0 }}
                whileInView={{ opacity: [0, 1, 1, 0], x: [0, 0, -576, -576] }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.8, delay: 2.05, times: [0, 0.1, 0.9, 1], ease: premiumEase }}
              />
            </>
          )}
        </svg>

        <div className="kafka-flow-label kafka-flow-label-outbound">
          <span>{aiSupportFlow.outbound}</span>
          <i>→</i>
        </div>
        <div className="kafka-flow-label kafka-flow-label-inbound">
          <i>←</i>
          <span>{aiSupportFlow.inbound}</span>
        </div>
      </div>
    </div>
  );
}

function EventDrivenProject() {
  const [flowOpen, setFlowOpen] = useState(false);
  const { reduceMotion } = useMotionPreferences();

  return (
    <motion.article
      layout
      className="event-project"
      transition={{ layout: { duration: reduceMotion ? 0 : 0.5, ease: premiumEase } }}
    >
        <div className="event-project-copy">
          <h3>{aiSupport.name}</h3>
          <p className="project-one-liner">{aiSupport.oneLiner}</p>
          <p className="project-description">{aiSupport.description}</p>
          <ProjectMetrics project={aiSupport} compact />
        </div>

        <div className={`kafka-disclosure ${flowOpen ? "kafka-disclosure-open" : ""}`}>
          <div className="kafka-disclosure-summary">
            <div>
              <span>Architecture</span>
              <p aria-label="Ticket service to Kafka to Classification, then back through Kafka to update the ticket">
                Ticket service <i aria-hidden="true">→</i> Kafka <i aria-hidden="true">→</i> Classification
                <i aria-hidden="true">→</i> Kafka <i aria-hidden="true">→</i> Ticket update
              </p>
            </div>
            <button
              type="button"
              className="kafka-disclosure-button"
              aria-expanded={flowOpen}
              aria-controls="ai-support-kafka-flow"
              onClick={() => setFlowOpen((current) => !current)}
            >
              <span>{flowOpen ? "Hide Kafka flow" : "Explore Kafka flow"}</span>
              <i aria-hidden="true" />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {flowOpen && (
              <motion.div
                id="ai-support-kafka-flow"
                className="kafka-disclosure-panel"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: premiumEase }}
              >
                <KafkaLinework />
                <ul className="project-decisions kafka-detail-decisions">
                  {aiSupport.decisions.slice(2).map((decision) => <ProjectDecision key={decision}>{decision}</ProjectDecision>)}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="event-project-details">
          <ul className="project-decisions">
            {aiSupport.decisions.slice(0, 2).map((decision) => <ProjectDecision key={decision}>{decision}</ProjectDecision>)}
          </ul>
          <div className="project-footer">
            <ProjectTags project={aiSupport} />
            <ProjectLinks project={aiSupport} />
          </div>
        </div>
    </motion.article>
  );
}

function SchoolemSignal() {
  const { reduceMotion, allowScrollMotion } = useMotionPreferences();
  const scrollMotion = !reduceMotion && allowScrollMotion;

  return (
    <div
      className="supporting-visual schoolem-signal"
      role="img"
      aria-label="Schoolem messaging service saves a message, then publishes a Supabase Realtime event and notification after the database transaction commits."
    >
      <div className="schoolem-signal-track" aria-hidden="true">
        {[
          ["Messaging", "Spring Boot"],
          ["Saved", "Database"],
          ["Realtime", "Supabase"],
          ["Notify", "After commit"],
        ].map(([label, detail], index) => (
          <motion.div
            key={label}
            className="schoolem-signal-node"
            initial={scrollMotion ? { opacity: 0, y: 8 } : false}
            whileInView={scrollMotion ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.45, delay: scrollMotion ? index * 0.08 : 0, ease: premiumEase }}
          >
            <span>0{index + 1}</span>
            <strong>{label}</strong>
            <small>{detail}</small>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SteelWorksQuality() {
  const { reduceMotion, allowScrollMotion } = useMotionPreferences();
  const scrollMotion = !reduceMotion && allowScrollMotion;

  return (
    <div
      className="supporting-visual steelworks-quality"
      role="img"
      aria-label="SteelWorks quality path from the Python dashboard through pytest and Playwright testing, Sentry monitoring, and Docker deployment consistency."
    >
      <div className="steelworks-quality-heading" aria-hidden="true">
        <span>Quality path</span>
        <span>Capstone</span>
      </div>
      <div className="steelworks-quality-track" aria-hidden="true">
        {["Python dashboard", "pytest", "Playwright", "Sentry", "Docker"].map((label, index) => (
          <motion.div
            key={label}
            className="steelworks-quality-step"
            initial={scrollMotion ? { opacity: 0, x: -8 } : false}
            whileInView={scrollMotion ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.45, delay: scrollMotion ? index * 0.07 : 0, ease: premiumEase }}
          >
            <i />
            <span>{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SupportingProject({ project, variant }: { project: Project; variant: "schoolem" | "steelworks" }) {
  const descriptionSentences = project.description.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()) ?? [project.description];
  const [descriptionSummary, ...descriptionDetails] = descriptionSentences;

  return (
    <article className={`supporting-project supporting-project-${variant}`}>
      <div className="supporting-project-copy">
        <h3>{project.name}</h3>
        <p className="project-one-liner">{project.oneLiner}</p>
        {project.role && <p className="project-role">{project.role}</p>}
        <p className="project-description">{descriptionSummary}</p>
      </div>
      <div className="supporting-project-evidence">
        <ProjectMetrics project={project} compact />
        <ul className="project-decisions project-decisions-primary">
          {project.decisions.slice(0, 1).map((decision) => <ProjectDecision key={decision}>{decision}</ProjectDecision>)}
        </ul>
      </div>
      <div className="supporting-project-artifact">
        {variant === "schoolem" ? <SchoolemSignal /> : <SteelWorksQuality />}
      </div>
      <div className="supporting-project-meta">
        <ProjectDetailDisclosure id={`${project.id}-engineering-details`} label="View engineering notes">
          {descriptionDetails.length > 0 && <p className="project-detail-copy">{descriptionDetails.join(" ")}</p>}
          <ul className="project-decisions project-decisions-secondary">
            {project.decisions.slice(1).map((decision) => <ProjectDecision key={decision}>{decision}</ProjectDecision>)}
          </ul>
          {project.tags.length > 4 && (
            <div className="project-detail-tags" aria-label={`Additional ${project.name} technologies`}>
              {project.tags.slice(4).map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}
            </div>
          )}
        </ProjectDetailDisclosure>
        <div className="project-footer">
          <ProjectTags project={project} limit={4} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { reduceMotion, allowScrollMotion } = useMotionPreferences();
  const selectedProject = projects[selectedIndex];
  const panelMotion = !reduceMotion && allowScrollMotion;

  const selectProject = (index: number, moveFocus = false) => {
    setSelectedIndex(index);
    if (moveFocus) tabRefs.current[index]?.focus();
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % projects.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + projects.length) % projects.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = projects.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      selectProject(nextIndex, true);
    }
  };

  const renderSelectedProject = () => {
    switch (selectedProject.id) {
      case issueTracker.id:
        return <FeaturedProject />;
      case aiSupport.id:
        return <EventDrivenProject />;
      case schoolem.id:
        return <SupportingProject project={schoolem} variant="schoolem" />;
      default:
        return <SupportingProject project={steelworks} variant="steelworks" />;
    }
  };

  return (
    <Reveal preset="body" amount={0.08}>
      <div className="project-gallery">
        <div className="project-gallery-heading">
          <p>Project index</p>
          <span>Choose a project to inspect its architecture, engineering decisions, and evidence.</span>
        </div>

        <div className="project-gallery-index" role="tablist" aria-label="Selected software projects">
          {projects.map((project, index) => {
            const selected = selectedIndex === index;
            const evidence = project.metrics[0];

            return (
              <button
                key={project.id}
                ref={(node) => { tabRefs.current[index] = node; }}
                id={`project-tab-${project.id}`}
                type="button"
                role="tab"
                className={`project-selector ${selected ? "project-selector-selected" : ""}`}
                aria-selected={selected}
                aria-controls={`project-panel-${project.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectProject(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <span className="project-selector-topline">
                  <span>0{index + 1}</span>
                  <span>{selected ? "Selected" : "View project"}</span>
                </span>
                <strong>{project.name}</strong>
                <span className="project-selector-summary">{project.oneLiner}</span>
                {evidence && (
                  <span className="project-selector-evidence">
                    <span>{evidence.label.replaceAll("_", " ")}</span>
                    <strong>{evidence.value}</strong>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="project-stage">
          <div className="project-stage-heading" aria-hidden="true">
            <span>Selected case study</span>
            <span>0{selectedIndex + 1} / 0{projects.length}</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedProject.id}
              id={`project-panel-${selectedProject.id}`}
              role="tabpanel"
              aria-labelledby={`project-tab-${selectedProject.id}`}
              className="project-stage-panel"
              initial={{ opacity: 0, y: panelMotion ? 16 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: panelMotion ? -10 : 0 }}
              transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: premiumEase }}
            >
              {renderSelectedProject()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}

export default function PortfolioSections() {
  const coreSkillNames = new Set(["Java", "Spring Boot", "Apache Kafka", "REST APIs", "Kubernetes", "Docker", "PostgreSQL", "Redis"]);
  const coreSkills = skills.flatMap((group) => group.items).filter((item) => coreSkillNames.has(item));

  return (
    <div className="portfolio-sections">
      <Section id="projects" title="Systems with evidence." wide>
        <div className="projects-intro">
          <p>Selected work</p>
          <span>Backend architecture, data boundaries, asynchronous services, automated tests, and production monitoring.</span>
        </div>
        <ProjectGallery />
        <div className="mt-8 flex justify-end">
          <ExternalLink href={site.github} className="button-quiet project-all-link">View all projects on GitHub</ExternalLink>
        </div>
      </Section>

      <Section id="about" title="Profile and core stack.">
        <div className="profile-stack-layout">
          <div className="profile-column">
            <p className="profile-label">Backend first. Full stack when it matters.</p>
            <div className="about-copy">
              {about.paragraphs.map((paragraph) => (
                <div key={paragraph}>
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>
          </div>

          <section id="skills" className="core-stack-panel" aria-labelledby="skills-heading">
            <div className="core-stack-heading">
              <div>
                <span>Core backend stack</span>
                <h3 id="skills-heading">Java systems from API to deployment.</h3>
              </div>
              <p>Languages, frameworks, infrastructure, data, testing, and observability.</p>
            </div>
            <div className="core-skills" aria-label="Core backend technologies">
              {coreSkills.map((item) => (
                <span key={item} className="core-skill-item">
                  <TechIcon name={item} />
                  <strong>{item}</strong>
                </span>
              ))}
            </div>
            <div className="skills-list skills-list-supporting">
              {skills.map((group) => {
                const supportingItems = group.items.filter((item) => !coreSkillNames.has(item));
                if (supportingItems.length === 0) return null;
                return (
                  <div key={group.group} className="skill-row">
                    <h3>{group.group}</h3>
                    <div>
                      {supportingItems.map((item) => (
                        <span key={item} className="skill-item">
                          <TechIcon name={item} />
                          <span>{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </Section>

      <Section id="experience" title="Education and experience.">
        <div className="experience-layout experience-layout-education-first">
          <aside className="education-card">
            <p className="education-kicker">Education</p>
            <h3>{education.degree}</h3>
            <p>{education.school}</p>
            <div className="education-metrics">
              <div><strong>{education.gpa}</strong><span>GPA</span></div>
              <div><strong>{education.grad}</strong><span>Graduated</span></div>
            </div>
            <div className="education-coursework">
              <span>Relevant coursework</span>
              <p>{education.coursework.join(" · ")}</p>
            </div>
          </aside>

          <div className="experience-list">
            {experience.map((item) => (
              <article key={`${item.org}-${item.role}`}>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.org}</p>
                  {item.bullets.length > 0 && <p className="experience-detail">{item.bullets.join(" ")}</p>}
                </div>
                <div className="experience-meta"><p>{item.period}</p><p>{item.location}</p></div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact" title="Build something reliable." wide>
        <div className="contact-panel">
          <div>
            <p>For software engineering opportunities, project questions, or a conversation about the work shown here.</p>
            <a href={`mailto:${site.email}`} className="contact-email">{site.email}</a>
          </div>
          <div className="contact-links">
            {socialLinks.map(({ label, href, Icon }) => (
              <ExternalLink key={label} href={href} className="social-link"><Icon aria-hidden="true" /><span>{label}</span></ExternalLink>
            ))}
            <a href={site.resumeUrl} download={site.resumeFilename} className="social-link">Résumé</a>
          </div>
        </div>
      </Section>
    </div>
  );
}
