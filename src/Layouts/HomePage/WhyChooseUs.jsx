import { useContext } from "react";
import { FaPlaneDeparture } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import WebContext from "../../Context/WebContext";

const WhyChooseUs = () => {
  const { theme } = useContext(WebContext);

  return (
    <section
      className={`w-full p-2 flex flex-col items-center gap-1 bg-linear-to-bl ${
        theme === "dark"
          ? "from-sky-700 via-gray-500 to-gray-600"
          : "from-sky-300 via-white to-white"
      } sm:py-20 py-10 sm:px-5`}
    >
      <h1 className="md:text-4xl text-2xl font-bold text-center">
        Why Choose Our IE Hub
      </h1>
      <p
        className={`${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }  text-center font-medium max-w-2xl mx-auto mt-2`}
      >
        A reliable platform built to simplify global trade with fast processing,
        secure systems, and a smooth importing and exporting experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
        <div
          data-aos="fade-up-right"
          className="p-6 bg-white shadow-md rounded border-2 border-sky-500 hover:scale-105 hover:shadow-lg hover:shadow-sky-300 duration-300 transition-all"
        >
          <FaPlaneDeparture className="text-5xl mb-3 text-sky-700"></FaPlaneDeparture>
          <h3 className="text-xl font-semibold mb-2 text-black">
            Fast Global Shipping
          </h3>
          <p className="text-gray-600">
            We connect you with trusted logistics partners for quick deliveries.
          </p>
        </div>

        <div
          data-aos="fade-up"
          className="p-6 bg-white shadow-md rounded border-2 border-green-500 hover:scale-105 hover:shadow-lg hover:shadow-green-300 duration-300 transition-all"
        >
          <RiSecurePaymentLine className="text-5xl mb-3 text-green-700"></RiSecurePaymentLine>
          <h3 className="text-xl font-semibold mb-2 text-black">
            Secure User Data
          </h3>
          <p className="text-gray-600">
            Your information stays protected with modern security standards.
          </p>
        </div>

        <div
          data-aos="fade-up-left"
          className="p-6 bg-white shadow-md rounded border-2 border-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-300 duration-300 transition-all"
        >
          <MdOutlineVerified className="text-5xl mb-3 text-purple-700"></MdOutlineVerified>
          <h3 className="text-xl font-semibold mb-2 text-black">
            Verified Exporters
          </h3>
          <p className="text-gray-600">
            All exporters go through a strict verification process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
