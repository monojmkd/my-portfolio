import React from "react";
import "./Navbar.css";
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { useState } from "react";
import {RxHamburgerMenu} from 'react-icons/rx'


const Navbar = () => {

  const[showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
  setShowNavbar(!showNavbar)
}



  return (
    <>
    <div>
      <nav>
        <h3 className="logo">monoj.mkd</h3> 
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
        <ul>
          <li>
            <AnchorLink href="#hero">Home</AnchorLink>
          </li>
          <li>
            <AnchorLink href="#about">About</AnchorLink>
          </li>
          <li>
            <AnchorLink href="#tech">Tech</AnchorLink>
          </li> 
          <li>
            <AnchorLink href="#projects">Projects</AnchorLink>
          </li>
          <li>
            <AnchorLink href="#contact">Contact</AnchorLink>
          </li>          
        </ul>
        </div>    
        <RxHamburgerMenu className="mobile-menu" onClick={handleShowNavbar} size={30}/>    
      </nav>
    </div>
     
    </>
  );
};

export default Navbar;
