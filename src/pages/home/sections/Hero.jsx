import { IoArrowDownOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <section className="w-full h-screen flex" id="home">
      <div className="w-full h-full mt-5 sm:mt-12 flex flex-col justify-center items-center gap-8 sm:gap-10 text-center">
        <h1 className="w-full lg:max-w-6xl font-headings leading-15 md:leading-20 lg:leading-28 text-[42px] sm:text-6xl md:text-7xl lg:text-8xl">
          I want to{" "}
          <span className="font-body font-medium italic text-green-500">
            build apps
          </span>{" "}
          that look good and work even better
        </h1>

        <div className="masked-text flex flex-wrap justify-center gap-2 sm:gap-4">
          {["Software Developer", "Builder", "Problem Solver"].map((item) => (
            <span
              key={item}
              className="text-xl sm:text-2xl md:text-3xl text-black uppercase font-medium"
            >
              {`${item}.`}
            </span>
          ))}
        </div>

        <a href="#about">
          <IoArrowDownOutline className="text-4xl sm:text-5xl text-green-500 animate-wiggle hover:animate-custom-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
