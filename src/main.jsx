import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WebRouter from "./WebRouter/WebRouter.jsx";
import WebContextProvider from "./Context/WebContextProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WebContextProvider>
      <WebRouter></WebRouter>
      <ToastContainer></ToastContainer>
    </WebContextProvider>
  </StrictMode>
);
