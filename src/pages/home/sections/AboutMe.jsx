import AvatarImage from "../../../assets/img.png";

const AboutMe = () => {
  return (
    <div className="w-full h-screen px-6 pt-8">
      <div className="flex flex-row justify-between items-start">
        <div className="flex flex-2 flex-col gap-6">
          <h3 className="font-headings uppercase text-green-500 text-6xl">
            About Me
          </h3>
          <p className="text-2xl font-semibold">
            I though I&apos;d become a doctor or a lawyer (yes, like everyone
            else). Somewhere along the way, I got into coding and something
            about it just fit.
          </p>
          <p className="text-2xl">
            Sometimes it feels like free-fall. One minute I know exactly what
            I&apos;m doing, the next, a simple bug makes me question everything.
            Still, I enjoy the challenge. There&apos;s something satisfying
            about solving problems and building things that just work.
          </p>

          <h4 className="font-headings text-4xl">
            I want my work to be thoughtful, practical, and a little bit clever.
          </h4>
        </div>
        <div className="flex flex-1">
          <img src={AvatarImage} alt="Avatar image" className="" />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
