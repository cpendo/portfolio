import { useState, useEffect } from "react";

const ScrollLine = () => {
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const scrollPercentage = (currentScroll / totalHeight) * 100;
      setScrollHeight(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-4 sm:left-8 top-0 w-0.5 bg-green-500 z-50 transition-all duration-300"
      style={{ height: `${scrollHeight}vh` }}
    />
  );
};

export default ScrollLine