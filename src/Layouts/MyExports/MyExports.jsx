import { useContext, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import WebContext from "../../Context/WebContext";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";
import DataLoader from "../../Components/DataLoader";
import { Rating } from "@mui/material";

const MyExports = () => {
  const AxiosPublic = useAxiosPublic();
  const { user, theme } = useContext(WebContext);
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState(null); // product being edited
  const [updateFields, setUpdateFields] = useState({}); // updated values

  // Fetch user's exported products
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
    retry: 2,
    retryDelay: 1000,
  });

  // Delete product
  const handleDelete = async (productId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await AxiosPublic.delete(`/products/${productId}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          refetch();
        } else {
          Swal.fire("Error!", "Failed to delete product.", "error");
        }
      } catch (err) {
        Swal.fire("Error!", "Error deleting product: " + err.message, "error");
      }
    }
  };

  // Open update modal
  const handleOpenUpdate = (product) => {
    setModalData(product);
    setUpdateFields({
      name: product.name,
      price: product.price,
      origin: product.origin,
      rating: product.rating,
      image: product.image,
      quantity: product.quantity,
    });
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await AxiosPublic.put(
        `/products/${modalData._id}`,
        updateFields
      );
      if (res.data.success) {
        toast.success("Product updated successfully!");
        setModalData(null);
        refetch();
      } else {
        toast.error("Failed to update product");
      }
    } catch (err) {
      toast.error("Error updating product: " + err.message);
    }
  };

  return (
    <div className={theme === "dark" ? "w-full bg-gray-600" : "w-full"}>
      <div className={`max-w-7xl mx-auto px-5 py-10`}>
        <HeadProvider>
          <Title>My Exports || IE Hub</Title>
        </HeadProvider>

        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold text-center">
          My Exports
        </h1>
        <p
          className={`${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }  text-center font-medium max-w-2xl mx-auto mt-2`}
        >
          View all products you have added. You can delete or update each
          product.
        </p>

        {/* Search Box */}
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search exported products..."
            className="border px-4 py-2 rounded-lg w-full max-w-md shadow-md focus:outline-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Exports Grid */}
        {isLoading ? (
          <DataLoader />
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
            {exportsData.map((product) => (
              <div
                data-aos="zoom-in"
                key={product._id}
                className="border rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover shadow-md"
                />
                <div className="p-4 flex flex-col gap-1">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p>Price: ${product.price}</p>
                  <p>Origin: {product.origin}</p>
                  <Rating value={product.rating} precision={0.1} readOnly />
                  <p>Available Quantity: {product.quantity}</p>
                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white py-1 rounded hover:bg-red-600 transition font-medium"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleOpenUpdate(product)}
                      className="bg-green-500 text-white py-1 rounded hover:bg-green-600 transition font-medium"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty Result */}
        {exportsData.length === 0 && !isLoading && (
          <p className="text-center mt-8 text-orange-500 font-medium text-lg">
            You haven't added any products yet.
          </p>
        )}

        {/* Update Modal */}
        {modalData && (
          <div
            className={`fixed inset-0 bg-black/50 ${
              theme === "dark" && "text-black"
            } flex items-center justify-center z-50 h-screen py-5 overflow-y-scroll`}
          >
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Update Product</h2>
              <form onSubmit={handleUpdate} className="flex flex-col gap-1">
                <span className="font-medium">Name:</span>
                <input
                  type="text"
                  value={updateFields.name}
                  onChange={(e) =>
                    setUpdateFields({ ...updateFields, name: e.target.value })
                  }
                  placeholder="Product Name"
                  className="border px-3 py-2 rounded w-full"
                />
                <span className="font-medium">Image URL:</span>
                <input
                  type="text"
                  value={updateFields.image}
                  onChange={(e) =>
                    setUpdateFields({ ...updateFields, image: e.target.value })
                  }
                  placeholder="Image URL"
                  className="border px-3 py-2 rounded w-full"
                />
                <span className="font-medium">Price:</span>
                <input
                  type="number"
                  value={updateFields.price}
                  onChange={(e) =>
                    setUpdateFields({ ...updateFields, price: e.target.value })
                  }
                  placeholder="Price"
                  className="border px-3 py-2 rounded w-full"
                />
                <span className="font-medium">Origin:</span>
                <input
                  type="text"
                  value={updateFields.origin}
                  onChange={(e) =>
                    setUpdateFields({ ...updateFields, origin: e.target.value })
                  }
                  placeholder="Origin"
                  className="border px-3 py-2 rounded w-full"
                />
                <span className="font-medium">Rating:</span>
                <input
                  type="number"
                  step="0.1"
                  value={updateFields.rating}
                  onChange={(e) =>
                    setUpdateFields({ ...updateFields, rating: e.target.value })
                  }
                  placeholder="Rating"
                  className="border px-3 py-2 rounded w-full"
                />
                <span className="font-medium">Quantity:</span>
                <input
                  type="number"
                  value={updateFields.quantity}
                  onChange={(e) =>
                    setUpdateFields({
                      ...updateFields,
                      quantity: e.target.value,
                    })
                  }
                  placeholder="Quantity"
                  className="border px-3 py-2 rounded w-full"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setModalData(null)}
                    className="bg-gray-300 py-1 px-3 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyExports;
