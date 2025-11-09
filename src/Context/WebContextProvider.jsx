import { useState } from "react";
import WebContext from "./WebContext";
import PropTypes from "prop-types";

const WebContextProvider = ({ children }) => {
  // User Info
  const [user, setUser] = useState("Nahiyan");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const contextNames = {
    user,
    setUser,
    userName,
    setUserName,
    userImage,
    setUserImage,
  };

  return (
    <WebContext.Provider value={contextNames}>{children}</WebContext.Provider>
  );
};

export default WebContextProvider;

WebContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
