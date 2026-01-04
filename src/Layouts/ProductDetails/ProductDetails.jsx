import {
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Rating,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useParams } from "react-router";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import DataLoader from "../../Components/DataLoader";
import WebContext from "../../Context/WebContext";
import { HeadProvider, Title } from "react-head";
import { toast } from "react-toastify";
import { MdClose, MdLocationOn, MdPayment, MdInventory } from "react-icons/md";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ProductDetails = () => {
  const { id } = useParams();
  const AxiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [qty, setQty] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/products/${id}`);
      return res.data.data;
    },
  });

  if (isLoading) return <DataLoader />;
  if (!product)
    return (
      <Typography align="center" sx={{ py: 10 }}>
        Product Not Found!
      </Typography>
    );

  // Logic for MOQ and Stock validation
  const minQty = product.moq || 1;
  const maxQty = product.quantity;
  const isDisabled = Number(qty) < minQty || Number(qty) > maxQty;

  const handleImport = async () => {
    if (isDisabled || !user) return;

    try {
      const res = await AxiosPublic.post("/products/import", {
        productId: product._id,
        quantity: Number(qty),
        importer: user.email,
      });

      if (res.data.success) {
        toast.success("Import request submitted successfully!");
        setOpenModal(false);
        setQty("");
        refetch();
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        bgcolor: theme === "dark" ? "grey.900" : "#fafafa",
        color: theme === "dark" ? "white" : "text.primary",
        minHeight: "100vh",
      }}
    >
      <HeadProvider>
        <Title>{product.name} || IE Hub</Title>
      </HeadProvider>

      <Paper
        elevation={3}
        sx={{
          maxWidth: "1100px",
          mx: "auto",
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          bgcolor: theme === "dark" ? "grey.800" : "white",
          color: "inherit",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 5,
          }}
        >
          {/* Left Side: Swiper Slider */}
          <Box sx={{ width: { xs: "110%", md: "50%" }, ml: { xs: -2, md: 0 } }}>
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-xl overflow-hidden shadow-lg"
              style={{ height: "400px" }}
            >
              {product.images?.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnail Slider */}
            <Box sx={{ mt: 2 }}>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs-swiper"
              >
                {product.images?.map((img, i) => (
                  <SwiperSlide key={i} className="cursor-pointer">
                    <img
                      src={img}
                      alt="thumb"
                      className="h-20 w-full object-cover rounded-md border-2 border-transparent hover:border-purple-500"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>

          {/* Right Side: Product Info */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box>
              <Chip
                label={product.category}
                color="secondary"
                size="small"
                sx={{ mb: 1 }}
              />
              <Typography variant="h4" fontWeight="bold">
                {product.name}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
              >
                <Rating
                  value={product.rating}
                  precision={0.1}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  ({product.rating} Rating)
                </Typography>
              </Box>
            </Box>

            <Typography variant="h5" color="primary.main" fontWeight="bold">
              ${product.price}{" "}
              <small style={{ fontSize: "14px", color: "gray" }}>/ Unit</small>
            </Typography>

            <Divider />

            <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                my: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MdLocationOn className="text-purple-500" size={20} />
                <Typography variant="body2">
                  <strong>Origin:</strong> {product.origin}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MdInventory className="text-purple-500" size={20} />
                <Typography variant="body2">
                  <strong>Stock:</strong> {product.quantity}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MdPayment className="text-purple-500" size={20} />
                <Typography variant="body2">
                  <strong>Payment:</strong> {product.paymentOption}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2">
                  <strong>Min Order (MOQ):</strong> {product.moq} Units
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box sx={{ mt: "auto", pt: 2 }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => setOpenModal(true)}
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  borderRadius: 2,
                  bgcolor: "secondary.main",
                  "&:hover": { bgcolor: "secondary.dark" },
                }}
              >
                Request Import Now
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* --- Import Modal (MUI Style) --- */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Import Request
          <IconButton onClick={() => setOpenModal(false)}>
            <MdClose />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pb: 4 }}>
          <Typography variant="body2" gutterBottom>
            Manufacturer Stock: <strong>{product.quantity}</strong> | MOQ:{" "}
            <strong>{product.moq}</strong>
          </Typography>
          <TextField
            fullWidth
            type="number"
            label="Order Quantity"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            sx={{ mt: 2 }}
            error={
              Number(qty) > product.quantity ||
              (qty !== "" && Number(qty) < product.moq)
            }
            helperText={
              Number(qty) > product.quantity
                ? "Exceeds stock limit"
                : Number(qty) < product.moq && qty !== ""
                ? `Minimum order is ${product.moq}`
                : ""
            }
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.2 }}
            disabled={isDisabled}
            onClick={handleImport}
          >
            Confirm Order
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductDetails;
