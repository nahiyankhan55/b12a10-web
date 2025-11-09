import HomeProducts from "./HomeProducts";
import HomeSlider from "./HomeSlider";
import WeWorkWith from "./WeWorkWith";
import WhyChooseUs from "./WhyChooseUs";

const HomePage = () => {
  return (
    <div className="w-full">
      <HomeSlider></HomeSlider>
      <HomeProducts></HomeProducts>
      <WhyChooseUs></WhyChooseUs>
      <WeWorkWith></WeWorkWith>
    </div>
  );
};

export default HomePage;
