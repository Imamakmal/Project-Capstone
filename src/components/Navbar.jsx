import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(subtotal);

  const handleCartRedirect = () => {
    navigate("/cart");
  };

  const handleLogoutRedirect = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleHomeRedirect = () => {
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <div className="navbar bg-Pink fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="flex-1">
        <a
          className="btn btn-ghost text-xl text-white ml-3 cursor-pointer"
          onClick={handleHomeRedirect}
        >
          E-Commerce
        </a>
      </div>
      <div className="flex-none">
        <div
          className="btn btn-ghost btn-circle"
          aria-label="Home"
          role="button"
          onClick={handleHomeRedirect}
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </div>
        </div>
        {token && (
          <div
            className="btn btn-ghost btn-circle mr-3"
            role="button"
            onClick={handleCartRedirect}
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {totalQuantity}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {token ? (
            <button
              onClick={handleLogoutRedirect}
              className="btn bg-red-500 text-white me-4 hover:bg-red-500"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="btn bg-blue-500 text-white me-4 hover:bg-blue-500"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;