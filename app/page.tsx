"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  PiArrowDown,
  PiArrowUpRight,
  PiCheck,
  PiDownloadSimple,
  PiGithubLogo,
  PiPlus,
  PiMinus,
} from "react-icons/pi";
import { SendEmail } from "./server-actions";
import { SystemVisual } from "./system-visual";

const experience = [
  {
    company: "Geographic Solutions",
    role: "Programmer / Analyst III",
    date: "Jan 2025 — Present",
    location: "Palm Harbor, FL",
    description:
      "Developing and maintaining workforce development and unemployment insurance applications for state and federal clients. Improving data processing, user experience, and operational efficiency alongside cross-functional teams.",
    tags: [
      "Application development",
      "Data processing",
      "Cross-functional delivery",
    ],
  },
  {
    company: "Alita Systems",
    role: "Full Stack Software Engineer",
    date: "Feb 2024 — Jan 2025",
    location: "Remote",
    description:
      "Built React and Node.js web features and REST APIs connecting interfaces, services, and databases. Designed a caretaker application for visit forms and secure offline access to health data, and collaborated on code reviews to improve maintainability.",
    tags: ["React", "Node.js", "REST APIs", "Offline workflows"],
  },
  {
    company: "DigitalCM",
    role: "Full Stack Software Engineer",
    date: "Aug 2023 — Feb 2024",
    location: "Tampa, FL",
    description:
      "Developed APIs and service integrations across full stack applications, including features for Alita Systems client platforms. Reviewed releases, resolved defects, and built collaborative VR/AR training solutions.",
    tags: ["API development", "Service integration", "VR / AR"],
  },
  {
    company: "BackToCAD Technologies",
    role: "Junior Software Developer",
    date: "Sep 2021 — Jul 2022",
    location: "",
    description:
      "Developed CAD application features and improved conversion library usability. Debugged design tools and user workflows, and tested updates using manual and automated checks.",
    tags: ["CAD software", "Debugging", "Software testing"],
  },
];

const work = [
  {
    number: "01",
    type: "Workforce software",
    company: "Geographic Solutions · 2025 — Present",
    title: "Workforce services",
    description:
      "Applications behind workforce development and unemployment insurance. I develop features, streamline data processing, and improve the experience for the people who depend on these systems.",
    tags: ["Application development", "Data workflows", "User experience"],
    details:
      "My work includes maintaining applications for state and federal clients, defining project scope with cross-functional teams, and implementing features that improve operational efficiency and minimize downtime.",
    kind: "workforce",
  },
  {
    number: "02",
    type: "Full stack · Healthcare",
    company: "Alita Systems · 2024 — 2025",
    title: "Offline tools for caretakers",
    description:
      "A web application designed around caretakers: complete visit forms and securely access health data offline. React interfaces, Node.js features, and REST APIs connect the experience from front to back.",
    tags: ["React", "Node.js", "REST APIs"],
    details:
      "I designed the caretaker web application, developed product features, and built APIs connecting front-end screens to back-end services and databases. Code reviews with other engineers helped keep the software maintainable.",
    kind: "healthcare",
  },
  {
    number: "03",
    type: "Immersive software",
    company: "DigitalCM · 2023 — 2024",
    title: "Collaborative VR/AR training",
    description:
      "Collaborative VR/AR training solutions that bring learning into a shared environment. Alongside immersive development, I built APIs and integrated services across full stack applications.",
    tags: ["VR / AR", "Collaboration", "Service integration"],
    details:
      "At DigitalCM, I developed collaborative VR/AR training solutions, built web and backend features for Alita Systems client platforms, and reviewed and fixed defects in software releases.",
    kind: "immersive",
  },
];

function ProjectVisual({ kind }: { kind: string }) {
  return (
    <div className={`project-visual ${kind}`} aria-hidden="true">
      <div className="visual-topline">
        <span>
          {kind === "workforce"
            ? "Workflow diagram"
            : kind === "healthcare"
              ? "Interface mockup"
              : "Spatial model"}
        </span>
        <span>Concept study</span>
      </div>
      {kind === "workforce" ? (
        <div className="workflow-art">
          <div className="workflow-track">
            <span>01 / INTAKE</span>
            <span>02 / PROCESS</span>
            <span>03 / DELIVER</span>
          </div>
          <svg viewBox="0 0 560 240" fill="none">
            <path
              className="diagram-line"
              d="M65 120H195M365 120H495M280 45V195"
            />
            <path
              className="diagram-line secondary"
              d="M65 60H145V120M65 180H145V120M415 120V60H495M415 120V180H495"
            />
            <rect
              x="205"
              y="70"
              width="150"
              height="100"
              rx="4"
              className="diagram-core"
            />
            <path
              d="m245 112 14 14 33-33M312 101h20M312 116h20M245 146h87"
              className="diagram-detail"
            />
            {[
              [65, 60],
              [65, 120],
              [65, 180],
              [495, 60],
              [495, 120],
              [495, 180],
            ].map(([x, y], i) => (
              <g key={i}>
                <rect
                  x={x - 19}
                  y={y - 15}
                  width="38"
                  height="30"
                  rx="3"
                  className="diagram-node"
                />
                <circle cx={x} cy={y} r="3" className="diagram-dot" />
              </g>
            ))}
          </svg>
          <div className="visual-bottomline">
            <span>Intake to delivery</span>
          </div>
        </div>
      ) : kind === "healthcare" ? (
        <div className="care-art">
          <div className="care-window">
            <div className="care-window-head">
              <span>
                <i /> Visit workspace
              </span>
              <span>OFFLINE READY</span>
            </div>
            <div className="care-window-body">
              <div className="care-sidebar">
                <span className="care-sidebar-active" />
                <span />
                <span />
                <span />
              </div>
              <div className="care-form-art">
                <span className="care-form-title">
                  Visit summary
                </span>
                <div className="care-input-art">
                  <span />
                  <PiCheck />
                </div>
                <div className="care-input-art">
                  <span />
                  <PiCheck />
                </div>
                <div className="care-note-art" />
                <div className="care-saved">
                  <PiCheck /> Available offline
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="spatial-art">
          <div className="spatial-grid" />
          <div className="spatial-cube">
            <span />
            <span />
            <span />
          </div>
          <div className="spatial-point point-one">
            <i />
            <span>SHARED SPACE</span>
          </div>
          <div className="spatial-point point-two">
            <i />
            <span>CONNECTED LEARNING</span>
          </div>
          <div className="spatial-orbit" />
        </div>
      )}
    </div>
  );
}

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Page() {
  const [activeSection, setActiveSection] = useState("");
  const [openWork, setOpenWork] = useState<string | null>(null);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("main > section[id]"),
    ).reverse();
    const updateActiveSection = () => {
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      const active = atBottom
        ? sections[0]
        : sections.find(
            (section) =>
              section.getBoundingClientRect().top <= window.innerHeight * 0.25,
          );
      setActiveSection(active?.id ?? "");
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formStatus === "sending") return;
    setFormStatus("sending");
    try {
      const result = await SendEmail(senderName, senderEmail, senderMessage);
      if (!result.ok) {
        setFormStatus("error");
        return;
      }
      setSenderName("");
      setSenderEmail("");
      setSenderMessage("");
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <a className="name-link" href="#top" aria-label="Alex Mills, home">
          Alex Mills<span className="name-dot">.</span>
        </a>
        <nav className="main-nav" aria-label="Primary navigation">
          {[
            ["work", "Work"],
            ["experience", "Experience"],
            ["about", "About"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "location" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="header-contact"
          href="#contact"
          aria-current={activeSection === "contact" ? "location" : undefined}
        >
          Contact <PiArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section
          className="hero section-wrap"
          id="intro"
          aria-labelledby="hero-title"
        >
          <div className="hero-main">
            <div className="hero-copy">
              <h1 id="hero-title">
                Alex Mills<span>.</span>
              </h1>
              <p className="hero-role">Software engineer</p>
              <p className="hero-description">
                I build full stack applications and APIs that make complex
                workflows easier to use.
              </p>
              <div className="hero-actions">
                <a className="primary-link" href="#work">
                  View my work <PiArrowDown aria-hidden="true" />
                </a>
                <a className="text-link" href="/Alex_Mills_Resume.pdf" download>
                  Résumé <PiDownloadSimple aria-hidden="true" />
                </a>
              </div>
              <p className="hero-location">Based in Palm Harbor, Florida</p>
            </div>
            <SystemVisual />
          </div>
        </section>

        <div className="skills-strip" aria-label="Core technical skills">
          <div className="section-wrap">
            <span className="strip-label">Core skills</span>
            {[
              "React",
              "Node.js",
              "REST APIs",
              "Git",
              "Software testing",
              "VR / AR",
            ].map((skill) => (
              <span className="strip-skill" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <section
          className="work-section section-wrap"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <h2 id="work-title">Selected work</h2>
            <p>
              Workforce services, healthcare software, and immersive training.
            </p>
          </div>
          <div className="project-list">
            {work.map((project) => (
              <article
                className="project"
                key={project.number}
                aria-labelledby={`project-${project.number}`}
              >
                <ProjectVisual kind={project.kind} />
                <div className="project-copy">
                  <h3 id={`project-${project.number}`}>{project.title}</h3>
                  <p className="project-type">{project.type}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="tag-list">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-footer">
                    <span>{project.company}</span>
                    <button
                      type="button"
                      aria-expanded={openWork === project.number}
                      aria-controls={`work-details-${project.number}`}
                      onClick={() =>
                        setOpenWork(
                          openWork === project.number ? null : project.number,
                        )
                      }
                    >
                      {openWork === project.number
                        ? "Less detail"
                        : "My contribution"}
                      {openWork === project.number ? (
                        <PiMinus aria-hidden="true" />
                      ) : (
                        <PiPlus aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <div
                    className="project-details"
                    id={`work-details-${project.number}`}
                    hidden={openWork !== project.number}
                  >
                    <p>{project.details}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="work-disclosure">
            <span aria-hidden="true">↳</span> Project visuals are original
            concept studies based on my professional work.
          </p>
        </section>

        <section
          className="experience-section section-wrap"
          id="experience"
          aria-labelledby="experience-title"
        >
          <div className="section-heading">
            <h2 id="experience-title">Experience</h2>
            <a className="text-link" href="/Alex_Mills_Resume.pdf" download>
              Download résumé <PiDownloadSimple aria-hidden="true" />
            </a>
          </div>
          <div className="timeline">
            {experience.map((job, i) => (
              <article className="experience-row" key={job.company}>
                <div className="experience-date">
                  <span
                    className={i === 0 ? "current-marker" : "timeline-marker"}
                  />
                  <span>{job.date}</span>
                  {i === 0 && <small>Current role</small>}
                </div>
                <div className="experience-company">
                  <h3>{job.company}</h3>
                  <p>{job.role}</p>
                  {job.location && <span>{job.location}</span>}
                </div>
                <div className="experience-description">
                  <p>{job.description}</p>
                  <div className="experience-tags">
                    {job.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="about-section section-wrap"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-lead">
            <h2 id="about-title">About me</h2>
            <a
              className="github-link"
              href="https://github.com/alexbmills5"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PiGithubLogo aria-hidden="true" /> Find me on GitHub{" "}
              <PiArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="about-copy">
            <p className="about-intro">
              I like the point where a complex problem becomes a clear, useful
              experience.
            </p>
            <p>
              I’m a software engineer based in Palm Harbor, Florida, with
              experience in API development, full stack web applications, and
              user experience design. My work has taken me through CAD software,
              healthcare applications, immersive training, and workforce
              systems.
            </p>
            <p>
              I work across the interface and the services behind it, using
              React, Node.js, and REST APIs. I care about maintainable code,
              thoughtful testing, and collaborating with people who bring
              different perspectives to a problem.
            </p>
            <div className="education">
              <span className="eyebrow">Education</span>
              <p>High School Diploma, Computer Science</p>
              <span>Penn Foster · Remote / Tampa, FL</span>
            </div>
          </div>
        </section>

        <section
          className="contact-section section-wrap"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-intro">
            <h2 id="contact-title">
              Let’s talk<span>.</span>
            </h2>
            <p>
              Have an engineering opportunity or a project in mind? I’d like
              to hear about it.
            </p>
            <a className="email-link" href="mailto:alexbmills@pm.me">
              alexbmills@pm.me <PiArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <form
            className="contact-form"
            aria-label="Send Alex a message"
            onSubmit={handleSendMessage}
          >
            <label>
              <span>Your name</span>
              <input
                value={senderName}
                onChange={(event) => setSenderName(event.target.value)}
                type="text"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
              />
            </label>
            <label>
              <span>Email address</span>
              <input
                value={senderEmail}
                onChange={(event) => setSenderEmail(event.target.value)}
                type="email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
              />
            </label>
            <label>
              <span>Message</span>
              <textarea
                value={senderMessage}
                onChange={(event) => setSenderMessage(event.target.value)}
                name="message"
                rows={3}
                required
                maxLength={4000}
              />
            </label>
            <div
              className={`form-status ${formStatus}`}
              role="status"
              aria-live="polite"
            >
              {formStatus === "sent" &&
                "Message received. Thanks for reaching out."}
              {formStatus === "error" && (
                <>
                  Your message couldn’t be sent. Please try again or{" "}
                  <a href="mailto:alexbmills@pm.me">email me directly</a>.
                </>
              )}
            </div>
            <button
              className="primary-link"
              type="submit"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending…" : "Send message"}
              <PiArrowUpRight aria-hidden="true" />
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="name-link" href="#top">
          Alex Mills<span className="name-dot">.</span>
        </a>
        <span>© {new Date().getFullYear()} Alex Mills</span>
        <a href="#top">
          Back to top <PiArrowUpRight aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
