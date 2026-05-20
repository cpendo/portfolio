import { FiExternalLink, FiGithub } from "react-icons/fi";

import CryptoWorldImage from "../../../assets/screenshot.png";
import HomeFitImage from "../../../assets/homefit.png";

const projects = [
  {
    name: "CryptoWorld",
    description:
      "This app fetches real-time cryptocurrency data and presents it in a clean, responsive UI. Built with React and deployed on Vercel, it helped me practice integrating APIs and managing state.",
    image: CryptoWorldImage,
    tags: ["React", "RTK Query", "API Integration", "Responsive"],
    liveUrl: "https://cryptoworld-project.vercel.app/",
    codeUrl: "https://github.com/cpendo/cryptoWorld",
  },
  {
    name: "HomeFit",
    description:
      "A personal workout tracker that helps users stay consistent with their fitness goals. Browse categorized workouts with embedded YouTube demos, log sets and reps, and manage profile data — backed by secure authentication, email verification, and a password reset flow.",
    image: HomeFitImage,
    tags: ["React", "Redux Toolkit", "Node.js", "Express", "SQLite", "Passport.js"],
    liveUrl: "https://homefit-project.vercel.app/",
    codeUrl: "https://github.com/cpendo/HomeFit",
  },
];

const ProjectCard = ({ project, reverse }) => (
  <div
    className={`flex flex-col ${
      reverse ? "lg:flex-row-reverse" : "lg:flex-row"
    } justify-center gap-12 lg:gap-16 items-stretch`}
  >
    {/* Image Block */}
    <div className="flex-1 flex">
      <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm dark:shadow-none dark:border dark:border-zinc-800 w-full">
        <div className="aspect-video flex justify-center">
          <img
            src={project.image}
            alt={`Screenshot of the ${project.name} application`}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>
      </div>
    </div>

    {/* Text Block */}
    <div className="flex-1 flex flex-col gap-6 justify-center">
      <div>
        <h3 className="text-2xl sm:text-4xl font-bold text-black dark:text-zinc-100">
          {project.name}
        </h3>
        <div className="w-10 sm:w-12 h-px mt-2 bg-green-600 dark:bg-green-400" />
      </div>

      <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-zinc-300">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-3 text-sm tracking-wide">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="border border-gray-300 dark:border-zinc-700 dark:text-zinc-300 px-3 py-1.5"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-6 gap-4 pt-6">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.name} (opens in new tab)`}
            className="flex justify-center items-center space-x-2 bg-black text-white dark:bg-zinc-100 dark:text-zinc-950 px-6 py-3 hover:bg-gray-800 dark:hover:bg-white transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-zinc-950"
          >
            <span>View Live</span>
            <FiExternalLink
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
        )}

        <a
          href={project.codeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.name} source code on GitHub (opens in new tab)`}
          className="flex justify-center items-center space-x-2 border border-black dark:border-zinc-100 text-black dark:text-zinc-100 px-6 py-3 hover:bg-black hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-950 transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-zinc-950"
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
);

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full h-fit px-6 sm:px-12 bg-gray-50 dark:bg-zinc-950 py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Heading */}
        <div>
          <h2 className="text-4xl sm:text-6xl capitalize font-bold text-black dark:text-zinc-100">
            What I've
            <span className="font-light italic"> Built</span>
          </h2>
          <div className="w-16 sm:w-24 h-px mt-2 bg-green-500 dark:bg-green-400" />
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-20">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.name}
              project={project}
              reverse={idx % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
