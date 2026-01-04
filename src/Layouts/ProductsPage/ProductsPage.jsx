import { useContext, useState } from "react";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DataLoader from "../../Components/DataLoader";
import {
  Rating,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { Link } from "react-router";
import { HeadProvider, Title } from "react-head";
import WebContext from "../../Context/WebContext";

const ProductsPage = () => {
  const AxiosPublic = useAxiosPublic();
  const { theme } = useContext(WebContext);

  // Filters State
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", search, category, sort, minPrice, maxPrice],
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/products?search=${search}&category=${category}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      return res.data.data;
    },
    retry: 3,
  });

  const categories = ["Machinery", "Garments", "Agriculture", "Electronics"];
  return (
    <div
      className={
        theme === "dark"
          ? "w-full bg-gray-900 text-white min-h-screen"
          : "w-full min-h-screen"
      }
    >
      <div className="max-w-7xl mx-auto px-5 py-10">
        <HeadProvider>
          <Title>Explore Products || IE Hub</Title>
        </HeadProvider>

        <h1 className="text-4xl font-extrabold text-center mb-4">
          Explore Marketplace
        </h1>

        {/* --- Advanced Filtering Section --- */}
        <div
          className={`p-6 rounded-2xl shadow-lg mb-10 flex flex-col md:flex-row flex-wrap gap-4 items-end justify-center ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-100"
          }`}
        >
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs font-bold uppercase mb-1 block">
              Search Name
            </label>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border px-4 py-2 rounded-lg text-black focus:outline-purple-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-40">
            <label className="text-xs font-bold uppercase mb-1 block">
              Category
            </label>
            <select
              className="w-full border p-2 rounded-lg text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex gap-2 w-full md:w-auto text-black">
            <div>
              <label className="text-xs font-bold uppercase mb-1 block text-white md:text-gray-400">
                Min Price
              </label>
              <input
                type="number"
                placeholder="Min"
                className="w-20 border p-2 rounded-lg"
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase mb-1 block text-white md:text-gray-400">
                Max Price
              </label>
              <input
                type="number"
                placeholder="Max"
                className="w-20 border p-2 rounded-lg"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Sort Option */}
          <div className="w-full md:w-44">
            <label className="text-xs font-bold uppercase mb-1 block">
              Sort By
            </label>
            <select
              className="w-full border p-2 rounded-lg text-black"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <DataLoader />
        ) : (
          <>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className={`group border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-2">
                    <h2 className="text-xl font-bold truncate">
                      {product.name}
                    </h2>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-black text-purple-500">
                        ${product.price}
                      </span>
                      <Rating
                        value={product.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                    </div>

                    <p className="text-sm opacity-80">
                      Origin:{" "}
                      <span className="font-medium">{product.origin}</span>
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          product.quantity > 0 ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></span>
                      <span className="text-xs font-semibold">
                        Stock: {product.quantity} units
                      </span>
                    </div>

                    <Link
                      to={`/product/${product._id}`}
                      className="w-full bg-purple-600 text-white py-2.5 rounded-xl font-bold text-center hover:bg-purple-700 transition shadow-lg shadow-purple-200 dark:shadow-none"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty Result */}
            {products.length === 0 && (
              <div className="text-center py-20">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
                  alt="not found"
                  className="w-24 mx-auto opacity-50 mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-500">
                  No products match your criteria.
                </h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
