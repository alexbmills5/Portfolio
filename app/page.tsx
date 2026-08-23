"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { Syne } from "next/font/google";
import { PiArrowDownRight, PiArrowUpRight } from "react-icons/pi";
import { SendEmail } from "./server-actions";

const syne = Syne({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
});

const upcomingWork = [
  { label: "Campaign graphics", status: "Case study coming soon" },
  { label: "Poster design", status: "Case study coming soon" },
  { label: "Motion and typography", status: "Case study coming soon" },
];

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Page() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [retalsOpen, setRetalsOpen] = useState(false);

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");

    const result = await SendEmail(senderName, senderEmail, senderMessage);
    if (!result.ok) {
      setFormStatus("error");
      return;
    }

    setSenderName("");
    setSenderEmail("");
    setSenderMessage("");
    setFormStatus("sent");
  };

  return (
    <div className={`${syne.variable} site-shell`}>
      <a className="skip-link" href="#main-content">
        Skip to work
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Alex Mills, home">
          <Image
            className="brand-mark"
            src="/alex-mills-logo.png"
            alt=""
            width={40}
            height={40}
            sizes="40px"
            priority
          />
          <span>Alex Mills</span>
        </a>

        <nav className="main-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <span className="header-coordinate" aria-hidden="true">
          Graphic design · Portfolio
        </span>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="cosmos" aria-hidden="true">
            <span className="star-glint star-glint-one" />
            <span className="star-glint star-glint-two" />
            <span className="star-glint star-glint-three" />
            <span className="shooting-star" />
          </div>
          <div className="hero-refraction" aria-hidden="true" />
          <div className="hero-logo" aria-hidden="true">
            <Image
              src="/alex-mills-logo.png"
              alt=""
              width={1254}
              height={1254}
              sizes="(max-width: 640px) 78vw, (max-width: 1000px) 66vw, 52vw"
              priority
            />
          </div>

          <div className="hero-kicker">
            <span>Independent graphic designer</span>
          </div>

          <div className="hero-copy">
            <h1 id="hero-title">
              Visual ideas,
              <span>made distinct.</span>
            </h1>
            <p>
              Graphic design, identity systems, and digital experiences by Alex
              Mills.
            </p>
          </div>

          <a className="hero-scroll" href="#work">
            View selected work <PiArrowDownRight aria-hidden="true" />
          </a>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">Portfolio</p>
            <h2 id="work-title">Selected work</h2>
            <p className="section-note">
              A focused selection of visual design and digital work. More case
              studies will be added as they are completed.
            </p>
          </div>

          <div className="work-grid">
            <article className="retals-case-study" aria-labelledby="retals-title">
              <header className="case-study-preview">
                <div className="case-preview-art" aria-hidden="true">
                  <Image
                    src="/retals-wordmark-script.png"
                    alt=""
                    width={2172}
                    height={724}
                    sizes="(max-width: 640px) calc(100vw - 2rem), 15rem"
                  />
                </div>

                <div className="case-preview-copy">
                  <p className="case-study-type">Brand identity · Esports</p>
                  <h3 id="retals-title">Retals</h3>
                  <p>
                    Logo explorations for Rocket League content creator Retals,
                    developed around speed, competition, and a recognizable R mark.
                  </p>
                </div>

                <button
                  className="case-preview-toggle"
                  type="button"
                  aria-expanded={retalsOpen}
                  aria-controls="retals-project-details"
                  onClick={() => setRetalsOpen((isOpen) => !isOpen)}
                >
                  <span>{retalsOpen ? "Close project" : "View project"}</span>
                  <PiArrowDownRight aria-hidden="true" />
                </button>
              </header>

              {retalsOpen && (
                <div className="case-study-details" id="retals-project-details">
                  <div className="retals-gallery">
                    <figure className="retals-board retals-board-featured">
                      <div className="retals-artwork retals-artwork-wide">
                        <Image
                          src="/retals-wordmark-script.png"
                          alt="Angular Retals script wordmark with a star integrated into the letter R"
                          width={2172}
                          height={724}
                          sizes="(max-width: 640px) calc(100vw - 2rem), 92vw"
                        />
                      </div>
                      <figcaption>
                        <span>Direction 03</span>
                        <span>Script wordmark</span>
                      </figcaption>
                    </figure>

                    <figure className="retals-board retals-board-half">
                      <div className="retals-artwork">
                        <Image
                          src="/retals-wordmark-crown.png"
                          alt="Retals wordmark concept with an angular crown above the letter R"
                          width={1672}
                          height={941}
                          sizes="(max-width: 640px) calc(100vw - 2rem), 46vw"
                        />
                      </div>
                      <figcaption>
                        <span>Direction 01</span>
                        <span>Crown wordmark</span>
                      </figcaption>
                    </figure>

                    <figure className="retals-board retals-board-half">
                      <div className="retals-artwork">
                        <Image
                          src="/retals-wordmark-star.png"
                          alt="Retals wordmark concept with a sweeping R and four-point star"
                          width={1672}
                          height={941}
                          sizes="(max-width: 640px) calc(100vw - 2rem), 46vw"
                        />
                      </div>
                      <figcaption>
                        <span>Direction 02</span>
                        <span>Star wordmark</span>
                      </figcaption>
                    </figure>

                    <figure className="retals-board retals-board-mark-small">
                      <div className="retals-artwork retals-artwork-mark">
                        <Image
                          src="/retals-monogram-crown.png"
                          alt="Standalone Retals R monogram with crown"
                          width={286}
                          height={283}
                          sizes="(max-width: 640px) calc(100vw - 2rem), 36vw"
                        />
                      </div>
                      <figcaption>
                        <span>Core mark</span>
                        <span>Crown monogram</span>
                      </figcaption>
                    </figure>

                    <figure className="retals-board retals-board-mark-wide">
                      <div className="retals-artwork retals-artwork-mark">
                        <Image
                          src="/retals-monogram-star.png"
                          alt="Standalone Retals R monogram with integrated star"
                          width={495}
                          height={291}
                          sizes="(max-width: 640px) calc(100vw - 2rem), 54vw"
                        />
                      </div>
                      <figcaption>
                        <span>Core mark</span>
                        <span>Star monogram</span>
                      </figcaption>
                    </figure>
                  </div>
                </div>
              )}
            </article>

            <section className="logos-section" aria-labelledby="logos-title">
              <header className="logos-heading">
                <div>
                  <p className="case-study-type">Identity studies</p>
                  <h3 id="logos-title">Personal logos</h3>
                </div>
                <p>
                  A collection of personal marks and wordmark studies across ink
                  and chrome finishes.
                </p>
              </header>

              <div className="logos-gallery">
                <figure className="logo-board logo-board-wordmark-ink">
                  <div className="logo-artwork logo-artwork-light">
                    <Image
                      src="/personal-wordmark-ink.png"
                      alt="Black personal wordmark study with sweeping letterforms and a four-point star"
                      width={1672}
                      height={941}
                      sizes="(max-width: 640px) calc(100vw - 2rem), 60vw"
                    />
                  </div>
                  <figcaption>
                    <span>Wordmark</span>
                    <span>Ink study</span>
                  </figcaption>
                </figure>

                <figure className="logo-board logo-board-mark-ink">
                  <div className="logo-artwork logo-artwork-light logo-artwork-mark">
                    <Image
                      src="/personal-mark-ink.png"
                      alt="Black personal swoosh mark with a four-point star"
                      width={1254}
                      height={1254}
                      sizes="(max-width: 640px) calc(100vw - 2rem), 30vw"
                    />
                  </div>
                  <figcaption>
                    <span>Primary mark</span>
                    <span>Ink study</span>
                  </figcaption>
                </figure>

                <figure className="logo-board logo-board-mark-chrome">
                  <div className="logo-artwork logo-artwork-dark logo-artwork-mark">
                    <Image
                      src="/alex-mills-logo.png"
                      alt="Chrome personal swoosh mark with violet and blue reflections"
                      width={1254}
                      height={1254}
                      sizes="(max-width: 640px) calc(100vw - 2rem), 36vw"
                    />
                  </div>
                  <figcaption>
                    <span>Primary mark</span>
                    <span>Chrome study</span>
                  </figcaption>
                </figure>

                <figure className="logo-board logo-board-wordmark-chrome">
                  <div className="logo-artwork logo-artwork-space">
                    <Image
                      src="/personal-wordmark-chrome.png"
                      alt="Chrome personal wordmark with blue and violet light against a star field"
                      width={2172}
                      height={724}
                      sizes="(max-width: 640px) calc(100vw - 2rem), 62vw"
                    />
                  </div>
                  <figcaption>
                    <span>Wordmark</span>
                    <span>Chrome study</span>
                  </figcaption>
                </figure>
              </div>
            </section>

            <aside className="project-index" aria-label="Upcoming project categories">
              {upcomingWork.map((slot) => (
                <div className="project-slot" key={slot.label}>
                  <p>{slot.label}</p>
                  <small>{slot.status}</small>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-visual" aria-hidden="true">
            <Image
              src="/alex-mills-logo.png"
              alt=""
              width={1254}
              height={1254}
              sizes="(max-width: 1000px) 72vw, 35rem"
            />
          </div>
          <div className="about-copy">
            <p className="eyebrow">About</p>
            <h2 id="about-title">
              Thoughtful design with a clear point of view.
            </h2>
            <div className="about-columns">
              <p>
                I’m Alex, a multidisciplinary designer interested in identity,
                typography, and art direction. I turn strong ideas into clear,
                memorable visual systems.
              </p>
              <p>
                My process balances concept, craft, and practical use. New case
                studies will show the thinking and execution behind each project.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-intro">
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Have a project in mind?</h2>
            <p>Share a brief, timeline, or early idea. I’ll respond with next steps.</p>
          </div>

          <form className="contact-form" onSubmit={handleSendMessage}>
            <label>
              <span>Name</span>
              <input
                value={senderName}
                onChange={(event) => setSenderName(event.target.value)}
                type="text"
                name="name"
                autoComplete="name"
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input
                value={senderEmail}
                onChange={(event) => setSenderEmail(event.target.value)}
                type="email"
                name="email"
                autoComplete="email"
                required
              />
            </label>
            <label className="message-field">
              <span>Project notes</span>
              <textarea
                value={senderMessage}
                onChange={(event) => setSenderMessage(event.target.value)}
                name="message"
                rows={4}
                required
              />
            </label>
            <div className="form-footer">
              <p className={`form-status ${formStatus}`} aria-live="polite">
                {formStatus === "sent" && "Message received. I’ll be in touch."}
                {formStatus === "error" && "Message could not be sent. Try again later."}
              </p>
              <button type="submit" disabled={formStatus === "sending"}>
                {formStatus === "sending" ? "Sending…" : "Send inquiry"}
                <PiArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Alex Mills</span>
        <span>Independent graphic designer</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
