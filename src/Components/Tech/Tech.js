import React from "react";
import "./Tech.css";
import cImage from "../assests/c.png";
import cplusImage from "../assests/c++.png";
import javaImage from "../assests/java.png";
import sqlImage from "../assests/mysql.png";
import html5Image from "../assests/html5.png";
import cssImage from "../assests/css.png";
import reactImage from "../assests/react.png";
import reduxImage from "../assests/redux.png";
import gitImage from "../assests/github.png";
import jsImage from "../assests/javascript.png";
import sassImage from "../assests/sass.png";
import tsImage from "../assests/typescript.png";
import nextImage from "../assests/nextjs.png";
import tailImage from "../assests/tailwind.png";
import expressImage from "../assests/express.png";
const Tech = () => {
  return (
    <section id="tech" className="tech">
      <div className="container">
        <div className="tech-content">
          <p>TECHSTACK</p>
          <h3>
            The more diverse your tech stack, the more solutions you have at
            your fingertips.
          </h3>
          <div className="tech-stack">
            <div className="icons-text">
              <img src={cImage} alt="clanguage" />
              <h6>C</h6>
            </div>
            <div className="icons-text">
              <img src={cplusImage} alt="cpluslanguage" />
              <h6>C++</h6>
            </div>
            <div className="icons-text">
              <img src={javaImage} alt="java" />
              <h6>Java</h6>
            </div>
            <div className="icons-text">
              <img src={jsImage} alt="javascript" />
              <h6>Javascript</h6>
            </div>
            <div className="icons-text">
              <img src={tsImage} alt="typescript" />
              <h6>TypeScript</h6>
            </div>

            <div className="icons-text">
              <img src={html5Image} alt="html" />
              <h6>HTML5</h6>
            </div>
            <div className="icons-text">
              <img src={cssImage} alt="css" />
              <h6>CSS3</h6>
            </div>
            <div className="icons-text">
              <img src={sassImage} alt="sass" />
              <h6>SASS</h6>
            </div>
            <div className="icons-text">
              <img src={tailImage} alt="tailwind" />
              <h6>Tailwind</h6>
            </div>
            <div className="icons-text">
              <img src={reactImage} alt="react" />
              <h6>React JS</h6>
            </div>
            <div className="icons-text">
              <img src={nextImage} alt="next" />
              <h6>Next JS</h6>
            </div>
            <div className="icons-text">
              <img src={expressImage} alt="next" />
              <h6>Express JS</h6>
            </div>
            <div className="icons-text">
              <img src={reduxImage} alt="redux" />
              <h6>Redux Toolkit</h6>
            </div>
            <div className="icons-text">
              <img src={sqlImage} alt="sql" />
              <h6>SQL</h6>
            </div>
            <div className="icons-text">
              <img src={gitImage} alt="git" />
              <h6>Git</h6>
            </div>

            {/* <h5>C Language</h5> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tech;
