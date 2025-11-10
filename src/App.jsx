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
      className={`max-w-[1440px] mx-auto w-full h-screen flex flex-col items-center ${
        theme === "dark" && "bg-gray-600 text-white"
      }`}
    >
      <Navbar></Navbar>
      <div className="py-10 w-full"></div>
      <div className="flex-1 w-full">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
