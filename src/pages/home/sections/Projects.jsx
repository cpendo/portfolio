const Projects = () => {
  return (
    <div className="w-full h-fit px-6 py-8">
      <h3 className="font-headings uppercase text-green-500 text-6xl">
        what i&apos;ve built
      </h3>

      <div className="bg-black h-0.5 mx-2 mb-3"></div>

      <div className="flex flex-row px-3">
        <div className="flex flex-1 flex-col justify-start items-start">
          <h4 className="font-headings text-4xl py-5">HomeFit</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
            eum magnam voluptatibus impedit officiis commodi, dignissimos esse
            nemo ea cumque! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
            eum magnam voluptatibus impedit officiis commodi, dignissimos esse
            nemo ea cumque!
          </p>
          <button className="bg-green-500 p-3">view project</button>
        </div>
        <div className="bg-gray-300 flex flex-1 h-100"></div>
      </div>

      {/* <div className="flex flex-row">
        <div className="flex flex-1 flex-col-reverse">
          <h4>KnowItAll</h4>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia
            eum magnam voluptatibus impedit officiis commodi, dignissimos esse
            nemo ea cumque!
          </p>
          <button>view project</button>
        </div>
        <div className="bg-gray-300 flex flex-1 h-100"></div>
      </div> */}
      
    </div>
  );
};

export default Projects;
