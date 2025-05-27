import AvatarImage from "../../../assets/avatar.png";

const AboutMe = () => {
  return (
    <section id="about" className="w-full py-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-5">
        {/* Heading */}
        <div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold capitalize leading-tight">
            About <span className="font-light italic">Me</span>
          </h2>
          <div className="w-16 h-px bg-green-500 mt-2" />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center  lg:flex-row gap-10 lg:gap-20 lg:items-start">
          {/* Image */}
          <div className="flex-shrink-0 flex justify-center">
            <img
              src={AvatarImage} 
              alt="Avatar image"
              className="w-60 sm:w-72 md:w-80  h-auto object-cover rounded-2xl"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6 text-base sm:text-xl leading-relaxed max-w-2xl">
            <p>
              I'm a software developer based in Kenya who builds apps for fun,
              function, and when I'm lucky, both.
            </p>

            <p>
              Sometimes it feels like a free-fall. One moment I know exactly
              what I’m doing, the next I’m staring at a bug that makes me
              question my life choices. But I love that. I love the challenge. I
              love the satisfaction of getting something just right.
            </p>

            <p>
              I’m currently working on projects that sharpen both my frontend
              and backend skills. And I’m always looking to grow as a developer
              and a problem-solver.
            </p>

            <p className="font-black italic">
              When I’m not working, I’m sketching out new app ideas, watching TV
              shows, or casually befriending AI just in case they take over and
              I need a character reference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
