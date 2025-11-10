import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import WebContext from "../../Context/WebContext";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const AxiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const { user, theme } = useContext(WebContext);

  // form functionality
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      toast.error("You must be logged in to add a product", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);

    const productData = {
      name: e.target.name.value,
      image: e.target.image.value,
      price: e.target.price.value,
      origin: e.target.origin.value,
      rating: e.target.rating.value,
      quantity: e.target.quantity.value,
      createdAt: new Date(),
      createdBy: user.email,
    };

    console.log(productData);

    try {
      const res = await AxiosPublic.post("/products", productData);
      console.log(res.data);
      toast.success(`Product added successfully`, {
        position: "top-right",
        autoClose: 2000,
      });
      e.target.reset();
    } catch (err) {
      toast.error(`Product posting error: ${err.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`py-10 px-5 w-full  ${
        theme === "dark"
          ? "bg-gray-600 text-white"
          : "bg-linear-to-br from-purple-300 via-white to-sky-300"
      }`}
    >
      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold text-center mb-8">
        Add New Product
      </h1>

      <form
        onSubmit={handleAdd}
        className="flex flex-col gap-5 max-w-3xl mx-auto w-full p-5 rounded-xl bg-white shadow-lg gradient-border"
      >
        <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
          <TextField
            name="name"
            label="Product Name"
            required
            fullWidth
            className="bg-white shadow-md"
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            required
            fullWidth
            className="bg-white shadow-md"
          />
        </div>
        <TextField
          name="image"
          label="Product Image URL"
          required
          fullWidth
          className="bg-white shadow-md"
        />
        <div className="flex md:flex-nowrap flex-wrap items-center gap-4">
          <TextField
            name="origin"
            label="Origin Country"
            required
            fullWidth
            className="bg-white shadow-md"
          />
          <TextField
            name="rating"
            label="Rating"
            type="number"
            required
            fullWidth
            className="bg-white shadow-md"
          />
        </div>
        <TextField
          name="quantity"
          label="Available Quantity"
          type="number"
          required
          fullWidth
          className="bg-white shadow-md"
        />

        <Button
          type="submit"
          variant="contained"
          className="font-semibold!"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
};

export default AddProductPage;
