import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import Swal from "sweetalert2";

const Productlist = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/allproducts`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    axiosSecure.delete(`/deleteproduct/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Product Deleted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div className="w-9/12 mx-auto">
      <div>
        <SectionTitle title="Products" />
        {isLoading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img className="w-16" src={product.image} alt="" />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.rating}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Productlist;
