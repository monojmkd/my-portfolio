import React, { useState } from "react";
import "./Tech.css";

// Languages
import cImage from "../assests/c.png";
import cplusImage from "../assests/c++.png";
import javaImage from "../assests/java.png";
import sqlImage from "../assests/mysql.png";
import jsImage from "../assests/javascript.png";
import tsImage from "../assests/typescript.png";
import pythonImage from "../assests/python.png";

// Frontend
import html5Image from "../assests/html5.png";
import cssImage from "../assests/css.png";
import sassImage from "../assests/sass.png";
import tailImage from "../assests/tailwind.png";
import reactImage from "../assests/react.png";
import nextImage from "../assests/nextjs.png";
import reduxImage from "../assests/redux.png";

// Backend
import nodeImage from "../assests/node.png";
import expressImage from "../assests/express.png";
import flaskImage from "../assests/flask.png";

// Databases
import postgresImage from "../assests/postgresql.png";
import supabaseImage from "../assests/supabase.png";
import sqliteImage from "../assests/sqlite.png";
import mongodbImage from "../assests/mongodb.png";

// Auth / File / Testing
import jwtImage from "../assests/jwt.png";
import cloudinaryImage from "../assests/cloudinary.png";
import jestImage from "../assests/jest.png";

// DevOps & Tools
import postmanImage from "../assests/postman.png";
import dockerImage from "../assests/docker.png";
import gitImage from "../assests/github.png";
import figmaImage from "../assests/figma.png";
import appsScriptImage from "../assests/appscript.png";

// APIs
import swiggyImage from "../assests/swiggy.png";
import inshortsImage from "../assests/inshorts.png";
import spotifyImage from "../assests/spotify-dev.png";
import coingeckoImage from "../assests/coingecko.png";
import ergastImage from "../assests/race.png";

const CATEGORIES = {
  Languages: [
    { name: "C", image: cImage },
    { name: "C++", image: cplusImage },
    { name: "Java", image: javaImage },
    { name: "JavaScript", image: jsImage },
    { name: "TypeScript", image: tsImage },
    { name: "SQL", image: sqlImage },
    { name: "Python", image: pythonImage },
  ],
  Frontend: [
    { name: "HTML5", image: html5Image },
    { name: "CSS3", image: cssImage },
    { name: "SASS", image: sassImage },
    { name: "Tailwind CSS", image: tailImage },
    { name: "React JS", image: reactImage },
    { name: "Next.js", image: nextImage },
    { name: "Redux Toolkit", image: reduxImage },
  ],
  Backend: [
    { name: "Node.js", image: nodeImage },
    { name: "Express JS", image: expressImage },
    { name: "Flask", image: flaskImage },
  ],
  Databases: [
    { name: "MySQL", image: sqlImage },
    { name: "PostgreSQL", image: postgresImage },
    { name: "Supabase", image: supabaseImage },
    { name: "SQLite", image: sqliteImage },
    { name: "MongoDB", image: mongodbImage },
  ],
  Authentication: [{ name: "JWT", image: jwtImage }],
  "File Handling": [{ name: "Cloudinary", image: cloudinaryImage }],
  Testing: [{ name: "Jest", image: jestImage }],
  DevOps: [
    { name: "Postman", image: postmanImage },
    { name: "Docker", image: dockerImage },
    { name: "Git & GitHub", image: gitImage },
  ],
  Tools: [
    { name: "Figma", image: figmaImage },
    { name: "Google Apps Script", image: appsScriptImage },
  ],
  APIs: [
    { name: "Swiggy API", image: swiggyImage },
    { name: "Inshorts API", image: inshortsImage },
    { name: "Spotify Dev", image: spotifyImage },
    { name: "CoinGecko API", image: coingeckoImage },
    { name: "Ergast F1 API", image: ergastImage },
  ],
};

const Tech = () => {
  const [active, setActive] = useState("Languages");

  return (
    <section id="tech" className="tech">
      <div className="container">
        {/* Header */}
        <div className="tech-header rv">
          <div className="section-label">Tech Stack</div>
          <h2 className="section-heading">Tools I work with</h2>
          <p className="section-sub">
            The more diverse your toolkit, the more solutions you have at your
            fingertips.
          </p>
        </div>

        {/* Category tabs */}
        <div className="tech-tabs rv d1">
          {Object.keys(CATEGORIES).map((cat) => (
            <button
              key={cat}
              className={`tech-tab${active === cat ? " active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech grid — key forces re-mount → re-triggers fade-in animation */}
        <div key={active} className="tech-grid fade-in">
          {CATEGORIES[active].map(({ name, image }) => (
            <div key={name} className="tech-card">
              <div className="tech-icon">
                <img src={image} alt={name} />
              </div>
              <h6>{name}</h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tech;
