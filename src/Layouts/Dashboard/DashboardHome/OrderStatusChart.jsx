import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosPublic from "../../../Hook/useAxiosPublic";
import WebContext from "../../../Context/WebContext";
import DataLoader from "../../../Components/DataLoader";

const StatsPieChart = () => {
  const AxiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  // TanStack Query to get the same data as DashboardStats
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/home/stats/count");
      return res.data.stats;
    },
  });

  if (isLoading) return <DataLoader />;

  // Chart data formatting
  const chartData = [
    { name: "Total Users", value: stats.users || 0 },
    { name: "Export Deals", value: stats.exports || 0 },
    { name: "Import Deals", value: stats.imports || 0 },
  ].filter((item) => item.value > 0);

  // Colors mapping for the stats
  const COLORS = ["#3b82f6", "#a855f7", "#10b981"]; // Blue, Purple, Emerald

  return (
    <div
      className={`w-full p-6 rounded-2xl border transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-100"
      }`}
    >
      <h2
        className={`text-xl font-bold mb-6 text-center ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Business Overview
      </h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" dataKey="value">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                color: theme === "dark" ? "#ffffff" : "#000000",
                borderRadius: "10px",
              }}
              itemStyle={{ color: theme === "dark" ? "#fff" : "#000" }}
            />
            <Legend
              verticalAlign="bottom"
              formatter={(value) => (
                <span
                  style={{ color: theme === "dark" ? "#9ca3af" : "#4b5563" }}
                >
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsPieChart;
