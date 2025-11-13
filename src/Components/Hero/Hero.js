import React from "react";
import "./Hero.css";
import heroImage from "../assests/hero-image.gif";
import wave from "../assests/wave.png";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import SpotifyPopup from "../Spotify/SpotifyPopup";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const handleButtonClick = () => {
    window.open(
      "https://drive.google.com/file/d/15ww6LvJSX19XoIFNsbDHYMNkSXWrSsD_/view?usp=sharing",
      "_blank"
    );
  };

  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="content">
          <div className="hero-main">
            <div className="hero-text">
              <h1>
                Hi, I am Monoj{" "}
                <img className="wave" src={wave} alt="wave"></img>
              </h1>

              <h2 className="typewriter-title">
                <Typewriter
                  className="typewriter-text"
                  options={{
                    strings: [
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
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 60,
                    deleteSpeed: 35,
                    pauseFor: 1500,
                  }}
                />
              </h2>

              <p>
                “I build scalable web applications with a strong focus on
                backend engineering. Skilled in Node.js, Express, PostgreSQL,
                MongoDB, React, and Next.js. I specialize in clean APIs,
                authentication, cloud deployment, and high-performance
                architecture.”
              </p>
              <div className="link-text">
                <IoLocationOutline className="link-icons" />
                <p>Assam, India</p>
                <p className="divider">|</p>
                <a
                  href="https://www.linkedin.com/in/monoj-kumar-das-019340a9/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin className="link-icons" />
                </a>
                <a
                  href="https://github.com/monojmkd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub className="link-icons" />
                </a>
                <SpotifyPopup />
              </div>
              <div className="btn-resume">
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="btn"
                >
                  Download Resume
                </button>
              </div>
            </div>
            <div className="hero-img">
              <img
                className="hero-image"
                src={heroImage}
                alt="Developer portrait"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
