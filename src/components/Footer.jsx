const Footer = () => {
  return (
    <footer className="py-4 sm:py-8 px-10 sm:px-12 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0 text-base text-gray-500 dark:text-zinc-500">
        <p>© {new Date().getFullYear()} Cynthia Pendo</p>
        <p>Built with React & Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;
