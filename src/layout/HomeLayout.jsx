import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div className="w-full bg-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
