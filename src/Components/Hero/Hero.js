import React from "react";
import "./Hero.css";
import heroImage from "../assests/hero-image.gif";
import wave from "../assests/wave.png";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import SpotifyPopup from "../Spotify/SpotifyPopup";
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

              <h2>Full-Stack Developer</h2>

              <p>
                “Full-Stack Developer with a backend focus, experienced in
                Node.js, Express, PostgreSQL, MongoDB, React & Next.js,
                specializing in API design, authentication, testing, and cloud
                deployment, and passionate about building scalable, reliable,
                and user-centric web applications.”
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
                  className="btn btn-info btn-lg"
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
