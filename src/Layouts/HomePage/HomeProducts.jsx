import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import DataLoader from "../../Components/DataLoader";
import { Rating } from "@mui/material";
import { Link } from "react-router";

const HomeProducts = () => {
  const AxiosPublic = useAxiosPublic();
  const { data: productsHome = [], isLoading } = useQuery({
    queryKey: ["productsHome"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/products/home/latest");
      return res.data.data;
    },
    retry: 3,
    retryDelay: 2000,
  });
  console.log(productsHome);
  if (isLoading) return <DataLoader></DataLoader>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="sm:text-3xl md:text-4xl text-2xl font-bold text-center">
        Latest Products
      </h1>
      <p className="text-gray-600 text-center font-medium max-w-2xl mx-auto mt-2">
        Latest products from trusted sellers, updated in real time so you always
        see the freshest, most in-demand items ready for global shipment.
      </p>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-8">
        {productsHome.map((product) => (
          <div
            data-aos="zoom-in"
            key={product._id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:shadow-gray-400 transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover shadow-md"
            />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Origin: {product.origin}</p>
              <Rating value={product.rating} precision={0.1} readOnly />
              <p>
                Available Quantity:{" "}
                <span
                  className={`font-medium ${
                    product.quantity > 0
                      ? product.quantity > 10
                        ? "text-green-600"
                        : "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {product.quantity}
                </span>
              </p>
              <Link
                to={`/product/${product._id}`}
                className="mt-2 text-center bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      {/* Empty result */}
      {productsHome.length === 0 && (
        <p className="text-center mt-8 text-orange-500 font-medium text-lg">
          No products found.
        </p>
      )}
    </div>
  );
};

export default HomeProducts;
