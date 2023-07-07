import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Customers = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/customers`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    axiosSecure.delete(`/deletecustomer/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Customer Deleted Successfully",
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
        <SectionTitle title="Customers" />
      </div>
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
                  <th>Email</th>
                  <th>Phone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        className="w-12 rounded-full"
                        src={user.image}
                        alt=""
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user?.phone}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-error"
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
  );
};

export default Customers;
