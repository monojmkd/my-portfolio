import React, { useEffect, useState } from "react";
import "./Navbar.css";
// import AnchorLink from "react-anchor-link-smooth-scroll";
// import { RxHamburgerMenu } from "react-icons/rx";

const links = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Tech", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div
        className={`nav-overlay${menuOpen ? " show" : ""}`}
        onClick={closeMenu}
      />
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <a href="#hero" className="navbar-logo">
          monoj.mkd
        </a>

        <ul className={`navbar-links${menuOpen ? " open" : ""}`}>
          {links.map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
