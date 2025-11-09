import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// images
import slider1 from "./../../assets/slide1.jpg";
import slider2 from "./../../assets/slide2.jpg";
import slider3 from "./../../assets/slide3.png";

const HomeSlider = () => {
  return (
    <Swiper
      className="w-full shadow-lg shadow-gray-400"
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      <SwiperSlide>
        <img
          className="mx-auto w-full lg:max-h-[500px] md:max-h-[450px] sm:max-h-[400px] max-h-[300px]"
          src={slider1}
          alt="slider-image"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="mx-auto w-full lg:max-h-[500px] md:max-h-[450px] sm:max-h-[400px] max-h-[300px]"
          src={slider2}
          alt="slider-image"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="mx-auto w-full lg:max-h-[500px] md:max-h-[450px] sm:max-h-[400px] max-h-[300px]"
          src={slider3}
          alt="slider-image"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeSlider;
