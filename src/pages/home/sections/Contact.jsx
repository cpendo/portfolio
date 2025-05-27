import { MdEmail } from "react-icons/md";
import { RiLinkedinFill } from "react-icons/ri";
import { TbBrandGithubFilled } from "react-icons/tb";

const Contact = () => {
  return (
    <section id="contact" className="w-full py-16 px-6 sm:px-12 bg-white">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center max-w-6xl mx-auto gap-5 sm:gap-10">
        {/* Text Block */}
        <div className="flex flex-col flex-1">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold capitalize leading-tight">
            Let's work
            <span className="font-light italic"> together</span>
          </h2>
          <div className="w-20 sm:w-24 h-px mt-2 bg-green-500 mb-6 sm:mb-8" />

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
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
            className="flex items-center gap-3 group"
          >
            <MdEmail
              size={32}
              className="bg-black text-white p-1 rounded-sm group-hover:bg-green-600 transition-colors duration-300"
            />
            <span className="text-lg sm:text-xl capitalize group-hover:underline">
              email
            </span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/cpendo"
            target="_blank"
            className="flex items-center gap-3 group"
          >
            <TbBrandGithubFilled
              size={32}
              className="bg-black text-white p-1 rounded-sm group-hover:bg-green-600 transition-colors duration-300"
            />
            <span className="text-lg sm:text-xl capitalize group-hover:underline">
              github
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/cynthia-pendo/"
            target="_blank"
            className="flex items-center gap-3 group"
          >
            <RiLinkedinFill
              size={32}
              className="bg-black text-white p-1 rounded-sm group-hover:bg-green-600 transition-colors duration-300"
            />
            <span className="text-lg sm:text-xl capitalize group-hover:underline">
              linkedin
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
