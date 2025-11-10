import { useContext, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import WebContext from "../../Context/WebContext";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { HeadProvider, Title } from "react-head";
import DataLoader from "../../Components/DataLoader";
import { Rating } from "@mui/material";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyImports = () => {
  const AxiosPublic = useAxiosPublic();
  const { user } = useContext(WebContext);
  const [search, setSearch] = useState("");

  // Fetch user's imported products
  const {
    data: imports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myImports", user?.email, search],
    queryFn: async () => {
      if (!user) return [];
      const res = await AxiosPublic.get(
        `/imports?user=${user.email}&search=${search}`
      );
      return res.data.data;
    },
    enabled: !!user,
    retry: 2,
    retryDelay: 1000,
  });

  // Remove imported product
  const handleRemove = async (importId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove the import permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await AxiosPublic.delete(`/imports/${importId}`);
        if (res.data.success) {
          toast.success("Import removed successfully!");
          refetch();
        } else {
          toast.error("Failed to remove import");
        }
      } catch (err) {
        toast.error("Error removing import: " + err.message);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <HeadProvider>
        <Title>My Imports || IE Hub</Title>
      </HeadProvider>

      <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold text-center">
        My Imports
      </h1>
      <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
        View all products you have imported through the "Import Now" button. You
        can remove or view details of each item.
      </p>

      {/* Search Box */}
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          placeholder="Search imported products..."
          className="border px-4 py-2 rounded-lg w-full max-w-md shadow-md focus:outline-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Imports Grid */}
      {isLoading ? (
        <DataLoader></DataLoader>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
          {imports.map((imp) => {
            const product = imp.fullProduct;
            return (
              <div
                data-aos="zoom-in"
                key={imp._id}
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
                  <p>Imported Quantity: {imp.quantity}</p>

                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      onClick={() => handleRemove(imp._id)}
                      className="bg-red-500 text-white py-1 rounded hover:bg-red-600 transition font-medium"
                    >
                      Remove
                    </button>
                    <Link
                      to={`/product/${product.p_id}`}
                      className="bg-blue-500 text-white py-1 rounded text-center font-medium hover:bg-blue-600 transition"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty Result */}
      {imports.length === 0 && !isLoading && (
        <p className="text-center mt-8 text-orange-500 font-medium text-lg">
          You haven't imported any products yet.
        </p>
      )}
    </div>
  );
};

export default MyImports;
