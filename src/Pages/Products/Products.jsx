import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import ProductCard from "../../components/ProductCard";
import { useLoaderData } from "react-router-dom";

const Products = () => {
  const { totalProducts } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const pageNumbers = [...Array(totalPages).keys()];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(
        `https://e-bazar-server-sigma.vercel.app/products?page=${currentPage}&limit=${productsPerPage}`
      );
      const data = await response.json();
      return data;
    },
  });
  useEffect(() => {
    refetch();
  }, [currentPage, productsPerPage, refetch]);

  return (
    <div>
      <SectionTitle title="Products" />
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-ball loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
      <div className="flex justify-center items-center space-x-2 mt-5">
        {pageNumbers.map((number) => (
          <button
            onClick={() => setCurrentPage(number + 1)}
            key={number}
            className="bg-primary text-white px-3 py-2 rounded"
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
