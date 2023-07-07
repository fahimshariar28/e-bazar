import { useQuery } from "@tanstack/react-query";

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
  return (
    <div>
      <div className="flex mx-auto mt-5">
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
    </div>
  );
};

export default Home;
