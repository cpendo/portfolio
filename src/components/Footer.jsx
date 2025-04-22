const Footer = () => {
  return (
    <div className="bg-green-500 text-black uppercase py-8">
      <h3 className="text-8xl text-center">
        <span className="font-headings tracking-wider">Let&apos;s</span> connect
      </h3>

      <div className="bg-black h-0.5 mx-6 mb-3"></div>

      <div className="flex flex-row justify-between px-7">
        <div className="flex flex-col w-1/2 gap-2">
          <h5 className="text-3xl font-semibold">let&apos; talk!</h5>
          <p className="text-2xl">
            Whether it&apos;s about a cool idea or a potential collaboration.
            I&apos;d love to hear from you.
          </p>
        </div>
        <div className="flex flex-col gap-2 ">
          <h5 className="text-3xl font-semibold">find me on</h5>
          <ul className="text-xl">
            <li className="text-end">
              <a href="">email</a>
            </li>
            <li className="text-end">
              <a href="">github</a>
            </li>
            <li className="text-end">
              <a href="">linkedin</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
