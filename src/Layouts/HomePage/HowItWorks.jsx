import { useContext } from "react";
import { FaUserPlus, FaSearchPlus, FaHandshake, FaShip } from "react-icons/fa";
import WebContext from "../../Context/WebContext";

const HowItWorks = () => {
  const { theme } = useContext(WebContext);

  const steps = [
    {
      id: 1,
      icon: <FaUserPlus />,
      title: "Create Account",
      subtitle:
        "Register your business and verify your profile to get started Import-Export.",
      aos: "fade-up",
    },
    {
      id: 2,
      icon: <FaSearchPlus />,
      title: "Find Opportunities",
      subtitle:
        "Search for premium global products or list your own trade leads.",
      aos: "fade-up",
    },
    {
      id: 3,
      icon: <FaHandshake />,
      title: "Secure Deal",
      subtitle:
        "Communicate directly with verified partners and finalize terms.",
      aos: "fade-up",
    },
    {
      id: 4,
      icon: <FaShip />,
      title: "Global Shipment",
      subtitle:
        "Track your cargo with our integrated logistics and customs support.",
      aos: "fade-up",
    },
  ];

  return (
    <section
      className={`w-full flex flex-col items-center bg-linear-to-tr ${
        theme === "dark"
          ? "from-gray-900 via-gray-800 to-purple-900 text-white"
          : "from-white via-purple-50 to-purple-100 text-black"
      } sm:py-20 py-10 px-5`}
    >
      <div className="flex flex-col items-center gap-2 mb-10">
        <h1 className="md:text-4xl text-2xl font-bold text-center">
          How It Works
        </h1>
        <div className="w-24 h-1 bg-purple-600 rounded-full"></div>
        <p
          className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          } text-center font-medium max-w-2xl mx-auto mt-2`}
        >
          Follow these simple steps to expand your business reach across the
          globe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            data-aos={step.aos}
            className={`p-8 flex flex-col items-center text-center shadow-lg rounded-xl border-t-4 border-purple-600 transition-all duration-300 hover:-translate-y-2 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-5xl mb-4 text-purple-600 bg-purple-100 p-4 rounded-full">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {step.subtitle}
            </p>
            <div className="mt-4 font-black text-4xl text-purple-800">
              0{step.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
