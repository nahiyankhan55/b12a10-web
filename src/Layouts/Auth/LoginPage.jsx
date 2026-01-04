import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { HeadProvider, Title } from "react-head";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { useQuery } from "@tanstack/react-query";
import WebContext from "../../Context/WebContext";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const AxiosPublic = useAxiosPublic();
  const {
    handleLoginEmail,
    handleGoogle,
    setUser,
    setUserName,
    setUserImage,
    theme,
  } = useContext(WebContext);
  const navigate = useNavigate();

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/users");
      return res.data;
    },
  });

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
      const user = result.user;

      setUser(user);

      const userInfo = {
        name: user.displayName,
        email: user.email,
      };

      await AxiosPublic.post("/users", userInfo);

      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div
      className={theme === "dark" ? "w-full bg-gray-900 text-white" : "w-full"}
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
            <TextField
              name="email"
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  color: theme === "dark" ? "white" : "black",
                },
                "& .MuiInputLabel-root": {
                  color: theme === "dark" ? "#a855f7" : "inherit",
                },
                "& .MuiOutlinedInput-root fieldset": {
                  borderColor:
                    theme === "dark" ? "rgba(255,255,255,0.6)" : "inherit",
                },
              }}
              type="email"
              label="Email"
              required
            />

            <div className="w-full relative">
              <TextField
                name="password"
                fullWidth
                sx={{
                  "& .MuiInputBase-input": {
                    color: theme === "dark" ? "white" : "black",
                  },
                  "& .MuiInputLabel-root": {
                    color: theme === "dark" ? "#a855f7" : "inherit",
                  },
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor:
                      theme === "dark" ? "rgba(255,255,255,0.6)" : "inherit",
                  },
                }}
                type={showPassword ? "text" : "password"}
                label="Password"
                required
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-4 right-3 text-2xl z-40 cursor-pointer"
              >
                {showPassword ? (
                  <MdOutlineVisibility />
                ) : (
                  <MdOutlineVisibilityOff />
                )}
              </div>
            </div>

            <Button
              type="submit"
              sx={{ textTransform: "none" }}
              className="transition-all duration-300 hover:shadow-md rounded-md text-white! bg-linear-to-tr! w-full py-2 from-emerald-700 to-fuchsia-700 hover:to-purple-600"
            >
              <p className="text-lg font-semibold py-1">Login</p>
            </Button>
          </form>

          <p className="text-xl font-bold text-center">or</p>

          <button
            onClick={handleGoogleMethod}
            className="w-full border-2 border-purple-500 bg-white rounded-md text-xl font-semibold transition hover:shadow-md hover:scale-105 py-2 flex items-center justify-center gap-2 text-black cursor-pointer"
          >
            <FcGoogle className="text-2xl" /> Google
          </button>

          <div className="flex flex-col gap-2 mt-2">
            <p className="font-medium text-lg">
              New User?{" "}
              <Link className="text-purple-600 font-bold" to="/register">
                Register
              </Link>
            </p>
            <Link className="text-orange-600 font-bold text-lg" to="/forgot">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
