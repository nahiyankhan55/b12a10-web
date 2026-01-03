import { useContext } from "react";
import { FaLaptopCode, FaLeaf, FaTshirt, FaTools } from "react-icons/fa";
import WebContext from "../../Context/WebContext";
import { useNavigate } from "react-router";

const TradeCategories = () => {
  const { theme } = useContext(WebContext);
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Electronics & Tech",
      icon: <FaLaptopCode />,
      count: "1,200+ Products",
      color: "text-blue-500",
      aos: "zoom-in",
    },
    {
      id: 2,
      name: "Agriculture & Food",
      icon: <FaLeaf />,
      count: "850+ Products",
      color: "text-green-500",
      aos: "zoom-in",
    },
    {
      id: 3,
      name: "Garments & Textile",
      icon: <FaTshirt />,
      count: "2,100+ Products",
      color: "text-pink-500",
      aos: "zoom-in",
    },
    {
      id: 4,
      name: "Industrial Machinery",
      icon: <FaTools />,
      count: "450+ Products",
      color: "text-orange-500",
      aos: "zoom-in",
    },
  ];

  return (
    <section
      className={`w-full flex flex-col items-center sm:py-20 py-10 px-5 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col items-center gap-2 mb-10 text-center">
        <h2 className="md:text-4xl text-2xl font-bold">
          Top Trading Categories
        </h2>
        <p
          className={`max-w-xl ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Explore the most popular sectors in the global market and find the
          best deals for your business.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
        {categories.map((cat) => (
          <div
            key={cat.id}
            data-aos={cat.aos}
            className={`group p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700 hover:border-purple-500"
                : "bg-gray-50 border border-transparent hover:border-purple-500"
            }`}
          >
            <div
              className={`text-6xl mb-4 transition-transform duration-300 group-hover:scale-110 ${cat.color}`}
            >
              {cat.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
            <p
              className={`text-sm font-medium ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {cat.count}
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-5 px-4 py-2 text-sm font-semibold rounded-full bg-purple-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Browse All
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TradeCategories;
