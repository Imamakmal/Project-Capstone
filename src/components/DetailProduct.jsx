import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setError,
} from "../redux/productSlice";
import Quantity from "./Quantity";

const DetailProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { items: products, loading, error } = useSelector(
    (state) => state.products
  );

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find(
        (prod) => prod.id === parseInt(id)
      );
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setProduct(null);
        dispatch(setError("Product not found"));
      }
    }
  }, [products, id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product data available.</p>;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="card lg:card-side bg-white shadow-xl lg:m-20 m-5">
      <div className="lg:w-1/3 w-full">
        <figure className="p-10">
          <img
            src={product.image}
            alt={`Gambar produk ${product.title}`}
            className="rounded-xl max-h-96 max-w-full object-contain"
          />
        </figure>
      </div>

      <div className="card-body lg:w-2/3 w-full">
        <h2 className="card-title font-bold text-4xl">{product.title}</h2>
        <div className="mt-2">
          <span className="text-3xl font-bold mr-2">${product.price}</span>
        </div>
        <div className="card-actions justify-start">
          <div className="flex items-center space-x-2 text-black text-lg">
             {/* https://emojipedia.org/black-star */}
            <div>Rating {product.rating.rate}★</div>
            <div className="badge badge-outline bg-black text-white text-lg p-4">{product.category}</div>
          </div>
        </div>
        <div className="desc-detail mt-3">
          <p>{product.description}</p>
        </div>
        <Quantity
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
          product={product}
        />
      </div>
    </div>
  );
};

export default DetailProduct;