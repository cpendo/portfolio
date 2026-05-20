import { MdEmail } from "react-icons/md";
import { RiLinkedinFill } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full py-16 px-6 sm:px-12 bg-white dark:bg-zinc-950"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center max-w-6xl mx-auto gap-5 sm:gap-10">
        {/* Text Block */}
        <div className="flex flex-col flex-1">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold capitalize leading-tight text-black dark:text-zinc-100">
            Let's work
            <span className="font-light italic"> together</span>
          </h2>
          <div className="w-20 sm:w-24 h-px mt-2 bg-green-500 dark:bg-green-400 mb-6 sm:mb-8" />

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-zinc-400 leading-relaxed">
            Whether it&apos;s about a cool idea or a potential collaboration. <br />
            I&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Links */}
        <div className="flex flex-col gap-2 sm:gap-4 flex-shrink-0 w-full sm:w-auto">
          {/* Email */}
          <a
            href={`mailto:pendoc15@gmail.com?subject=${encodeURIComponent(
              "Hi Cynthia 👋"
            )}`}
            className="flex items-center gap-3 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
          >
            <MdEmail
              size={32}
              className="bg-black text-white dark:bg-zinc-100 dark:text-zinc-950 p-1 rounded-sm group-hover:bg-green-600 dark:group-hover:bg-green-500 dark:group-hover:text-white transition-colors duration-300"
            />
            <span className="text-lg sm:text-xl capitalize group-hover:underline text-black dark:text-zinc-100">
              email
            </span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/cpendo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
          >
            <TbBrandGithubFilled
              size={32}
              className="bg-black text-white dark:bg-zinc-100 dark:text-zinc-950 p-1 rounded-sm group-hover:bg-green-600 dark:group-hover:bg-green-500 dark:group-hover:text-white transition-colors duration-300"
            />
            <span className="text-lg sm:text-xl capitalize group-hover:underline text-black dark:text-zinc-100">
              github
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/cynthia-pendo/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
          >
            <RiLinkedinFill
              size={32}
              className="bg-black text-white dark:bg-zinc-100 dark:text-zinc-950 p-1 rounded-sm group-hover:bg-green-600 dark:group-hover:bg-green-500 dark:group-hover:text-white transition-colors duration-300"
            />
            <span className="text-lg sm:text-xl capitalize group-hover:underline text-black dark:text-zinc-100">
              linkedin
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
