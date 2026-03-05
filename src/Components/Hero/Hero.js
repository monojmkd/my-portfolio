import React, { useEffect, useRef } from "react";
import "./Hero.css";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
// import SpotifyPopup from "../Spotify/SpotifyPopup";
import Typewriter from "typewriter-effect";
import wave from "../assests/wave.png";

// Terminal lines — each has a delay (ms), type, and content
const TERMINAL_LINES = [
  { delay: 400, type: "cmd", text: "node server.js" },
  { delay: 900, type: "success", text: "✓ Server running on port 3000" },
  { delay: 1300, type: "success", text: "✓ PostgreSQL connected" },
  { delay: 1700, type: "success", text: "✓ MongoDB connected" },
  { delay: 2300, type: "cmd", text: "git push origin main" },
  { delay: 2800, type: "info", text: "Pushing to github.com/monojmkd" },
  { delay: 3200, type: "success", text: "✓ Branch main up to date" },
  { delay: 3800, type: "cmd", text: "vercel --prod" },
  { delay: 4300, type: "info", text: "Deploying to production..." },
  { delay: 4900, type: "success", text: "✓ Deployed → monojmkd.vercel.app" },
  { delay: 5500, type: "cmd", text: "" }, // blinking cursor line
];

const ROLES = [
  "Full-Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Creator of Modern Web Apps",
  "Digital Problem Solver",
  "API Specialist",
  "Software Developer",
  "MERN Stack Developer",
  "API Specialist",
  "Node.js & React Developer",
];

const Terminal = () => {
  const linesRef = useRef([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Hide all lines initially
    linesRef.current.forEach((el) => {
      if (el) el.style.display = "none";
    });

    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => {
        const el = linesRef.current[i];
        if (el) el.style.display = "flex";
      }, line.delay),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal-wrap">
      {/* title bar */}
      <div className="terminal-bar">
        <span className="t-dot" style={{ background: "#ff5f57" }} />
        <span className="t-dot" style={{ background: "#febc2e" }} />
        <span className="t-dot" style={{ background: "#28c840" }} />
        <span className="t-title">monoj@portfolio ~ bash</span>
      </div>

      {/* body */}
      <div className="terminal-body">
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            ref={(el) => (linesRef.current[i] = el)}
            className={`t-line t-${line.type}`}
            style={{ display: "none" }}
          >
            {line.type === "cmd" ? (
              <>
                <span className="t-prompt">
                  <span className="t-user">monoj</span>
                  <span className="t-at">@</span>
                  <span className="t-host">portfolio</span>
                  <span className="t-sym"> $ </span>
                </span>
                <span className="t-cmd-text">{line.text}</span>
                {/* show cursor on last empty cmd line */}
                {line.text === "" && (
                  <span className="t-cursor" ref={cursorRef}>
                    ▌
                  </span>
                )}
              </>
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}
      </div>

      {/* bottom status bar */}
      <div className="terminal-status">
        <span className="t-status-dot" />
        <span>Ready</span>
        <span className="t-status-sep">·</span>
        <span>Node v20.11</span>
        <span className="t-status-sep">·</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
};

const Hero = () => {
  const handleResumeClick = () => {
    window.open(
      "https://drive.google.com/file/d/15ww6LvJSX19XoIFNsbDHYMNkSXWrSsD_/view?usp=sharing",
      "_blank",
    );
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-glow" />
      <div className="hero-glow2" />

      <div className="hero-inner">
        {/* ── LEFT: text ── */}
        <div className="hero-text rv">
          <div className="hero-chip">Available for work</div>

          <h1>
            Hi, I'm Monoj{" "}
            <img src={wave} alt="wave" className="wave" aria-label="wave" />
          </h1>

          <div className="hero-div" />

          <h2 className="hero-role">
            <Typewriter
              options={{
                strings: ROLES,
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 35,
                pauseFor: 1500,
              }}
            />
          </h2>

          <p className="hero-bio">
            I build scalable web applications with a strong focus on backend
            engineering — clean APIs, solid authentication, cloud deployment,
            and high-performance architecture using Node.js, React, PostgreSQL
            and MongoDB.
          </p>

          <div className="hero-meta">
            <span className="hero-location">
              <IoLocationOutline size={17} />
              Assam, India
            </span>
            <span className="hero-divider" />
            <a
              href="https://www.linkedin.com/in/monoj-kumar-das-019340a9/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social"
              aria-label="LinkedIn"
            >
              <AiFillLinkedin size={22} />
            </a>
            <a
              href="https://github.com/monojmkd"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social"
              aria-label="GitHub"
            >
              <AiFillGithub size={22} />
            </a>
            {/* <SpotifyPopup /> */}
          </div>

          <div className="hero-actions">
            <button className="btn-primary" onClick={handleResumeClick}>
              Download Resume
            </button>
            <a href="#about" className="btn-ghost">
              About Me
            </a>
          </div>
        </div>

        {/* ── RIGHT: animated terminal ── */}
        <div className="hero-terminal rv d2">
          <Terminal />
        </div>
      </div>

      <div className="scroll-cue">
        <span className="scroll-cue-label">scroll</span>
        <span className="scroll-cue-line" />
      </div>
    </section>
  );
};

export default Hero;
