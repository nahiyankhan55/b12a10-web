import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Aos from "aos";
import { useContext, useEffect } from "react";
import "aos/dist/aos.css";
import WebContext from "./Context/WebContext";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  const { theme } = useContext(WebContext);
  return (
    <div
      className={`max-w-[1440px] mx-auto w-full flex flex-col items-center ${
        theme === "dark" && "bg-gray-900 text-white!"
      }`}
    >
      <div className="w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
