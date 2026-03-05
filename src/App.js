import { HashRouter } from "react-router-dom";
import "./App.css";
import About from "./Components/About/About";
import Hero from "./Components/Hero/Hero";
import Projects from "./Components/Projects/Projects";
import Navbar from "./Components/Navbar/Navbar";
import Tech from "./Components/Tech/Tech";
import Contact from "./Components/Contacts/Contact";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [showBtt, setShowBtt] = useState(false);

  useEffect(() => {
    // ── Scroll reveal ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const revealEls = document.querySelectorAll(".rv");
    revealEls.forEach((el) => observer.observe(el));

    // ── Back to top visibility ──
    const handleScroll = () => setShowBtt(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);

    return () => {
      revealEls.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <HashRouter>
        <Navbar />
        <main>
          <Hero />
          <div className="divider" />
          <About />
          <div className="divider" />
          <Tech />
          <div className="divider" />
          <Projects />
          <div className="divider" />
          <Contact />
        </main>
        <footer>
          Designed &amp; built by <strong>Monoj Kumar Das</strong> · 2025
        </footer>
        <button
          className={`back-to-top${showBtt ? " show" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </HashRouter>
      <Analytics />
    </>
  );
}

export default App;
