import React from "react";
import "./About.css";
import dpImage from "../assests/dp-image2.bmp";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="side-img">
            <img src={dpImage} alt="mee" className="main-img" />
          </div>
          <div className="side-text">
            <h3>About me</h3>
            <h4>
              A dedicated Full-Stack Developer <br></br> based in Assam, India
              📍
            </h4>
            <p>
              A Full-Stack Developer based in Jorhat, Assam, with a BTech in
              Computer Science. Passionate about building scalable and reliable
              applications, I specialize in backend development with Node.js,
              Express, PostgreSQL, and MongoDB, while also crafting responsive
              frontends with React, Next.js, and Vite. With hands-on experience
              in API design, authentication, testing, and cloud deployment, I
              thrive on solving complex challenges and delivering user-centric
              solutions. Let’s collaborate and bring your digital ideas to life!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
