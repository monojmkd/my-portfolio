import React from "react";
import pro1 from "../assests/taazakhbr.png";
import pro2 from "../assests/cryptoworld.png";
import pro3 from "../assests/happybuys.png";
import pro4 from "../assests/watchcart.png";
import pro5 from "../assests/foodsheer.png";

import { AiFillGithub } from "react-icons/ai";
import "./Projects.css";

const Projects = () => {
  return (
    <section id="projects" className="project">
      <div className="container">
        <div className="project-content">
          <p>Projects</p>
          <h3>Each project is a unique piece of development</h3>
          <div className="projects-grid">
            <div className="project1">
              <div className="pro_img">
                <a
                  target="_blank"
                  href="https://foodsheer.vercel.app/"
                  rel="noreferrer"
                >
                  <img src={pro5} alt="project1" />
                </a>
              </div>
              <div className="pro_text">
                <h3>
                  FoodSheer{" "}
                  <a href="https://github.com/monojmkd/FoodSheer">
                    <AiFillGithub size={24} />
                  </a>
                </h3>
                <p>
                  Food Sheer is a food delivery frontend web application built
                  using ReactJS and Tailwind CSS in a Vite environment. It
                  leverages the Swiggy API to fetch restaurant data, providing a
                  seamless experience for users.
                </p>
                <div className="tech_used">
                  <p>React</p>
                  <p>Redux-Toolkit</p>
                  <p>Tailwind CSS</p>
                </div>
              </div>
              {/* <div  className="code_rotate">
                    
              </div> */}
            </div>
            <div className="project1">
              <div className="pro_img">
                <a target="_blank" href="# " rel="noreferrer">
                  <img src={pro1} alt="project1" />
                </a>
              </div>
              <div className="pro_text">
                <h3>
                  Taazakhbr{" "}
                  <a href="https://github.com/monojmkd/taazakhabr-news">
                    <AiFillGithub size={24} />
                  </a>
                </h3>
                <p>
                  TaazaKhabr is a news website portal that provides users with
                  the latest and most up-to-date news and information from
                  around the world.
                </p>
                <div className="tech_used">
                  <p>React</p>
                  <p>CSS</p>
                </div>
              </div>
              {/* <div  className="code_rotate">
                    
              </div> */}
            </div>
            <div className="project1">
              <div className="pro_img">
                <a
                  target="_blank"
                  href="https://monojmkd.github.io/WatchCart/"
                  rel="noreferrer"
                >
                  <img src={pro4} alt="project3" />
                </a>
              </div>
              <div className="pro_text">
                <h3>
                  Watchcart{" "}
                  <a href="https://github.com/monojmkd/WatchCart">
                    <AiFillGithub size={24} />
                  </a>
                </h3>
                <p>
                  WatchCart, A project for selling watches and electronics with
                  filtering options. This allows users to browse products with
                  ease while also offering a convenient filtering mechanism to
                  refine their product selections.
                </p>
                <div className="tech_used">
                  <p>React</p>
                  <p>Redux</p>
                  <p>CSS</p>
                </div>
              </div>
            </div>
            <div className="project1">
              <div className="pro_img">
                <a
                  target="_blank"
                  href="https://monojmkd.github.io/cryptoworld-react/"
                  rel="noreferrer"
                >
                  <img src={pro2} alt="project1" />
                </a>
              </div>
              <div className="pro_text">
                <h3>
                  CryptoWorld{" "}
                  <a href="https://github.com/monojmkd/cryptoworld-react">
                    <AiFillGithub size={24} />
                  </a>
                </h3>
                <p>
                  CryptoWorld is a web application built using React that allows
                  users to easily track the prices of various cryptocurrencies
                  in real-time.{" "}
                </p>
                <div className="tech_used">
                  <p>React</p>
                  <p>Redux</p>
                  <p>SCSS</p>
                </div>
              </div>
            </div>
            <div className="project1">
              <div className="pro_img">
                <a
                  target="_blank"
                  href="https://monojmkd.github.io/happy-buys/"
                  rel="noreferrer"
                >
                  <img src={pro3} alt="project3" />
                </a>
              </div>
              <div className="pro_text">
                <h3>
                  HappyBuys{" "}
                  <a href="https://github.com/monojmkd/happy-buys/tree/master">
                    <AiFillGithub size={24} />
                  </a>
                </h3>
                <p>
                  HappyBuys is a simple e-commerce marketplace.The website
                  allows users to browse products by categories and add/remove
                  items from the cart using Redux state management.
                </p>
                <div className="tech_used">
                  <p>React</p>
                  <p>Redux</p>
                  <p>CSS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Projects;
