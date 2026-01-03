import { useContext } from "react";
import HomeProducts from "./HomeProducts";
import HomeSlider from "./HomeSlider";
import WeWorkWith from "./WeWorkWith";
import WhyChooseUs from "./WhyChooseUs";
import WebContext from "../../Context/WebContext";
import HowItWorks from "./HowItWorks";
import TradeCategories from "./TradeCategories";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";
import Newsletter from "./Newsletter";
import StatsCounter from "./StatsCounter";

const HomePage = () => {
  const { theme } = useContext(WebContext);
  return (
    <div className={`w-full ${theme === "dark" && "bg-gray-900 text-white"}`}>
      <HomeSlider></HomeSlider>
      <StatsCounter></StatsCounter>
      <HomeProducts></HomeProducts>
      <TradeCategories></TradeCategories>
      <WhyChooseUs></WhyChooseUs>
      <WeWorkWith></WeWorkWith>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <FAQSection></FAQSection>
      <Newsletter></Newsletter>
    </div>
  );
};

export default HomePage;
