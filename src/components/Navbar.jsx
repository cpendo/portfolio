import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

import { FiDownload } from "react-icons/fi";
//Add download resume button

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onscroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", onscroll);

    return () => window.removeEventListener("scroll", onscroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : "nav-default"}`}>
      <h1 className="font-black uppercase text-xl">
        <a href="#">Cynthia Pendo</a>
      </h1>

      <ul className="hidden sm:flex flex-row gap-10 capitalize text-lg">
        {["About", "Projects", "Contact"].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="transition-all duration-500 ease-in-out hover:opacity-50 border-b-2 border-transparent hover:border-b-green-500"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <button className="sm:hidden " onClick={() => setMobileMenuOpen(true)}>
        <MdMenu className="text-3xl" />
      </button>

      {/* Mobile overlay menu */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-80 bg-white/95 z-50 text-2xl capitalize transition-all transition-discrete">
          <button
            className="absolute top-0 right-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <IoCloseOutline className="text-5xl text-green-500 hover:animate-wiggle" />
          </button>

          <div className="flex flex-col items-center justify-center gap-10 h-full">
            {["About", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:opacity-50 transition-opacity duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* <button className="bg-black text-white px-3 py-1 rounded-sm">
          <FiDownload  className="inline mr-2"/> 
          Resume</button> */}
    </nav>
  );
};

export default Navbar;
