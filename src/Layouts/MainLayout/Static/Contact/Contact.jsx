import { HeadProvider, Title } from "react-head";
import { Button, TextField } from "@mui/material";
import { useContext, useRef } from "react";
import { toast } from "react-toastify";
import WebContext from "../../../../Context/WebContext";

const Contact = () => {
  const { theme } = useContext(WebContext);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // clear form
    formRef.current.reset();

    // success toast
    toast.success("Message sent successfully", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col items-center px-5 pt-8 pb-16 ${
        theme === "dark" && "bg-gray-900 text-white"
      }`}
    >
      <HeadProvider>
        <Title>Contact || IE Hub</Title>
      </HeadProvider>

      {/* Header */}
      <div className="flex flex-col gap-2 items-center text-center mb-10">
        <h1 className="text-2xl font-bold">Contact IE Hub</h1>
        <p className="max-w-2xl text-sm md:text-base opacity-80">
          Need help, support, or have a business inquiry? Reach out to IE Hub
          and our team will respond as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">
        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-xl border bg-base-200 space-y-3">
            <h2 className="text-xl font-semibold">Contact Information</h2>

            <div className="text-sm space-y-2">
              <p>
                <span className="font-medium">Support:</span> support@iehub.com
              </p>
              <p>
                <span className="font-medium">HR:</span> hr@iehub.com
              </p>
              <p>
                <span className="font-medium">Location:</span> Dhaka, Bangladesh
              </p>
              <p>
                <span className="font-medium">Hours:</span> Sun – Thu, 10 AM – 6
                PM
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-6 rounded-xl border bg-base-200 space-y-5">
          <h2 className="text-xl font-semibold">Send a Message</h2>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <TextField
              name="name"
              label="Full Name"
              required
              sx={muiStyle(theme)}
            />

            <TextField
              name="email"
              label="Email Address"
              type="email"
              required
              sx={muiStyle(theme)}
            />

            <TextField
              name="subject"
              label="Subject"
              required
              sx={muiStyle(theme)}
            />

            <TextField
              name="message"
              label="Message"
              multiline
              rows={4}
              required
              sx={muiStyle(theme)}
            />

            <Button
              type="submit"
              className="w-full py-2 rounded-md border-2 text-white! bg-linear-to-tr from-purple-600 to-purple-500"
            >
              <p className="text-lg font-semibold py-1">Send Message</p>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const muiStyle = (theme) => ({
  "& .MuiInputBase-input": {
    color: theme === "dark" ? "white" : "black",
  },
  "& .MuiInputLabel-root": {
    color: theme === "dark" ? "#a855f7" : "inherit",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme === "dark" ? "rgba(255,255,255,0.6)" : "inherit",
    },
    "&:hover fieldset": {
      borderColor: "#9333ea",
    },
  },
});

export default Contact;
