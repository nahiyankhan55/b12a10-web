import { useContext, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import WebContext from "../../Context/WebContext";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";
import DataLoader from "../../Components/DataLoader";
import {
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { MdClose } from "react-icons/md";

const MyExports = () => {
  const AxiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: exportsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myExports", user?.email, search],
    queryFn: async () => {
      if (!user) return [];
      const res = await AxiosPublic.get(
        `/exports?user=${user.email}&search=${search}`
      );
      return res.data.data;
    },
    enabled: !!user,
  });

  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await AxiosPublic.delete(`/products/${productId}`);
        if (res.data.success) {
          toast.success("Product deleted");
          refetch();
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleOpenUpdate = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      description: form.description.value,
      category: form.category.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      moq: Number(form.moq.value),
      origin: form.origin.value,
      rating: Number(form.rating.value),
      images: form.images.value.split(",").map((img) => img.trim()),
      paymentOption: form.paymentOption.value,
    };

    try {
      const res = await AxiosPublic.put(
        `/products/${selectedProduct._id}`,
        updatedData
      );
      if (res.data.success) {
        toast.success("Product updated successfully!");
        setModalOpen(false);
        refetch();
      }
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };

  return (
    <div
      className={`w-full min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 py-10">
        <HeadProvider>
          <Title>My Exports || IE Hub</Title>
        </HeadProvider>

        <h1 className="md:text-4xl text-2xl font-bold text-center">
          My Export Management
        </h1>

        {/* Search Box */}
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search your products..."
            className="border px-4 py-2 rounded-lg w-full max-w-md shadow-sm text-black"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
            {exportsData.map((product) => (
              <div
                key={product._id}
                className={`border rounded-xl overflow-hidden shadow-md transition-all ${
                  theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
                }`}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h2 className="text-xl font-bold truncate">{product.name}</h2>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-purple-500">
                      ${product.price}
                    </span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-sm opacity-80">
                    Stock: {product.quantity} | MOQ: {product.moq}
                  </p>
                  <Rating
                    value={product.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => handleOpenUpdate(product)}
                      className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- MUI Update Modal --- */}
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              bgcolor: theme === "dark" ? "#1f2937" : "#fff",
              color: theme === "dark" ? "#fff" : "inherit",
            },
          }}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Update Export Product
            <IconButton
              onClick={() => setModalOpen(false)}
              sx={{ color: theme === "dark" ? "#fff" : "#000" }}
            >
              <MdClose />
            </IconButton>
          </DialogTitle>

          <DialogContent
            dividers
            sx={{ borderColor: theme === "dark" ? "#374151" : "#e5e7eb" }}
          >
            {selectedProduct && (
              <Box
                component="form"
                onSubmit={handleUpdateSubmit}
                sx={{
                  mt: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <TextField
                    name="name"
                    label="Product Title"
                    defaultValue={selectedProduct.name}
                    fullWidth
                    required
                  />
                  <TextField
                    name="category"
                    label="Category"
                    select
                    defaultValue={selectedProduct.category}
                    fullWidth
                    required
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Garments">Garments</MenuItem>
                    <MenuItem value="Agriculture">Agriculture</MenuItem>
                    <MenuItem value="Machinery">Machinery</MenuItem>
                  </TextField>
                </Box>

                <TextField
                  name="description"
                  label="Description"
                  multiline
                  rows={2}
                  defaultValue={selectedProduct.description}
                  fullWidth
                  required
                />

                <TextField
                  name="images"
                  label="Image URLs (Comma separated)"
                  defaultValue={selectedProduct.images?.join(", ")}
                  fullWidth
                  required
                />

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <TextField
                    name="price"
                    label="Price (USD)"
                    type="number"
                    defaultValue={selectedProduct.price}
                    fullWidth
                    required
                  />
                  <TextField
                    name="moq"
                    label="MOQ"
                    type="number"
                    defaultValue={selectedProduct.moq}
                    fullWidth
                    required
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <TextField
                    name="origin"
                    label="Origin Country"
                    defaultValue={selectedProduct.origin}
                    fullWidth
                    required
                  />
                  <TextField
                    name="quantity"
                    label="Quantity"
                    type="number"
                    defaultValue={selectedProduct.quantity}
                    fullWidth
                    required
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <TextField
                    name="rating"
                    label="Rating"
                    type="number"
                    inputProps={{ step: 0.1, min: 0, max: 5 }}
                    defaultValue={selectedProduct.rating}
                    fullWidth
                  />
                  <TextField
                    name="paymentOption"
                    label="Payment"
                    select
                    defaultValue={selectedProduct.paymentOption}
                    fullWidth
                    required
                  >
                    <MenuItem value="Letter of Credit">
                      Letter of Credit (L/C)
                    </MenuItem>
                    <MenuItem value="Bank Transfer">
                      Bank Transfer (T/T)
                    </MenuItem>
                    <MenuItem value="Cash on Delivery">
                      Cash on Delivery
                    </MenuItem>
                  </TextField>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  sx={{ fontWeight: "bold", py: 1.5 }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </DialogContent>
        </Dialog>

        {exportsData.length === 0 && !isLoading && (
          <p className="text-center mt-20 text-xl text-orange-400">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyExports;
