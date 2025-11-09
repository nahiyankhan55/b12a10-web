import { FaPlaneDeparture } from "react-icons/fa6";
import { MdOutlineVerified } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

const WhyChooseUs = () => {
  return (
    <section className="py-10 px-5 bg-linear-to-bl from-sky-300 via-white to-white">
      <h1 className="md:text-4xl text-2xl font-bold text-center">
        Why Choose Our IE Hub
      </h1>
      <p className="text-gray-600 text-center font-medium max-w-2xl mx-auto mt-2">
        A reliable platform built to simplify global trade with fast processing,
        secure systems, and a smooth importing and exporting experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
        <div
          data-aos="fade-up-right"
          className="p-6 bg-white shadow-md rounded border-2 border-sky-500 hover:scale-105 hover:shadow-lg hover:shadow-sky-300 duration-300 transition-all"
        >
          <FaPlaneDeparture className="text-5xl mb-3 text-sky-700"></FaPlaneDeparture>
          <h3 className="text-xl font-semibold mb-2">Fast Global Shipping</h3>
          <p className="text-gray-600">
            We connect you with trusted logistics partners for quick deliveries.
          </p>
        </div>

        <div
          data-aos="fade-up"
          className="p-6 bg-white shadow-md rounded border-2 border-green-500 hover:scale-105 hover:shadow-lg hover:shadow-green-300 duration-300 transition-all"
        >
          <RiSecurePaymentLine className="text-5xl mb-3 text-green-700"></RiSecurePaymentLine>
          <h3 className="text-xl font-semibold mb-2">Secure User Data</h3>
          <p className="text-gray-600">
            Your information stays protected with modern security standards.
          </p>
        </div>

        <div
          data-aos="fade-up-left"
          className="p-6 bg-white shadow-md rounded border-2 border-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-300 duration-300 transition-all"
        >
          <MdOutlineVerified className="text-5xl mb-3 text-purple-700"></MdOutlineVerified>
          <h3 className="text-xl font-semibold mb-2">Verified Exporters</h3>
          <p className="text-gray-600">
            All exporters go through a strict verification process.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
