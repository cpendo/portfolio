import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import { caseStudies } from "../../case-studies";

const CaseStudies = () => {
  return (
    <section
      id="case-studies"
      className="w-full px-6 sm:px-12 bg-white dark:bg-zinc-950 py-12 sm:py-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Heading */}
        <div>
          <h2 className="text-4xl sm:text-6xl capitalize font-bold text-black dark:text-zinc-100">
            Case <span className="font-light italic">Studies</span>
          </h2>
          <div className="w-16 sm:w-24 h-px mt-2 bg-green-500 dark:bg-green-400" />
        </div>

        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
          Deep dives into the design calls behind my work — the trade-offs, the things I changed my
          mind about, and why.
        </p>

        {/* Studies */}
        <div className="flex flex-col border-t border-gray-200 dark:border-zinc-800">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              to={`/case-studies/${cs.slug}`}
              className="group flex flex-col gap-3 py-8 border-b border-gray-200 dark:border-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-zinc-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                {cs.title}
              </h3>
              <p className="max-w-3xl text-base sm:text-lg leading-relaxed text-gray-600 dark:text-zinc-400">
                {cs.hook}
              </p>
              <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
                Read case study
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
