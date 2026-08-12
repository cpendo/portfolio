import AboutMe from "./sections/AboutMe";
import CaseStudies from "./sections/CaseStudies";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

const Home = () => {
  return (
    <>
      <Hero />
      <AboutMe />
      <Projects />
      <CaseStudies />
      <Contact />
    </>
  );
};

export default Home;
