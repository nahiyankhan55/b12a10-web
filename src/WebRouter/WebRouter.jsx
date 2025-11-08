import { Navigate, RouterProvider, createBrowserRouter } from "react-router";
import App from "../App";
import ErrorPage from "./ErrorPage";
import HomePage from "../Layouts/HomePage/HomePage";
import AddProductPage from "../Layouts/AddProductPage/AddProductPage";
import ProductsPage from "../Layouts/ProductsPage/ProductsPage";
import ProductDetails from "../Layouts/ProductDetails/ProductDetails";
import MyImports from "../Layouts/MyImports/MyImports";
import MyExports from "../Layouts/MyExports/MyExports";
import LoginPage from "../Layouts/Auth/LoginPage";
import RegisterPage from "../Layouts/Auth/RegisterPage";
import ForgotPasswordPage from "../Layouts/Auth/ForgotPasswordPage";

const WebRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <HomePage></HomePage>,
        },
        // add product
        {
          path: "/add",
          element: <Navigate to={"/add-product"}></Navigate>,
        },
        {
          path: "/add-product",
          element: <AddProductPage></AddProductPage>,
        },
        // all products
        {
          path: "/products",
          element: <ProductsPage></ProductsPage>,
        },
        // details
        {
          path: "/product/:id",
          element: <ProductDetails></ProductDetails>,
        },
        // imports
        {
          path: "/imports",
          element: <Navigate to={"/my-imports"}></Navigate>,
        },
        {
          path: "/my-imports",
          element: <MyImports></MyImports>,
        },
        // exports
        {
          path: "/exports",
          element: <Navigate to={"/my-exports"}></Navigate>,
        },
        {
          path: "/my-exports",
          element: <MyExports></MyExports>,
        },
        // auth
        {
          path: "/login",
          element: <LoginPage></LoginPage>,
        },
        {
          path: "/register",
          element: <RegisterPage></RegisterPage>,
        },
        {
          path: "/forgot",
          element: <ForgotPasswordPage></ForgotPasswordPage>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default WebRouter;
