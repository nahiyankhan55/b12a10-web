import { useContext } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import WebContext from "../../Context/WebContext";

const Testimonials = () => {
  const { theme } = useContext(WebContext);

  const reviews = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "CEO, Global Exports Ltd.",
      image: "https://i.pravatar.cc/150?u=rajesh",
      comment:
        "IE Hub has transformed our international trade. The platform is secure, efficient, and the support is absolutely fantastic!",
      rating: 5,
      aos: "fade-right",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Owner, Tech Imports LLC.",
      image: "https://i.pravatar.cc/150?u=maria",
      comment:
        "Finding verified suppliers was always a challenge until we started using this hub. It's truly a game changer for us.",
      rating: 5,
      aos: "fade-up",
    },
    {
      id: 3,
      name: "Ahmed Al-Farsi",
      role: "Manager, Desert Trade Co.",
      image: "https://i.pravatar.cc/150?u=ahmed",
      comment:
        "The logistics integration and real-time tracking saved us hours of manual work. Highly recommended for any serious trader.",
      rating: 4,
      aos: "fade-left",
    },
  ];

  return (
    <section
      className={`w-full flex flex-col items-center sm:py-20 py-10 px-5 ${
        theme === "dark"
          ? "bg-linear-to-b from-gray-900 to-gray-800 text-white"
          : "bg-linear-to-b from-white to-purple-50 text-black"
      }`}
    >
      <div className="flex flex-col items-center gap-2 mb-12 text-center">
        <h2 className="md:text-4xl text-2xl font-bold italic">
          What Our Clients Say
        </h2>
        <div className="w-20 h-1.5 bg-purple-600 rounded-full"></div>
        <p
          className={`max-w-xl mt-3 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Hear from our satisfied customers who successfully grow their
          businesses using IE Hub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            data-aos={rev.aos}
            className={`relative p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-purple-500/20 border-b-4 border-purple-600 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Quote Icon */}
            <FaQuoteLeft className="text-4xl text-purple-600/20 absolute top-6 left-6" />

            <div className="relative z-10">
              <div className="flex gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-sm" />
                ))}
              </div>

              <p
                className={`italic mb-8 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                "{rev.comment}"
              </p>

              <div className="flex items-center gap-4 border-t pt-6 border-gray-100 dark:border-gray-700">
                <img
                  src={rev.image}
                  alt={rev.name}
                  className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg leading-tight">
                    {rev.name}
                  </h4>
                  <p className="text-sm text-purple-600 font-medium">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
