import { IoArrowDownOutline } from "react-icons/io5";

const Hero = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-5/6 h-full mx-auto mt-10 flex flex-col justify-center items-center gap-8">
        <h1 className="font-headings text-8xl text-center text-green-500">
          I want to build apps that look good and work even better{" "}
        </h1>
        <h2 className="uppercase text-3xl font-medium">
          Software Developer. Builder. Problem Solver
        </h2>

        <div className="size-15 border-2 border-black rounded-full flex items-center justify-center animate-pulse [animation-duration:4s] group hover:animate-none transition duration-600">
          <IoArrowDownOutline className="text-4xl  [animation-duration:4s] group-hover:animate-bounce group-hover:text-green-500 transition-all duration-600" />
        </div>
       
      </div>
    </div>
  );
};

export default Hero;
