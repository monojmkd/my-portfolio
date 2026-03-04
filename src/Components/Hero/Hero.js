import React from "react";
import "./Hero.css";
import heroImage from "../assests/hero-image.gif";
import wave from "../assests/wave.png";
// import { IoLocationOutline } from "react-icons/io5";
// import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
// import SpotifyPopup from "../Spotify/SpotifyPopup";
import Typewriter from "typewriter-effect";

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

const Hero = () => {
  const handleButtonClick = () => {
    window.open(
      "https://drive.google.com/file/d/15ww6LvJSX19XoIFNsbDHYMNkSXWrSsD_/view?usp=sharing",
      "_blank",
    );
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-glow" />
      <div className="hero-glow2" />

      <div className="hero-text">
        <div className="hero-chip rv">Available for work</div>

        <h1 className="rv d1">
          Hi, I'm Monoj <img className="wave" src={wave} alt="wave"></img>
        </h1>
        <div className="hero-div rv d1" />
        <div className="hero-role rv d2">
          <span>
            {" "}
            <Typewriter
              className="typewriter-text"
              options={{
                strings: ROLES,
                autoStart: true,
                loop: true,
                delay: 60,
                deleteSpeed: 35,
                pauseFor: 1500,
              }}
            />
          </span>
          <span className="hero-cursor">|</span>
        </div>
        <p className="hero-bio rv d2">
          I build scalable web applications with a strong focus on backend
          engineering — clean APIs, solid authentication, cloud deployment, and
          high-performance architecture using Node.js, React, PostgreSQL and
          MongoDB.
        </p>
        <div className="hero-meta rv d3">
          <span className="hero-location">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="16"
              height="16"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            Assam, India
          </span>

          <span className="hero-divider" />

          <a
            href="https://linkedin.com/in/monojmkd"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

          <a
            href="https://github.com/monojmkd"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
        {/* <SpotifyPopup /> */}
        <div className="hero-actions rv d4">
          <button onClick={handleButtonClick} download className="btn-primary">
            Download Resume
          </button>
          <a href="#about" className="btn-ghost">
            About Me
          </a>
        </div>
      </div>

      {/* <div className="hero-img">
        <img className="hero-image" src={heroImage} alt="Developer portrait" />
      </div> */}

      <div className="scroll-cue">
        <span className="scroll-cue-label">scroll</span>
        <span className="scroll-cue-line" />
      </div>
    </section>
    // {/* <div className="btn-resume">
    //   <button
    //     type="button"
    //     onClick={handleButtonClick}
    //     className="btn"
    //   >
    //     Download Resume
    //   </button>
    // </div> */}
    //   </div>
    //
    // </div>
  );
};

export default Hero;
