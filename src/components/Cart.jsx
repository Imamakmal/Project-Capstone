import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  clearCart,
  updateQuantity,
} from "../redux/cartSlice";
import {
  fetchProducts,
  reduceStock,
} from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState([]);

  const items = useSelector((state) => state.cart.items);
  const {
    items: products,
    loading,
    error,
    stock,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const cartProducts = products.filter((product) =>
    items.find((item) => item.id === product.id)
  );

  const mergedCartProducts = cartProducts.map((product) => {
    const cartItem = items.find((item) => item.id === product.id);
    return {
      ...product,
      quantity: cartItem ? cartItem.quantity : 0,
      availableStock: stock[product.id] || 0,
    };
  });

  const totalPrice = mergedCartProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleQuantityChange = (productId, newQuantity) => {
    const product = mergedCartProducts.find((p) => p.id === productId);

    if (newQuantity > product.availableStock) {
      if (!validationErrors.includes(productId)) {
        setValidationErrors([...validationErrors, productId]);
      }
      return;
    }

    setValidationErrors(validationErrors.filter((id) => id !== productId));

    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    mergedCartProducts.forEach((product) => {
      const availableStock = stock[product.id] || 0;
      if (product.quantity <= availableStock) {
        dispatch(
          reduceStock({ productId: product.id, quantity: product.quantity })
        );
      }
    });

    dispatch(clearCart());
    navigate("/");
  };

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center mt-10">
              Your Cart is Empty!
            </h1>
            <button
              onClick={handleHomeRedirect}
              className="btn text-white bg-pink-600 m-5"
            >
              Go to Product!
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto m-10 m-md-20">
          <table className="table text-center bg-base-100">
            <thead className="text-lg">
              <tr>
                <th />
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-lg">
              {mergedCartProducts.map((product) => (
                <tr key={product.id}>
                  <td></td>
                  <td>
                    <div
                      className="flex items-center gap-3"
                      onClick={() => navigate(`/detail/${product.id}`)}
                    >
                      <div className="avatar h-16">
                        <img
                          src={product.image}
                          alt={`Gambar produk ${product.title}`}
                        />
                      </div>
                      <div className="relative">
                        <div className="font-bold">{product.title}</div>
                        <div className="text-sm opacity-50 text-left">
                          {product.category}
                        </div>
                        {validationErrors.includes(product.id) && (
                          <div className="text-red-500 text-sm absolute left-0 mt-1">
                            Quantity exceeds available stock
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-center align-middle">
                    <div className="flex items-center justify-center">
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(event) =>
                          handleQuantityChange(
                            product.id,
                            parseInt(event.target.value)
                          )
                        }
                        min="1"
                        className="input input-bordered w-16 text-center mx-2"
                      />
                    </div>
                  </td>
                  <td>${product.price}</td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn bg-red-500 text-white me-4 hover:bg-red-500"
                      onClick={() =>
                        dispatch(removeItem({ id: product.id }))
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="text-lg">
              <tr>
                <td></td>
                <td colSpan={3}>Total</td>
                <td>${totalPrice.toFixed(2)}</td>
                <td className="text-right">
                  <div className="flex justify-center">
                    <button
                      className="btn bg-red-500 text-white me-4 hover:bg-red-500"
                      onClick={handleCheckout}
                    >
                      Checkout!
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
