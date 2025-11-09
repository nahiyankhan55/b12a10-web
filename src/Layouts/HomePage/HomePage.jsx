import HomeProducts from "./HomeProducts";
import HomeSlider from "./HomeSlider";
import WhyChooseUs from "./WhyChooseUs";

const HomePage = () => {
  return (
    <div className="w-full">
      <HomeSlider></HomeSlider>
      <HomeProducts></HomeProducts>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default HomePage;
