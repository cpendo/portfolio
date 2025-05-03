import AvatarImage from "../../../assets/img-1.png";

const AboutMe = () => {
  return (
    <div className="w-full h-screen px-6 pt-8">
      <div className="flex flex-row justify-between gap-10">
        <div className="flex flex-1">
          <img
            src={AvatarImage}
            alt="Avatar image"
            className="w-[90%] p-6  rounded-xl"
          />
        </div>
        
        <div className="flex flex-1 flex-col">
          <h3 className="font-headings uppercase text-green-500 text-4xl">
            About Me
          </h3>

          <div className="flex flex-col gap-6 pt-5 text-lg">
            <h4 className="capitalize text-4xl font-bold">
              Hey, I&apos;m Cynthia
            </h4>
            <p>
              A software developer based in Kenya who builds apps for fun,
              function, and when i&apos;m lucky, both. I like my work
              thoughtful, practical, and a little bit clever.
            </p>

            <p>
              Sometimes it feels like free-fall. One moment I know exactly what
              I&apos;m doing, the next I&apos;m staring at a bug that makes me
              question my life choices. But I love that. I love the challenge. I
              love the satisfaction of getting something just right.
            </p>

            <p>
              I&apos;m currently working on projects that sharpen both my
              frontend and backend skills. And I&apos;m always looking to grow
              as a developer and a problem-solver.
            </p>

            <p className="font-black italic">
              When I&apos;m not working, I&apos;m sketching out new app ideas,
              watching TV shows, or casually befriending AI just in case they take over and I need a character reference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
