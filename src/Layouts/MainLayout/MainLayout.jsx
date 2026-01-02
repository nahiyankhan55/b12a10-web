import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar></Navbar>
      <div className="py-9 w-full"></div>
      <div className="w-full">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
