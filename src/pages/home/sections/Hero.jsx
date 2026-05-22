import { useEffect, useState } from "react";
import { IoArrowDownOutline } from "react-icons/io5";

const PHRASES = ["build platforms", "design products"];
const ROTATION_MS = 2500;

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center pt-24 pb-8 overflow-hidden"
    >
      {/* Bright pulsing green spotlight — solid gradient (not dotted) */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0
          bg-[radial-gradient(ellipse_50%_40%_at_30%_70%,rgb(34_197_94_/_0.35),transparent_70%)]
          dark:bg-[radial-gradient(ellipse_50%_40%_at_30%_70%,rgb(74_222_128_/_0.30),transparent_70%)]
          animate-blast-pulse motion-reduce:animate-none origin-center
        "
      />

      {/* Twin glow upper-right */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0
          bg-[radial-gradient(ellipse_40%_35%_at_75%_30%,rgb(34_197_94_/_0.25),transparent_70%)]
          dark:bg-[radial-gradient(ellipse_40%_35%_at_75%_30%,rgb(74_222_128_/_0.22),transparent_70%)]
          animate-blast-pulse-alt motion-reduce:animate-none origin-center
        "
      />

      <div className="relative z-10 w-full px-6 sm:px-12 flex flex-col justify-center items-center gap-8 text-center">
        <h1 className="w-full lg:max-w-6xl font-headings leading-tight md:leading-[1.1] text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl text-black dark:text-zinc-100">
          I want to{" "}
          <span className="relative inline-block align-baseline">
            {/* Invisible widest phrase reserves layout space; prevents reflow on cycle */}
            <span aria-hidden="true" className="invisible whitespace-nowrap">
              design products
            </span>
            {PHRASES.map((phrase, i) => (
              <span
                key={phrase}
                aria-hidden={i !== index}
                className={`absolute inset-0 flex items-center justify-center whitespace-nowrap font-body font-medium italic text-green-500 dark:text-green-400 transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {phrase}
              </span>
            ))}
          </span>{" "}
          that look good and work even better
        </h1>

        <div className="masked-text flex flex-wrap justify-center gap-2 sm:gap-4">
          {["Software Developer", "Builder", "Problem Solver"].map((item) => (
            <span
              key={item}
              className="text-xl sm:text-2xl md:text-3xl uppercase font-medium"
            >
              {`${item}.`}
            </span>
          ))}
        </div>

        <a
          href="#about"
          aria-label="Scroll to about section"
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
        >
          <IoArrowDownOutline className="text-4xl sm:text-5xl text-green-500 dark:text-green-400 animate-wiggle hover:animate-custom-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
