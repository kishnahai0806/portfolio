/**
 * All site content lives here. Edit text, projects, links, etc. without
 * touching any component.
 */

export const site = {
  name: "Krish Prajapati",
  title: "Software Engineer",
  tagline:
    "I build software across the stack, with my strongest experience in Java backend systems. I work on the interface, the API, the data behind it, and the tests that keep it working.",
  email: "kprajapati0806@gmail.com",
  github: "https://github.com/kishnahai0806",
  linkedin: "https://www.linkedin.com/in/krish-prajapati-swe",
  resumeUrl: "/resume.pdf", // place the final PDF at public/resume.pdf
  resumeFilename: "Krish_Prajapati_Resume.pdf",
};

export const education = {
  school: "Purdue University Northwest",
  degree: "B.S. Computer Science",
  gpa: "3.86",
  grad: "May 2026",
  coursework: [
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Database Systems",
    "Software Engineering",
    "Network Programming",
    "Computer Architecture",
    "Artificial Intelligence",
  ],
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  paragraphs: [
    `I graduated from ${education.school} in ${education.grad} with a computer science degree and a ${education.gpa} GPA. I work across the stack, from React interfaces to backend services, automated tests, and production monitoring.`,
    "My main projects include an issue tracker that isolates each organization, two support services connected through Kafka, and the messaging backend for a college social platform.",
  ],
};

export type Project = {
  id: string;
  name: string;
  oneLiner: string;
  description: string;
  role?: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  decisions: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "issue-tracker",
    name: "Issue Tracker",
    oneLiner: "Jira style project management for multiple organizations on Kubernetes.",
    description:
      "An issue tracker with role based access control, WebSocket/STOMP updates, transactional email, file attachments through presigned URLs, and nightly Spring Batch analytics. Configured Kubernetes autoscaling from 2 to 8 replicas; demonstrated scaling from 2 to 5 locally under load.",
    tags: [
      "Java 21",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "MinIO",
      "Kubernetes",
      "Spring Batch",
      "WebSocket/STOMP",
      "Prometheus",
      "Grafana",
    ],
    metrics: [
      { label: "tests", value: "129" },
      { label: "coverage", value: "80%+" },
      { label: "load_test_replicas", value: "2 to 5" },
    ],
    decisions: [
      "Kept each organization's data separate across database queries, live updates, and cached data, with integration tests to catch leaks.",
      "Used a Redis Lua script to make refresh token rotation atomic. Tokens are SHA256 hashed before blacklisting, and Bucket4j applies distributed rate limits.",
      "Used Redis pub/sub to fan STOMP events across replicas. ShedLock keeps scheduled jobs from running twice.",
    ],
    links: [{ label: "Source code", href: "https://github.com/kishnahai0806/Issue-Tracker" }],
  },
  {
    id: "ai-support",
    name: "AI Support Platform",
    oneLiner: "Kafka connects two services that classify and route support tickets.",
    description:
      "Customers can submit tickets without waiting for the AI classification result.",
    tags: ["Spring Boot", "Kafka", "OpenAI API", "PostgreSQL", "Redis", "Railway", "Docker"],
    metrics: [
      { label: "tests", value: "74" },
      { label: "coverage", value: "80%" },
      { label: "services", value: "2" },
    ],
    decisions: [
      "A failed model call stays out of the ticket submission path. The classification service returns its result through Kafka.",
      "Added Micrometer metrics for ticket throughput, processing time, and model confidence, then graphed them in Grafana.",
      "CI runs 74 automated tests and fails if coverage drops below 80%.",
    ],
    links: [
      { label: "Source code", href: "https://github.com/kishnahai0806/AI-Support-Platform" },
    ],
  },
  {
    id: "schoolem",
    name: "Schoolem",
    oneLiner: "Live social platform for verified college students (team of 4).",
    description:
      "A college social platform with university feeds, posts, follows, notifications, and direct messages. The messaging service runs as a stateless Spring Boot resource server that validates Supabase JWTs.",
    role: "Software Developer, messaging service owner",
    tags: ["React", "TypeScript", "Supabase", "Spring Boot", "Java 21", "Postgres RLS"],
    metrics: [
      { label: "tests", value: "93" },
    ],
    decisions: [
      "Built the messaging service with follow checks, per user limits, pagination, read receipts, and safe deletion.",
      "Published Supabase Realtime events after the database transaction committed. Notifications never announce a message that failed to save.",
      "Covered the service with 93 unit and integration tests.",
    ],
    links: [{ label: "Live site", href: "https://officialschoolem.org" }],
  },
  {
    id: "steelworks",
    name: "SteelWorks",
    oneLiner: "Manufacturing metrics dashboard for my senior capstone.",
    description:
      "Filter weekly production issues by line and export the results as CSV. Pytest covers the business logic, Playwright covers browser flows, Sentry reports runtime errors, and Docker keeps local and deployed environments consistent.",
    tags: ["Python", "pytest", "Playwright", "Sentry", "Docker"],
    metrics: [],
    decisions: [
      "Wrote Playwright tests against the running UI for the workflows most likely to break.",
      "Added Sentry early so runtime failures include the request and browser context needed to debug them.",
      "Used Docker to keep the development and deployment environments consistent.",
    ],
    links: [{ label: "Source code", href: "https://github.com/kishnahai0806/SteelWorks" }],
  },
];

export const aiSupportFlow = {
  note: "Ticket creation returns before classification finishes.",
  ticketService: {
    name: "Ticket service",
    detail: "Spring Boot API",
  },
  broker: {
    name: "Kafka",
  },
  classificationService: {
    name: "Classification service",
    detail: "OpenAI classification",
  },
  outbound: "Ticket created",
  inbound: "Classification result",
};

export const issueTrackerArchitecture = [
  {
    layer: "Infrastructure",
    primary: "Kubernetes",
    secondary: "2 to 8 replicas",
  },
  {
    layer: "Application",
    primary: "Java 21 / Spring Boot",
    secondary: "WebSocket / Spring Batch",
  },
  {
    layer: "Data",
    primary: "PostgreSQL / Redis",
    secondary: "MinIO",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Java", "Python", "TypeScript", "SQL", "C"],
  },
  {
    group: "Frameworks & Libraries",
    items: [
      "Spring Boot",
      "Apache Kafka",
      "REST APIs",
      "React",
      "JUnit",
      "Testcontainers",
      "Playwright",
    ],
  },
  {
    group: "Cloud & Infrastructure",
    items: [
      "Kubernetes",
      "Docker",
      "AWS",
      "PostgreSQL",
      "Redis",
      "Supabase",
    ],
  },
  {
    group: "Tools & Observability",
    items: [
      "Git",
      "GitHub Actions (CI/CD)",
      "Prometheus",
      "Grafana",
      "Sentry",
      "OpenTelemetry",
    ],
  },
];

export const experience = [
  {
    org: "Amazon",
    role: "Warehouse Associate",
    location: "Matteson, IL",
    period: "Aug 2023 to Present",
    bullets: [
      `Handled high-volume package processing with consistent accuracy and safety while working more than 20 hours per week alongside a full-time computer science course load and maintaining a ${education.gpa} GPA.`,
    ],
  },
  {
    org: "Computer Science Club, Purdue University Northwest",
    role: "Member",
    location: "Hammond, IN",
    period: "Aug 2023 to May 2026",
    bullets: [],
  },
];

