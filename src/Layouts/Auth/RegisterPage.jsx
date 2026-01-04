import { HeadProvider, Title } from "react-head";
import { Button, TextField } from "@mui/material";
import { MdOutlineVisibilityOff, MdVisibility } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import WebContext from "../../Context/WebContext";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const AxiosPublic = useAxiosPublic();
  const {
    handleRegisterEmail,
    handleGoogle,
    setUserName,
    setUserImage,
    setUser,
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

    try {
      const userCredential = await handleRegisterEmail(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: image,
      });

      const userInfo = { name, email, image };
      await AxiosPublic.post("/users", userInfo);

      setUser(userCredential.user);
      setUserName(name);
      setUserImage(image);

      toast.success("Registration Successful.", {
        position: "top-right",
        autoClose: 2000,
      });
      target.reset();
      navigate("/");
    } catch (error) {
      toast.error(`Registration Error: ${error.message}`);
    }
  };
  const handleGoogleMethod = async () => {
    try {
      const result = await handleGoogle();
      const user = result.user;

      setUser(user);
      setUserImage(user.photoURL);
      setUserName(user.displayName);

      const exists = users.find((u) => u.email === user.email);
      if (!exists) {
        const userInfo = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };
        await AxiosPublic.post("/users", userInfo);
      }

      toast.success("Registration Successful", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/");
    } catch (error) {
      toast.error(`Google Registration Error: ${error.message}`);
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center sm:gap-5 gap-2 px-5 pt-5 pb-10 ${
        theme === "dark" && "bg-gray-900 text-white"
      }`}
    >
      <HeadProvider>
        <Title>Register || IE Hub</Title>
      </HeadProvider>

      <div className="flex flex-col gap-1 items-center md:mt-8 mt-4">
        <h3 className="md:text-4xl sm:text-3xl text-2xl font-semibold">
          Register
        </h3>
        <p className="text-base font-medium text-purple-500">
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
            label="Name"
            variant="outlined"
            required
          />
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
            variant="outlined"
            required
          />
          <TextField
            name="imageURL"
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
            type="url"
            label="Image URL"
            variant="outlined"
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
              type={showPass ? "text" : "password"}
              label="Password"
              variant="outlined"
              required
            />
            <div
              onClick={() => setShowPass(!showPass)}
              className="absolute top-4 right-3 text-2xl z-40 cursor-pointer"
            >
              {showPass ? <MdVisibility /> : <MdOutlineVisibilityOff />}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-2 rounded-md border-2 text-white! bg-linear-to-tr from-purple-600 to-purple-500"
          >
            Register
          </Button>
        </form>

        <p className="text-xl font-bold text-center">or</p>

        <button
          onClick={handleGoogleMethod}
          className="w-full border-2 border-purple-500 bg-white rounded-md text-xl font-semibold py-2 flex items-center justify-center gap-2 text-black cursor-pointer"
        >
          <FcGoogle className="text-2xl" /> Google
        </button>

        <p className="font-medium text-lg">
          Already have an account?{" "}
          <Link className="text-purple-600 font-bold" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
