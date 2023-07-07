import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Products from "../Pages/Products/Products";
import SingleProduct from "../Pages/SingleProduct/SingleProduct";
import Register from "../Register/Register";
import Login from "../Pages/Login/Login";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Orders from "../Pages/Orders/Orders";
import DashboardLayout from "../Layout/DashboardLayout";
import Home from "../Pages/Dashboard/Home/Home";
import Orderlist from "../Pages/Dashboard/Orderlist/Orderlist";
import Customers from "../Pages/Dashboard/Customers/Customers";
import Productlist from "../Pages/Dashboard/Productlist/Productlist";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AdminRegister from "../Register/AdminRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <Products />,
        loader: () => fetch("http://localhost:5000/totalProducts"),
      },
      {
        path: "/product/:id",
        element: <SingleProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/product/${params.id}`),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            {" "}
            <Orders />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/adminregister",
        element: <AdminRegister />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <DashboardLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "orderlist",
        element: <Orderlist />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "productlist",
        element: <Productlist />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
    ],
  },
]);

export default router;
