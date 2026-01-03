import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// images
import slider1 from "./../../assets/slide1.jpg";
import slider2 from "./../../assets/slide2.jpg";
import slider3 from "./../../assets/slide3.png";
import { useNavigate } from "react-router";

const slides = [
  {
    img: slider1,
    title: "Global Trade",
    subtitle: "Manage import export operations smartly",
    path: "/products",
  },
  {
    img: slider2,
    title: "Smart Term",
    subtitle: "Best security terms in shipments",
    path: "/terms-conditions",
  },
  {
    img: slider3,
    title: "IE Hub",
    subtitle: "All import export tools in one",
    path: "/about",
  },
];

const HomeSlider = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden">
      <Swiper
        className="w-full shadow-md shadow-gray-400"
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full">
              {/* Image */}
              <img
                className="w-full lg:h-[420px] md:h-[380px] sm:h-[300px] h-[220px] object-cover"
                src={slide.img}
                alt="slider"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center bg-linear-to-r from-black/80 via-black/50 to-transparent">
                <div className="px-6 md:px-12 lg:px-20 sm:space-y-4 space-y-2 text-white max-w-xl">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold bg-linear-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                    {slide.title}
                  </h1>

                  <p className="sm:text-sm md:text-base text-xs lg:text-lg opacity-90">
                    {slide.subtitle}
                  </p>

                  <button
                    onClick={() => navigate(slide.path)}
                    className="md:px-6 px-3 md:py-2 py-1 md:text-base text-sm rounded-md bg-purple-600 hover:bg-purple-800 transition font-medium"
                  >
                    Lets Go
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
