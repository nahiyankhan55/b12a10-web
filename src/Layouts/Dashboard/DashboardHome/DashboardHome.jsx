import { useContext } from "react";
import { HeadProvider, Title } from "react-head";
import WebContext from "../../../Context/WebContext";
import DashboardStats from "./DashboardStats";
import OrderStatusChart from "./OrderStatusChart";

const DashboardHome = () => {
  const { userName } = useContext(WebContext);
  return (
    <div className="flex flex-col items-center">
      <HeadProvider>
        <Title>Welcome In Dashboard || IE Hub</Title>
      </HeadProvider>
      <div className="w-full py-10 md:py-16 text-center bg-linear-to-r from-purple-100 via-white to-purple-100 md:text-3xl sm:text-2xl text-lg font-medium">
        Welcome{" "}
        <span className="font-semibold italic text-sky-700">
          {userName || "User"}
        </span>{" "}
        in IE Hub
      </div>
      <DashboardStats></DashboardStats>
      <OrderStatusChart></OrderStatusChart>
    </div>
  );
};

export default DashboardHome;
