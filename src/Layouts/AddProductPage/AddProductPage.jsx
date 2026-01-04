import {
  Button,
  TextField,
  MenuItem,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import WebContext from "../../Context/WebContext";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";

const AddProductPage = () => {
  const AxiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const { user, theme } = useContext(WebContext);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      toast.error("You must be logged in to add a product");
      return;
    }

    setLoading(true);
    const form = e.target;

    // Data structure updated for rich UI
    const productData = {
      name: form.name.value,
      description: form.description.value,
      category: form.category.value,
      price: Number(form.price.value),
      quantity: Number(form.quantity.value),
      moq: Number(form.moq.value), // Minimum Order Quantity
      origin: form.origin.value,
      rating: Number(form.rating.value) || 0,
      // Multiple images support (comma separated input converts to array)
      images: form.images.value.split(",").map((img) => img.trim()),
      paymentOption: form.paymentOption.value,
      status: "Available",
      createdAt: new Date(),
      createdBy: user.email,
    };

    try {
      const res = await AxiosPublic.post("/products", productData);
      if (res.data.insertedId) {
        toast.success(`Product posted for global trade!`);
        form.reset();
      }
    } catch (err) {
      toast.error(`Posting error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        minHeight: "100vh",
        bgcolor: theme === "dark" ? "grey.900" : "#f5f3ff",
        color: theme === "dark" ? "white" : "text.primary",
      }}
    >
      <HeadProvider>
        <Title>Add Export || IE Hub</Title>
      </HeadProvider>

      <Typography
        variant="h4"
        align="center"
        className="lg:text-4xl! md:text-3xl! sm:text-2xl! text-xl!"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 4 }}
      >
        List New Export Item
      </Typography>

      <Paper
        elevation={4}
        sx={{
          maxWidth: 800,
          mx: "auto",
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          bgcolor: theme === "dark" ? "grey.800" : "white",
          color: theme === "dark" ? "white" : "inherit",
        }}
      >
        <form onSubmit={handleAdd}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Basic Info Row */}
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
                required
                fullWidth
                InputLabelProps={{
                  style: { color: theme === "dark" ? "#ccc" : "" },
                }}
                sx={{ input: { color: theme === "dark" ? "white" : "" } }}
              />
              <TextField
                name="category"
                label="Trade Category"
                select
                defaultValue="Electronics"
                required
                fullWidth
                InputLabelProps={{
                  style: { color: theme === "dark" ? "#ccc" : "" },
                }}
                sx={{
                  "& .MuiSelect-select": {
                    color: theme === "dark" ? "white" : "",
                  },
                }}
              >
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Garments">Garments</MenuItem>
                <MenuItem value="Agriculture">Agriculture</MenuItem>
                <MenuItem value="Machinery">Machinery</MenuItem>
              </TextField>
            </Box>

            {/* Description */}
            <TextField
              name="description"
              label="Detailed Description"
              multiline
              rows={3}
              required
              fullWidth
              InputLabelProps={{
                style: { color: theme === "dark" ? "#ccc" : "" },
              }}
              sx={{ textarea: { color: theme === "dark" ? "white" : "" } }}
            />

            {/* Images Array Input */}
            <TextField
              name="images"
              label="Image URLs (Separated by comma ',')"
              placeholder="url1, url2, url3"
              required
              fullWidth
              helperText="Tip: Provide at least 3 URLs for a better carousel view"
              InputLabelProps={{
                style: { color: theme === "dark" ? "#ccc" : "" },
              }}
              sx={{
                input: { color: theme === "dark" ? "white" : "" },
                "& .MuiFormHelperText-root": { color: "primary.main" },
              }}
            />

            {/* Pricing and Logistics Row */}
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
                required
                fullWidth
                InputLabelProps={{
                  style: { color: theme === "dark" ? "#ccc" : "" },
                }}
                sx={{ input: { color: theme === "dark" ? "white" : "" } }}
              />
              <TextField
                name="moq"
                label="Minimum Order (MOQ)"
                type="number"
                required
                fullWidth
                InputLabelProps={{
                  style: { color: theme === "dark" ? "#ccc" : "" },
                }}
                sx={{ input: { color: theme === "dark" ? "white" : "" } }}
              />
            </Box>

            {/* Origin and Quantity Row */}
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
                required
                fullWidth
                InputLabelProps={{
                  style: { color: theme === "dark" ? "#ccc" : "" },
                }}
                sx={{ input: { color: theme === "dark" ? "white" : "" } }}
              />
              <TextField
                name="quantity"
                label="Stock Quantity"
                type="number"
                required
                fullWidth
                InputLabelProps={{
                  style: { color: theme === "dark" ? "#ccc" : "" },
                }}
                sx={{ input: { color: theme === "dark" ? "white" : "" } }}
              />
            </Box>

            {/* Ratings and Payment Row */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <TextField
                name="rating"
                label="Rating (1-5)"
                type="number"
                inputProps={{ min: 1, max: 5, step: 0.1 }}
                fullWidth
                InputLabelProps={{
                  style: { color: theme === "dark" ? "#ccc" : "" },
                }}
                sx={{ input: { color: theme === "dark" ? "white" : "" } }}
              />
              <TextField
                name="paymentOption"
                label="Payment Method"
                select
                defaultValue="Letter of Credit"
                required
                fullWidth
                InputLabelProps={{
                  style: { color: theme === "dark" ? "#ccc" : "" },
                }}
                sx={{
                  "& .MuiSelect-select": {
                    color: theme === "dark" ? "white" : "",
                  },
                }}
              >
                <MenuItem value="Letter of Credit">
                  Letter of Credit (L/C)
                </MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer (T/T)</MenuItem>
                <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem>
              </TextField>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1.1rem",
                bgcolor: "secondary.main",
                "&:hover": { bgcolor: "secondary.dark" },
              }}
            >
              {loading ? "Processing..." : "Publish Export Product"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProductPage;
