import { useContext } from "react";
import { toast } from "react-toastify";
import WebContext from "../../Context/WebContext";

const Newsletter = () => {
  const { theme } = useContext(WebContext);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (email) {
      toast.success("Thank you for subscribing to our newsletter!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      e.target.reset();
    }
  };

  return (
    <section className="w-full py-12 px-5">
      <div
        data-aos="zoom-in"
        className={`max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl ${
          theme === "dark"
            ? "bg-linear-to-r from-purple-900 via-gray-800 to-gray-900"
            : "bg-linear-to-r from-purple-600 via-purple-500 to-indigo-600"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16 gap-8">
          {/* Text Content */}
          <div className="text-white lg:w-1/2 space-y-4 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Stay Ahead in Global Trade
            </h2>
            <p className="text-purple-100 text-lg opacity-90">
              Subscribe to our newsletter for exclusive market insights, trade
              leads, and the latest global export trends delivered to your
              inbox.
            </p>
          </div>

          {/* Form Content */}
          <div className="w-full lg:w-1/2 max-w-md">
            <form
              onSubmit={handleSubscribe}
              className="relative flex flex-col sm:flex-row items-center gap-3 bg-white/10 p-2 rounded-2xl backdrop-blur-md border border-white/20"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your business email"
                required
                className="w-full bg-white text-gray-900 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-gray-900 text-white font-bold px-8 py-4 rounded-xl hover:bg-black transition-colors duration-300 cursor-pointer shadow-lg whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
            <p className="text-xs text-purple-200 mt-4 text-center md:text-left italic">
              * We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
