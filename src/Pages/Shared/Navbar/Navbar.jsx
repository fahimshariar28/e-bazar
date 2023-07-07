import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const handleLogout = () => {
    logOut();
  };
  const navOption = (
    <>
      <li className="text-xl">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          Home
        </NavLink>
      </li>
      <li className="text-xl">
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active-link" : "link")}
        >
          Products
        </NavLink>
      </li>
      {user && (
        <>
          <li className="text-xl">
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "active-link" : "link")}
            >
              Cart
            </NavLink>
          </li>
          <li className="text-xl">
            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? "active-link" : "link")}
            >
              Orders
            </NavLink>
          </li>
          {isAdmin ? (
            <li className="text-xl">
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
              >
                Dashboard
              </NavLink>
            </li>
          ) : null}
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOption}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">E-Bazar</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navOption}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <button className="btn btn-error ms-3" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
