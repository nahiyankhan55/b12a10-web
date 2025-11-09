import Marquee from "react-fast-marquee";
import sb1 from "./../../assets/sb1.jpg";
import sb2 from "./../../assets/sb2.jpg";
import sb3 from "./../../assets/sb3.jpg";
import sb4 from "./../../assets/sb4.jpg";
import sb5 from "./../../assets/sb5.jpg";
import sb6 from "./../../assets/sb6.jpg";
import sb7 from "./../../assets/sb7.jpg";

const WeWorkWith = () => {
  return (
    <section className="w-full p-2 flex flex-col items-center  gap-1 bg-linear-to-br from-purple-300 via-white to-white sm:py-20 py-10 sm:px-5">
      <h2 className="md:text-4xl sm:text-3xl text-2xl font-bold text-black">
        We Work With
      </h2>
      <p className="max-w-2xl font-medium text-gray-600 mt-2 text-center mx-auto">
        Trusted by international exporters, suppliers, and logistics companies
        across the world. These global brands help our growing import export
        ecosystem.
      </p>
      <div className="mt-5 md:w-4/5 w-full mx-auto bg-white border-b-2 border-gray-100 shadow-lg shadow-gray-400 p-1 rounded-lg sm:h-44 h-28 flex flex-col justify-center">
        <Marquee gradient speed={50} gradientWidth={50} pauseOnHover>
          <img
            src={sb1}
            alt="image"
            className="sm:h-32 h-24 object-contain ml-10 border shadow-lg shadow-gray-600"
          />
          <img
            src={sb2}
            alt="image"
            className="sm:h-32 h-24 object-contain ml-10 border shadow-lg shadow-gray-600"
          />
          <img
            src={sb3}
            alt="image"
            className="sm:h-32 h-24 object-contain ml-10 border shadow-lg shadow-gray-600"
          />
          <img
            src={sb4}
            alt="image"
            className="sm:h-32 h-24 object-contain ml-10 border shadow-lg shadow-gray-600"
          />
          <img
            src={sb5}
            alt="image"
            className="sm:h-32 h-24 object-contain ml-10 border shadow-lg shadow-gray-600"
          />
          <img
            src={sb6}
            alt="image"
            className="sm:h-32 h-24 object-contain ml-10 border shadow-lg shadow-gray-600"
          />
          <img
            src={sb7}
            alt="image"
            className="sm:h-32 h-24 object-contain ml-10 border shadow-lg shadow-gray-600"
          />
        </Marquee>
      </div>
    </section>
  );
};

export default WeWorkWith;
