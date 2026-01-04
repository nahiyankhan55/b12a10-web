import { Outlet } from "react-router";
import Sidebar from "../../Components/Sidebar";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 h-screen w-full">
      <div className="col-span-2">
        <Sidebar></Sidebar>
      </div>

      <div className="col-span-10 overflow-y-auto w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
