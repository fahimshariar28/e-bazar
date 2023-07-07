import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://localhost:5000/totalProducts").then((res) => res.json()),
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("http://localhost:5000/customers").then((res) => res.json()),
  });

  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:5000/allorders").then((res) => res.json()),
  });

  const totalPrice = orders?.reduce((acc, item) => acc + item.price, 0);
  const customers = users?.length;
  const totalProducts = products.totalProducts;
  console.log(totalProducts);

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
      <div className="flex justify-center items-center mt-5">
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Total Sell</div>
            <div className="stat-value">${totalPrice}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Customers</div>
            <div className="stat-value text-secondary">{customers}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Items</div>
            <div className="stat-value">{totalProducts}</div>
          </div>
        </div>
      </div>
      <div className="md:flex justify-between gap-20">
        <div>
          <SectionTitle title="Recent Orders" />
          <>
            <div className="overflow-x-auto">
              <table className="table">
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
                  {orders?.slice(0, 5).map((order, index) => (
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
              <div className="my-5 flex justify-center">
                <Link to="/dashboard/orderlist">
                  <button className="btn btn-primary btn-sm">
                    See all order
                  </button>
                </Link>
              </div>
            </div>
          </>
        </div>
        <div>
          <SectionTitle title="Customers" />
          <>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.slice(0, 5).map((user, index) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="my-5 flex justify-center">
                <Link to="/dashboard/customers">
                  <button className="btn btn-primary btn-sm">
                    See all customers
                  </button>
                </Link>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Home;
