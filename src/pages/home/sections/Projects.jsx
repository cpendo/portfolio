import { FiExternalLink, FiGithub } from "react-icons/fi";

import CryptoWorldImage from "../../../assets/screenshot.png";

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full h-fit px-6 sm:px-12 bg-gray-50 py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Heading */}
        <div>
          <h2 className="text-4xl sm:text-6xl capitalize font-bold">
            What I've
            <span className="font-light italic"> Built</span>
          </h2>
          <div className="w-16 sm:w-24 h-px mt-2 bg-green-500" />
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row justify-center gap-12 lg:gap-16 items-stretch">
          {/* Image Block */}
          <div className="flex-1 flex">
            <div className="bg-white p-6 sm:p-8 shadow-sm w-full">
              <div className="aspect-video flex justify-center">
                <img
                  src={CryptoWorldImage}
                  alt="App screenshot"
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
            </div>
          </div>

          {/* Text Block */}
          <div className="flex-1 flex flex-col gap-6 justify-center">
            <div>
              <h3 className="text-2xl sm:text-4xl font-bold">CryptoWorld</h3>
              <div className="w-10 sm:w-12 h-px mt-2 bg-green-600 " />
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              This app fetches real-time cryptocurrency data and presents it in
              a clean, responsive UI. Built with React and deployed on Vercel,
              it helped me practice integrating APIs and managing state.
            </p>

            <div className="flex flex-wrap gap-3 text-sm tracking-wide">
              <span className="border border-gray-300 px-3 py-1.5">React</span>
              <span className="border border-gray-300 px-3 py-1.5">
                RTK Query
              </span>
              <span className="border border-gray-300 px-3 py-1.5">
                API Integration
              </span>
              <span className="border border-gray-300 px-3 py-1.5">
                Responsive
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-6 gap-4 pt-6">
              <a
                href="https://crypto-world-two.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center space-x-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors duration-300 group"
              >
                <span>View Live</span>
                <FiExternalLink
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </a>

              <a
                href="https://github.com/cpendo/cryptoWorld"
                target="_blank"
                className="flex justify-center items-center space-x-2 border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300 group"
              >
                <span>Code</span>
                <FiGithub
                  size={16}
                  className="group-hover:rotate-12 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
