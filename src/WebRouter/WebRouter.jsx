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
import ProfilePage from "../Layouts/ProfilePage/ProfilePage";
import IsLoginUser from "./IsLoginUser";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import DashboardHome from "../Layouts/Dashboard/DashboardHome/DashboardHome";
import About from "../Layouts/MainLayout/Static/About/About";
import Career from "../Layouts/MainLayout/Static/Career/Career";
import Contact from "../Layouts/MainLayout/Static/Contact/Contact";
import Policy from "../Layouts/MainLayout/Static/Policy/Policy";
import Terms from "../Layouts/MainLayout/Static/Terms/Terms";

const WebRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: "/",
          element: <MainLayout></MainLayout>,
          children: [
            {
              path: "/",
              element: <HomePage></HomePage>,
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

            // website
            {
              path: "/about",
              element: <About></About>,
            },
            {
              path: "/career",
              element: <Career></Career>,
            },
            {
              path: "/contact",
              element: <Contact></Contact>,
            },
            {
              path: "/privacy-policy",
              element: <Policy></Policy>,
            },
            {
              path: "/terms-conditions",
              element: <Terms></Terms>,
            },
          ],
        },
        {
          path: "/dashboard",
          element: <Dashboard></Dashboard>,
          children: [
            {
              path: "/dashboard",
              element: <Navigate to={"/dashboard/home"}></Navigate>,
            },
            {
              path: "/dashboard/home",
              element: <DashboardHome></DashboardHome>,
            },
            // add product
            {
              path: "/dashboard/add",
              element: <Navigate to={"/dashboard/add-product"}></Navigate>,
            },
            {
              path: "/dashboard/add-product",
              element: <AddProductPage></AddProductPage>,
            },
            // imports
            {
              path: "/dashboard/imports",
              element: <Navigate to={"/dashboard/my-imports"}></Navigate>,
            },
            {
              path: "/dashboard/my-imports",
              element: <MyImports></MyImports>,
            },
            // exports
            {
              path: "/dashboard/exports",
              element: <Navigate to={"/dashboard/my-exports"}></Navigate>,
            },
            {
              path: "/dashboard/my-exports",
              element: <MyExports></MyExports>,
            },
            // profile page
            {
              path: "/dashboard/profile",
              element: <ProfilePage></ProfilePage>,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default WebRouter;
