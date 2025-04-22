import { FaArrowDownLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="w-full h-screen flex ">
      <div className="w-5/6 h-full mx-auto mt-10 flex flex-col justify-center items-center gap-8">
        <h1 className="font-headings text-8xl text-center text-green-500">
          I want to build apps that look good and work even better{" "}
        </h1>
        <h2 className="uppercase text-3xl font-medium">
          Software Developer. Builder. Problem Solver
        </h2>
        <FaArrowDownLong className="text-5xl" />
      </div>
    </div>
  );
};

export default Hero;
