import SectionTitle from "../../Pages/Shared/SectionTitle/SectionTitle";
import { FaTrash } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Cart = () => {
  const [axiosSecure] = useAxiosSecure();
  const [data, isLoading, refetch] = useCart();
  const handleDelete = (id) => {
    axiosSecure.delete(`/cart/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Product deleted from cart",
          showCloseButton: false,
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    <div>
      <SectionTitle title="Cart" />
      {isLoading ? (
        <div className="flex justify-center">
          <span className="loading loading-ball loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item?.image} alt={item.name} className="w-20" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-sm btn-error btn-circle"
                    >
                      <FaTrash />
                    </button>
                    <Link
                      state={item}
                      to="/checkout"
                      className="btn btn-sm btn-primary ml-2"
                    >
                      Checkout
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
