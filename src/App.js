import { HashRouter } from "react-router-dom";
import "./App.css";
import About from "./Components/About/About";
import Hero from "./Components/Hero/Hero";
import Projects from "./Components/Projects/Projects";
import Navbar from "./Components/Navbar/Navbar";
import Tech from "./Components/Tech/Tech";
import Contact from "./Components/Contacts/Contact";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Hero />
        <About />
        <Tech />
        <Projects />
        <Contact />
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
