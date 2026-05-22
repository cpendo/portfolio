import { useEffect, useRef, useState } from "react";
import { MdMenu } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

import ThemeToggle from "./ThemeToggle";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 rounded-sm";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const openButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onscroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", onscroll);

    return () => window.removeEventListener("scroll", onscroll);
  }, []);

  // Close mobile menu on Escape, return focus to opener button
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        openButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    // Move focus into the menu when it opens
    firstLinkRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <nav className={`nav ${scrolled ? "nav-scrolled" : "nav-default"}`}>
      <h1 className="font-black uppercase text-xl">
        <a href="#" className={`text-black dark:text-zinc-100 ${FOCUS_RING}`}>
          Cynthia Pendo
        </a>
      </h1>

      <div className="flex items-center gap-6 sm:gap-10">
        <ul className="hidden sm:flex flex-row gap-10 capitalize text-lg">
          {["About", "Projects", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className={`text-black dark:text-zinc-100 transition-all duration-500 ease-in-out hover:opacity-50 border-b-2 border-transparent hover:border-b-green-500 ${FOCUS_RING}`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* <a
          href="/Cynthia_Pendo_CV.pdf"
          download
          aria-label="Download Cynthia Pendo's CV (PDF)"
          className={`hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm border border-black rounded-xl dark:border-zinc-100 text-black dark:text-zinc-100 hover:bg-black hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-950 transition-colors duration-300 ${FOCUS_RING}`}
        >
          <FiDownload className="text-sm" />
          <span>Resume</span>
        </a> */}

        <ThemeToggle />

        <button
          ref={openButtonRef}
          className={`sm:hidden text-black dark:text-zinc-100 ${FOCUS_RING}`}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <MdMenu className="text-3xl" />
        </button>
      </div>

      {/* Mobile overlay menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed top-0 left-0 w-full h-80 bg-white/95 dark:bg-zinc-950/95 z-50 text-2xl capitalize transition-all transition-discrete"
        >
          <button
            className={`absolute top-0 right-0 ${FOCUS_RING}`}
            onClick={() => {
              setMobileMenuOpen(false);
              openButtonRef.current?.focus();
            }}
            aria-label="Close menu"
          >
            <IoCloseOutline className="text-5xl text-green-500 hover:animate-wiggle" />
          </button>

          <div className="flex flex-col items-center justify-center gap-10 h-full text-black dark:text-zinc-100">
            {["About", "Projects", "Contact"].map((item, idx) => (
              <a
                key={item}
                ref={idx === 0 ? firstLinkRef : null}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`hover:opacity-50 transition-opacity duration-300 ${FOCUS_RING}`}
              >
                {item}
              </a>
            ))}
            <a
              href="/Cynthia_Pendo_CV.pdf"
              download
              onClick={() => setMobileMenuOpen(false)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-lg border border-black dark:border-zinc-100 ${FOCUS_RING}`}
              aria-label="Download Cynthia Pendo's CV (PDF)"
            >
              <FiDownload />
              <span>Resume</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
