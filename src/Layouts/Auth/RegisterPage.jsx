import { HeadProvider, Title } from "react-head";
import { Button, TextField } from "@mui/material";
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import WebContext from "../../Context/WebContext";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    handleRegisterEmail,
    handleGoogle,
    setUserName,
    setUserImage,
    setUser,
  } = useContext(WebContext);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const target = e.target;
    const name = target.name.value;
    const email = target.email.value;
    let image = target.imageURL?.value?.trim();
    const password = target.password.value;

    if (!validatePassword(password)) {
      toast.info(
        "Password must be at least 6 characters, include a number, uppercase, lowercase & special char.",
        { position: "top-right", autoClose: 3000 }
      );
      return;
    }

    handleRegisterEmail(email, password)
      .then(async (userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: image,
        });
        setUser(userCredential.user);
        setUserName(name);
        setUserImage(image);

        toast.success("Registration Successful.", {
          position: "top-right",
          autoClose: 2000,
        });
        target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(`Registration Error: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  const handleGoogleMethod = async () => {
    try {
      const result = await handleGoogle();
      setUser(result.user);
      setUserImage(result.user.photoURL);
      setUserName(result.user.displayName);

      toast.success("Registration Successful", {
        position: "top-right",
        autoClose: 2000,
      });

      navigate("/");
    } catch (error) {
      toast.error(`Google Registration Error: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center sm:gap-5 gap-2 px-5 pt-5 pb-10">
      <HeadProvider>
        <Title>Register || IE Hub</Title>
      </HeadProvider>

      <div className="flex flex-col gap-1 items-center md:mt-8 mt-4">
        <h3 className="md:text-4xl sm:text-3xl text-2xl font-semibold">
          Register
        </h3>
        <p className="text-base font-medium text-sky-500">
          Join us to import/export products globally.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:w-2/5 md:w-8/12 sm:w-10/12">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-4 mt-4 w-full"
        >
          <TextField
            name="name"
            className="w-full"
            type="text"
            label="Name"
            variant="outlined"
            autoComplete="name"
            required
          />
          <TextField
            name="email"
            className="w-full"
            type="email"
            label="Email"
            variant="outlined"
            autoComplete="email"
            required
          />

          <TextField
            name="imageURL"
            className="w-full"
            type="url"
            label="Please Add a Direct Image URL"
            variant="outlined"
            autoComplete="imageURL"
            required
          />

          <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
            <div className="w-full relative">
              <TextField
                name="password"
                className="w-full"
                type={showPass ? "text" : "password"}
                label="Password"
                variant="outlined"
                autoComplete="current-password"
                required
              />
              {!showPass ? (
                <MdOutlineVisibilityOff
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-4 right-3 text-2xl z-40 cursor-pointer"
                />
              ) : (
                <MdVisibility
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-4 right-3 text-2xl z-40 cursor-pointer"
                />
              )}
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <Button
              type="submit"
              className="w-full md:w-2/3 mx-auto py-2 rounded-md border-2 text-white! shadow-gray-400/90 bg-linear-to-tr from-purple-600 to-green-500 transition-all duration-300 hover:to-sky-600 hover:shadow-md"
            >
              <p className="text-lg font-semibold py-1">Register</p>
            </Button>
          </div>
        </form>

        <p className="text-xl font-bold text-center">or</p>

        <button
          onClick={handleGoogleMethod}
          className="w-full md:w-1/2 mx-auto border-2 border-cyan-500 bg-white rounded-md text-xl font-semibold transition hover:shadow-md hover:scale-105 shadow-gray-400/90 hover:border-cyan-600 py-2 flex items-center justify-center gap-2 text-black cursor-pointer"
        >
          <FcGoogle className="text-2xl"></FcGoogle>
          Google
        </button>

        <p className="font-medium text-lg flex items-center gap-1">
          Already have an account?
          <Link
            className="hover:text-sky-600 text-emerald-700 duration-300 font-bold"
            to={"/login"}
          >
            Login
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
  );
};

export default RegisterPage;
