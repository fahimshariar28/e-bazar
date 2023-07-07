import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col-reverse items-start justify-center">
        <Outlet />
        <label htmlFor="my-drawer" className="btn drawer-button">
          <svg viewBox="0 0 100 80" width="20" height="20">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <li>
            <Link to="/dashboard/home">Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/customers">Customers</Link>
          </li>
          <li>
            <Link to="/dashboard/orderlist">Orders</Link>
          </li>
          <li>
            <Link to="/dashboard/productlist">Products</Link>
          </li>
          <li>
            <Link to="/dashboard/addproduct">Add Product</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
