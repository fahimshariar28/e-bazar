import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import useAuth from "../../hooks/useAuth";

const Orders = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
  });

  const formatOrderTime = (timestamp) => {
    const orderTime = new Date(timestamp);
    return orderTime.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div>
      <SectionTitle title="Orders" />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Ordered Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((order, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.name}</td>
                    <td>{order.price}</td>
                    <td>{formatOrderTime(order.orderTime)}</td>
                    <td>{order.status}</td>
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

export default Orders;
