import { Link, NavLink } from "react-router";
import { MdDashboard, MdPostAdd } from "react-icons/md";
import { FaBoxOpen, FaHome, FaShip, FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const menuLinks = [
    {
      to: "/dashboard/home",
      label: "Dashboard Home",
      icon: <MdDashboard />,
    },
    {
      to: "/dashboard/add-product",
      label: "Add Product",
      icon: <MdPostAdd />,
    },
    {
      to: "/dashboard/my-imports",
      label: "My Imports",
      icon: <FaBoxOpen />,
    },
    {
      to: "/dashboard/my-exports",
      label: "My Exports",
      icon: <FaShip />,
    },
    {
      to: "/dashboard/profile",
      label: "My Profile",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <div className="w-full h-full bg-purple-200 sm:p-4 p-1 space-y-2">
      {menuLinks.map((item) => {
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
