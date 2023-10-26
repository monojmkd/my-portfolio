import React from "react";
import "./About.css";
import dpImage from "../assests/dp-image2.bmp";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about-content">
          <div className="side-img">
            <img src={dpImage} alt="mee" class="main-img" />
          </div>
          <div className="side-text">
            <h3>About me</h3>
            <h4>
              A dedicated Front-end Developer <br></br> based in Assam, India
              📍
            </h4>
            <p>
              A React frontend developer based in Jorhat, Assam. Armed with a
              BTech in Computer Science, I'm passionate about crafting seamless
              user experiences. With expertise in React, I focus on building
              responsive websites and applications. I thrive on challenges,
              ensuring every project I undertake is executed with precision.
              Let's collaborate and bring your digital ideas to life!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
