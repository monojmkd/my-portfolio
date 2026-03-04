import React from "react";
import "./About.css";
// import dpImage from "../assests/dp-image2.bmp";
import myImage from "../assests/monoj.png";

const TAGS = [
  "Node.js",
  "React",
  "PostgreSQL",
  "MongoDB",
  "Express",
  "Next.js",
  "Docker",
  "REST APIs",
];

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-grid">
          {/* Image */}
          <div className="ab-img rv">
            <div className="ab-img-wrap">
              <img src={myImage} alt="Monoj Kumar Das" className="ab-photo" />
              <div className="ab-dots" />
            </div>
          </div>

          {/* Text */}
          <div className="ab-text">
            <span className="ab-label rv">About Me</span>

            <h2 className="rv d1">
              A dedicated Full-Stack Developer based in Assam, India 📍
            </h2>

            <p className="rv d2">
              A Full-Stack Developer based in Jorhat, Assam, with a BTech in
              Computer Science. Passionate about building scalable and reliable
              applications, I specialise in backend development with Node.js,
              Express, PostgreSQL, and MongoDB, while also crafting responsive
              frontends with React, Next.js, and Vite. With hands-on experience
              in API design, authentication, testing, and cloud deployment, I
              thrive on solving complex challenges and delivering user-centric
              solutions.
            </p>
            <div className="ab-tags rv d3">
              {TAGS.map((tag) => (
                <span key={tag} className="ab-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
