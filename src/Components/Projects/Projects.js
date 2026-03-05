import React, { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import taazakhbr from "../assests/taazakhbr.png";
import cryptoworld from "../assests/cryptoworld.png";
import happybuys from "../assests/happybuys.png";
import watchcart from "../assests/watchcart.png";
import foodsheer from "../assests/foodsheer.png";
import f1hub from "../assests/f1hub.png";
import govtittracker from "../assests/govtittracker.png";
import "./Projects.css";

const PROJECTS = [
  {
    name: "FoodSheer",
    image: foodsheer,
    live: "https://foodsheer.vercel.app/",
    github: "https://github.com/monojmkd/FoodSheer",
    desc: "A food delivery frontend built with ReactJS and Tailwind CSS, leveraging the live Swiggy API to fetch real restaurant data.",
    tech: ["React", "Redux Toolkit", "Tailwind CSS"],
  },
  {
    name: "Formula One Hub",
    image: f1hub,
    live: "https://f1-hub-mkd.vercel.app/",
    github: "https://github.com/monojmkd/F1-Hub",
    desc: "Live F1 race streams, driver standings, upcoming schedules, and highlight videos — all fetched dynamically via the Ergast API.",
    tech: ["React", "Tailwind CSS", "HLS.js"],
  },
  {
    name: "Govt IT Tracker",
    image: govtittracker, // import your screenshot at the top
    live: "https://jobtracker-liart-two.vercel.app/",
    github: "https://github.com/monojmkd/Govt-IT-Job-Tracker",
    desc: "A live government IT job tracker with automated cron jobs via GitHub Actions that scrape RSS feeds every 6 hours, store listings in Supabase, and display them in a searchable dashboard with an AI-powered job finder panel.",
    tech: ["React", "Supabase", "GitHub Actions"],
  },
  {
    name: "TaazaKhabr",
    image: taazakhbr,
    live: "https://taazakhabr-news.vercel.app/",
    github: "https://github.com/monojmkd/taazakhabr-news",
    desc: "A news portal delivering the latest headlines and global stories with category-based filtering and a clean reading experience.",
    tech: ["React", "Node.js", "Bootstrap"],
  },
  {
    name: "WatchCart",
    image: watchcart,
    live: "https://monojmkd.github.io/WatchCart/",
    github: "https://github.com/monojmkd/WatchCart",
    desc: "An e-commerce store for watches and electronics with category filtering and cart management powered by Redux.",
    tech: ["React", "Redux", "CSS"],
  },
  {
    name: "CryptoWorld",
    image: cryptoworld,
    live: "https://monojmkd.github.io/cryptoworld-react/",
    github: "https://github.com/monojmkd/cryptoworld-react",
    desc: "A real-time cryptocurrency tracker using the CoinGecko API. Browse prices, market caps, and trends for hundreds of coins.",
    tech: ["React", "Redux", "SCSS"],
  },
  {
    name: "HappyBuys",
    image: happybuys,
    live: "https://monojmkd.github.io/happy-buys/",
    github: "https://github.com/monojmkd/happy-buys/tree/master",
    desc: "A simple e-commerce marketplace where users browse products by category and manage their cart with Redux state management.",
    tech: ["React", "Redux", "CSS"],
  },
];

const Projects = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" className="projects">
      <div className="container">
        {/* Header */}
        <div className="projects-header rv">
          <div className="section-label">Projects</div>
          <h2 className="section-heading">Things I've built</h2>
          <p className="section-sub">
            Each project is a unique piece of development 🚀
          </p>
        </div>

        {/* 3-column grid */}
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className="project-card rv"
              style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Screenshot */}
              <div className="project-img">
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    objectPosition:
                      hovered === i ? "bottom center" : "top center",
                  }}
                />
                <div className="live-badge">Live</div>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="img-overlay"
                  aria-label={`View ${p.name} demo`}
                >
                  <span>View Demo ↗</span>
                </a>
              </div>

              {/* Card body */}
              <div className="project-body">
                <div className="project-title-row">
                  <h3>{p.name}</h3>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-gh"
                    aria-label="GitHub"
                  >
                    <AiFillGithub size={22} />
                  </a>
                </div>

                <p className="project-desc">{p.desc}</p>

                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-demo"
                  >
                    <FiExternalLink size={15} /> Live Demo
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gh"
                  >
                    <AiFillGithub size={16} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
