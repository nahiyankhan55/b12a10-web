import { Link, NavLink } from "react-router";
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
  const commonLinks = [
    { to: "/dashboard/home", label: "Dashboard", icon: <MdDashboard /> },
  ];

  return (
    <div className="w-full h-full bg-purple-200 sm:p-4 p-1 space-y-2">
      {commonLinks.map((item) => {
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md font-medium ${
                isActive
                  ? "bg-purple-500 text-white"
                  : "text-black hover:bg-purple-300"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            {/* desktop text */}
            <span className="lg:flex hidden lg:text-sm xl:text-base">
              {item.label}
            </span>
          </NavLink>
        );
      })}
      <Link
        to={"/"}
        className="flex items-center gap-2 px-3 py-2 rounded-md font-medium text-black hover:bg-orange-300"
      >
        <FaHome className="text-xl" />
        <span className="lg:flex hidden lg:text-sm xl:text-base">
          Back Home
        </span>
      </Link>
    </div>
  );
};

export default Sidebar;
