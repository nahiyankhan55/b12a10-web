import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { HeadProvider, Title } from "react-head";
import WebContext from "../../Context/WebContext";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleLoginEmail,
    handleGoogle,
    setUser,
    setUserName,
    setUserImage,
    theme,
  } = useContext(WebContext);
  const navigate = useNavigate();

  // form submit functionality
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;

    const email = target.email.value;
    const password = target.password.value;

    handleLoginEmail(email, password)
      .then(async (userCredential) => {
        setUser(userCredential.user);
        setUserName(userCredential.user.displayName);
        setUserImage(userCredential.user.photoURL);
        console.log("userCredential:>", userCredential);
        toast.success("Login Successful.", {
          position: "top-center",
          autoClose: 2000,
        });
        target.reset();
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Login Error: ${error.message}`, {
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  // google registration
  const handleGoogleMethod = async () => {
    try {
      const result = await handleGoogle();
      setUser(result.user);
      setUserImage(result.user.photoURL);
      setUserName(result.user.displayName);
      toast.success(`Login Successful`, {
        position: "top-center",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      toast.error(`Google Registration Error: ${error.message}`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div
      className={theme === "dark" ? "w-full bg-gray-600 text-white" : "w-full"}
    >
      <div className="w-full flex flex-col items-center sm:gap-5 gap-2 px-5 pt-5 pb-10">
        <HeadProvider>
          <Title>Login || IE Hub</Title>
        </HeadProvider>
        <div className="flex flex-col gap-1 items-center md:mt-8 mt-4">
          <h3 className="md:text-4xl sm:text-3xl text-2xl font-semibold">
            Login
          </h3>
          <p className="text-base font-medium text-emerald-500">
            Login to access your product details.
          </p>
        </div>

        <div className="flex flex-col gap-4 lg:w-2/5 md:w-6/12 sm:w-8/12 w-full">
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col justify-center gap-4 mt-4 w-full"
          >
            <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
              <TextField
                name="email"
                className="w-full"
                type="email"
                label="Email"
                variant="outlined"
                autoComplete="username"
                required
              ></TextField>
            </div>

            <div className="w-full relative">
              <TextField
                name="password"
                className="w-full"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="outlined"
                autoComplete="current-password"
                required
              />
              {!showPassword ? (
                <MdOutlineVisibilityOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-4 right-3 text-2xl z-40 cursor-pointer"
                ></MdOutlineVisibilityOff>
              ) : (
                <MdOutlineVisibility
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-4 right-3 text-2xl z-40 cursor-pointer"
                ></MdOutlineVisibility>
              )}
            </div>

            <div className="w-full flex flex-col items-center">
              <Button
                type="submit"
                className="transition-all duration-300 hover:shadow-md rounded-md border-2 text-white! shadow-gray-400/90 bg-linear-to-tr! w-full mx-auto py-2 from-emerald-700 to-fuchsia-700 hover:to-sky-600"
              >
                <p className="text-lg font-semibold py-1">Login</p>
              </Button>
            </div>
          </form>

          <p className="text-xl font-bold text-center">or</p>
          <button
            onClick={handleGoogleMethod}
            className="w-full mx-auto border-2 border-sky-500 bg-white rounded-md text-xl font-semibold transition hover:shadow-md hover:scale-105 shadow-gray-400/90 hover:bg-sky-200 hover:border-sky-600 py-2 flex items-center justify-center gap-2 text-black cursor-pointer"
          >
            <FcGoogle className="text-2xl"></FcGoogle>
            Google
          </button>
          <p className="font-medium text-lg flex items-center gap-1">
            New User?
            <Link
              className="text-cyan-600 hover:text-teal-700 duration-300 font-bold"
              to={"/register"}
            >
              Register
            </Link>
          </p>
          <Link
            className="text-orange-600 hover:text-green-800 duration-300 font-bold text-lg"
            to={"/forgot"}
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
