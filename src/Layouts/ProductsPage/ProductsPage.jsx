import { useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../../Components/DataLoader";
import { Rating } from "@mui/material";
import { Link } from "react-router";
import { HeadProvider, Title } from "react-head";

const ProductsPage = () => {
  const AxiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/products?search=${search}`);
      return res.data.data;
    },
    retry: 3,
    retryDelay: 1500,
  });

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <HeadProvider>
        <Title>All Products || IE Hub</Title>
      </HeadProvider>
      <h1 className="text-3xl font-bold text-center">All Products</h1>
      <p className="text-center text-gray-600 mt-2 max-w-2xl mx-auto">
        Browse through all available import export products. Use the search bar
        to quickly find specific items from our global marketplace.
      </p>

      {/* Search Box */}
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded-lg w-full max-w-md shadow-md focus:outline-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <DataLoader></DataLoader>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-10">
          {products.map((product) => (
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
                <p>
                  Quantity:{" "}
                  <span
                    className={
                      product.quantity > 10
                        ? "text-green-600 font-semibold"
                        : product.quantity > 0
                        ? "text-orange-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {product.quantity}
                  </span>
                </p>

                <Link
                  to={`/product/${product._id}`}
                  className="mt-2 bg-blue-500 text-white py-1 rounded text-center hover:bg-blue-600 transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty result */}
      {products.length === 0 && (
        <p className="text-center mt-8 text-orange-500 font-medium text-lg">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductsPage;
