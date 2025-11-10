import { useContext } from "react";
import HomeProducts from "./HomeProducts";
import HomeSlider from "./HomeSlider";
import WeWorkWith from "./WeWorkWith";
import WhyChooseUs from "./WhyChooseUs";
import WebContext from "../../Context/WebContext";

const HomePage = () => {
  const { theme } = useContext(WebContext);
  return (
    <div className={`w-full ${theme === "dark" && "bg-gray-600 text-white"}`}>
      <HomeSlider></HomeSlider>
      <HomeProducts></HomeProducts>
      <WhyChooseUs></WhyChooseUs>
      <WeWorkWith></WeWorkWith>
    </div>
  );
};

export default HomePage;
