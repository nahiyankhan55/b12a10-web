import { useContext } from "react";
import WebContext from "../../Context/WebContext";

const HomePage = () => {
  const { user } = useContext(WebContext);
  console.log(user);
  return <div>HomePage</div>;
};

export default HomePage;
