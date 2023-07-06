import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import ProductCard from "../../../components/ProductCard";
import { Link } from "react-router-dom";

const ProductSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      return data;
    },
  });
  console.log(data);

  return (
    <div>
      <SectionTitle title="Products" />
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-ball loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.slice(0, 6).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <div className="flex justify-center my-3">
        <Link to="/products" className="btn btn-primary">
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductSection;
