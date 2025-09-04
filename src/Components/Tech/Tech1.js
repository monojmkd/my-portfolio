import React from "react";
import "./Tech.css";

// Import images
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
import pythonImage from "../assests/python.png";

// Extra tech images (add these in /assests folder)
import nodeImage from "../assests/node.png";
import flaskImage from "../assests/flask.png";
import postgresImage from "../assests/postgresql.png";
import supabaseImage from "../assests/supabase.png";
import sqliteImage from "../assests/sqlite.png";
import mongodbImage from "../assests/mongodb.png";
import postmanImage from "../assests/postman.png";
import dockerImage from "../assests/docker.png";
// import cloudinaryImage from "../assests/cloudinary.png";
// import rabbitmqImage from "../assests/rabbitmq.png";
// import awsImage from "../assests/aws.png";
import jwtImage from "../assests/jwt.png";
// import oauthImage from "../assests/oauth.png";
// import multerImage from "../assests/multer.png";
// import sharpImage from "../assests/sharp.png";
import jestImage from "../assests/jest.png";
// import supertestImage from "../assests/supertest.png";
// import vercelImage from "../assests/vercel.png";
// import viteImage from "../assests/vite.png";
// import shadcnImage from "../assests/shadcn.png";
// import motionImage from "../assests/motion.png";
// import rechartsImage from "../assests/recharts.png";

// Define categories
const techCategories = {
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
    { name: "Next JS", image: nextImage },
    { name: "Redux Toolkit", image: reduxImage },
    // { name: "Vite", image: viteImage },
    // { name: "ShadCN/UI", image: shadcnImage },
    // { name: "Framer Motion", image: motionImage },
    // { name: "Recharts", image: rechartsImage },
  ],
  Backend: [
    { name: "Node.js", image: nodeImage },
    { name: "Express JS", image: expressImage },
    { name: "Flask", image: flaskImage },
    // { name: "RabbitMQ", image: rabbitmqImage },
  ],
  Databases: [
    { name: "MySQL", image: sqlImage },
    { name: "PostgreSQL", image: postgresImage },
    { name: "Supabase", image: supabaseImage },
    { name: "SQLite", image: sqliteImage },
    { name: "MongoDB", image: mongodbImage },
  ],
  Authentication: [
    { name: "JWT", image: jwtImage },
    // { name: "OAuth", image: oauthImage },
  ],
  "File Handling": [
    // { name: "Multer", image: multerImage },
    // { name: "Cloudinary", image: cloudinaryImage },
    // { name: "Sharp", image: sharpImage },
  ],
  Testing: [
    { name: "Jest", image: jestImage },
    // { name: "Supertest", image: supertestImage },
  ],
  DevOps: [
    { name: "Postman", image: postmanImage },
    // { name: "Vercel CI/CD", image: vercelImage },
    { name: "Docker", image: dockerImage },
    // { name: "AWS", image: awsImage },
  ],
  Tools: [{ name: "Git & GitHub", image: gitImage }],
  "APIs & Integrations": [
    // { name: "Spotify API", image: jsImage },
    // { name: "TMDB API", image: jsImage },
    // { name: "Unsplash API", image: jsImage },
    // { name: "Payment APIs", image: jsImage },
  ],
};

const Tech = () => {
  return (
    <section id="tech" className="tech">
      <div className="container">
        <div className="tech-content">
          <p>TECH STACK</p>
          <h3>
            The more diverse your tech stack, the more solutions you have at
            your fingertips.
          </h3>

          {/* Loop through categories */}
          {Object.entries(techCategories).map(([category, techs]) => (
            <div key={category} className="tech-category">
              <h4>{category}</h4>
              <div
                className={`tech-stack ${
                  techs.length <= 2 ? "small-stack" : ""
                }`}
              >
                {techs.map((tech) => (
                  <div className="icons-text" key={tech.name}>
                    <img src={tech.image} alt={tech.name} />
                    <h6>{tech.name}</h6>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tech;
