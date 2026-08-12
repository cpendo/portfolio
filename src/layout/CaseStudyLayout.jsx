import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 rounded-sm";

// A reading layout for case-study routes. Deliberately lighter than the home
// Navbar: its section anchors (#about, #projects) only resolve on "/", so a case
// study gets identity + a way home + the theme toggle instead. The toggle rides
// along so a study opened in dark mode stays dark.
const CaseStudyLayout = () => {
  const { pathname } = useLocation();

  // SPA navigation preserves scroll position; start each study at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-black dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      <a
        href="#cs-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-black focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-950 focus:px-4 focus:py-2 focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Skip to content
      </a>

      <nav className="nav nav-scrolled">
        <h1 className="font-black uppercase text-xl">
          <Link to="/" className={`text-black dark:text-zinc-100 ${FOCUS_RING}`}>
            Cynthia Pendo
          </Link>
        </h1>

        <div className="flex items-center gap-5 sm:gap-8">
          <Link
            to="/#case-studies"
            className={`inline-flex items-center gap-2 text-black dark:text-zinc-100 hover:opacity-60 transition-opacity duration-300 ${FOCUS_RING}`}
          >
            <FiArrowLeft />
            <span className="hidden sm:inline">All work</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main id="cs-content" className="flex-1 pt-20 sm:pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyLayout;
