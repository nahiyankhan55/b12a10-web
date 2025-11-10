import { Rating } from "@mui/material";
import { useParams } from "react-router";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../../Components/DataLoader";
import WebContext from "../../Context/WebContext";
import { HeadProvider, Title } from "react-head";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(WebContext);

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
  console.log(product);

  if (isLoading) return <DataLoader></DataLoader>;

  // Disable logic
  const isDisabled = Number(qty) <= 0 || Number(qty) > product.quantity;

  // Simple function for import
  const handleImport = async () => {
    if (isDisabled) return;
    if (!user) return;

    try {
      const res = await AxiosPublic.post("/products/import", {
        productId: product._id,
        quantity: Number(qty),
        importer: user.email,
      });

      if (res.data.success) {
        toast.success("Product imported successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        setOpenModal(false);
        setQty("");
        refetch();
      } else {
        toast.error("Failed to import", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(`Photo update failed: ${err.message}`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <HeadProvider>
        <Title>Product || IE Hub</Title>
      </HeadProvider>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:h-96 sm:h-80 h-48 object-cover rounded-lg shadow-md shadow-gray-400"
        />

        <div>
          <h1 className="md:text-3xl text-2xl font-bold">{product.name}</h1>

          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="mt-4 space-y-1">
            <p className="text-lg font-semibold">Price: ${product.price}</p>
            <p className="text-lg">Origin: {product.origin}</p>

            <p className="text-lg">
              Available:
              <span
                className={`ml-2 font-bold ${
                  product.quantity > 10
                    ? "text-green-600"
                    : product.quantity > 0
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {product.quantity}
              </span>
            </p>

            <Rating value={product.rating} precision={0.1} readOnly />
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="mt-5 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
          >
            Import Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-3">Import Product</h2>

            <p className="text-gray-700">Available: {product.quantity} units</p>

            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Enter quantity"
              className="w-full border p-2 rounded mt-3"
            />

            {Number(qty) > product.quantity && (
              <p className="text-red-600 text-sm mt-1">
                Quantity cannot exceed available stock
              </p>
            )}

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleImport}
                disabled={isDisabled}
                className={`px-5 py-2 rounded text-white ${
                  isDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
