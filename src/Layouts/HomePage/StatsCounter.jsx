import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import DataLoader from "../../Components/DataLoader";
import { useContext } from "react";
import WebContext from "../../Context/WebContext";
import { FaUsers, FaShip, FaDownload } from "react-icons/fa";

const StatsCounter = () => {
  const AxiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  // TanStack Query for dynamic counts
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/home/stats/count");
      return res.data.stats;
    },
    retry: 3,
    retryDelay: 2000,
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
    <section
      className={`w-full py-16 px-5 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="md:text-4xl text-2xl font-bold">
            Platform Statistics
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            } font-medium max-w-2xl mx-auto mt-2`}
          >
            Real-time insights into our growing global trade community. Track
            the impact of secure and smart trading.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              data-aos="fade-up"
              className={`p-8 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-lg hover:shadow-purple-500/10 border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }`}
            >
              <div
                className={`text-3xl mb-6 p-5 rounded-full ${stat.bgColor} ${stat.color}`}
              >
                {stat.icon}
              </div>
              <h2
                className={`text-3xl font-black mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {stat.value.toLocaleString()}+
              </h2>
              <p
                className={`text-base font-semibold uppercase tracking-wider ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
