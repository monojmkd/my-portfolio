import React from "react";
import "./Hero.css";
import heroImage from "../assests/hero-image.gif";
import wave from "../assests/wave.png";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Hero = () => {
  const handleButtonClick = () => {
    window.open(
      "https://drive.google.com/file/d/1bPLJjgQGMsgLR4kgvAxsDOLYwJSh5CVZ/view?usp=sharing",
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
                Hi, I am Monoj <img src={wave} alt="wave"></img>
              </h1>

              <h2>Front-End React Developer</h2>

              <p>
                "Passionate React frontend developer with strong frontend
                expertise, dedicated to crafting seamless web experiences, and
                driven by a love for coding."
              </p>
              <div className="link-text">
                <IoLocationOutline className="link-icons" />
                <p>Assam, India</p>
                <div>|</div>
                <a href="https://www.linkedin.com/in/monoj-kumar-das-019340a9/">
                  <AiFillLinkedin className="link-icons" />
                </a>
                <a href="https://github.com/monojmkd">
                  <AiFillGithub className="link-icons" />
                </a>
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
              <img className="hero-image" src={heroImage} alt="mee" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
