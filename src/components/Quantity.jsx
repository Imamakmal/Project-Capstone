import React from "react";
import CartButton from "./CartButton";

const Quantity = ({ quantity, handleQuantityChange, product }) => {
  return (
    <div className="quantity-control mt-5">
      <div className="flex items-center mb-5">
        <input
          type="number"
          value={quantity}
          onChange={(event) =>
            handleQuantityChange(parseInt(event.target.value))
          }
          min="1"
          className="input input-bordered w-16 text-center mx-2"
        />
        <div className="ml-3">
          <CartButton item={product} quantity={quantity} />
        </div>
      </div>
    </div>
  );
};

export default Quantity;
