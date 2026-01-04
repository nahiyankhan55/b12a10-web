import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaUsers, FaShip, FaDownload } from "react-icons/fa";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import DataLoader from "../../../Components/DataLoader";

const DashboardStats = () => {
  const AxiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  // TanStack Query for dynamic counts
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/home/stats/count");
      return res.data.stats;
    },
  });

  const statsData = [
    {
      id: 1,
      label: "Total Users",
      value: stats.users || 0,
      icon: <FaUsers />,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      label: "Export Deals",
      value: stats.exports || 0,
      icon: <FaShip />,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 3,
      label: "Import Deals",
      value: stats.imports || 0,
      icon: <FaDownload />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ];

  if (isLoading) return <DataLoader />;

  return (
    <div className="w-full mb-8 px-2 md:px-5 py-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className={`p-6 rounded-2xl flex items-center gap-5 transition-all duration-300 shadow-sm border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }`}
          >
            {/* Icon Box */}
            <div
              className={`text-2xl p-4 rounded-xl ${stat.bgColor} ${stat.color}`}
            >
              {stat.icon}
            </div>

            {/* Content Box */}
            <div>
              <h2
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {stat.value.toLocaleString()}
              </h2>
              <p
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
