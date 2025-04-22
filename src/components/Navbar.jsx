import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

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
      <h1 className="font-black uppercase text-xl">Cynthia Pendo</h1>

      <ul className="text-lg">
        <li>
          <a
            href={`mailto:info@example.com?subject=${encodeURIComponent(
              "Hi Cynthia 👋"
            )}`}
          >
            contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
