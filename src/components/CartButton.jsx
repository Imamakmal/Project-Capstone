import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

const CartButton = ({ item, quantity }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      dispatch(addItem({ ...item, quantity }));
    }
  };

  return (
    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default CartButton;