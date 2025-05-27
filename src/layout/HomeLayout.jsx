import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollLine from "../components/ScrollLine";

const HomeLayout = () => {
 

  return (
    <div className="w-full bg-white">
      <ScrollLine />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
