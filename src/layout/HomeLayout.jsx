import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div className="w-screen bg-main-bg">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
