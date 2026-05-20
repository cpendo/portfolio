import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollLine from "../components/ScrollLine";

const HomeLayout = () => {
  return (
    <div className="w-full bg-white text-black dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-black focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-950 focus:px-4 focus:py-2 focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Skip to content
      </a>
      <ScrollLine />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
