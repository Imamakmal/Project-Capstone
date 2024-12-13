import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";

const Product = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-wrap justify-start gap-5 mt-5 ml-10">
      {products
        .filter((product) => product.quantity > 0)
        .map((product) => (
          <div
            key={product.id}
            className="card card-normal bg-base-100 w-full sm:w-72 md:w-96 shadow-xl flex-shrink-0"
          >
            <figure className="px-5 pt-5">
              <img
                src={product.image}
                alt={`Gambar produk ${product.title}`}
                className="rounded-xl h-48"
                loading="lazy"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-bold text-2xl">
                <Link to={`/detail/${product.id}`} className="title">
                  {product.title}
                </Link>
              </h2>
              <div className="card-actions justify-start">
                <div className="badge badge-outline bg-black text-white p-4">
                  {product.category}
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xl font-bold mr-2">${product.price}</span>
              </div>
              <div className="desc">
                <p>{product.description}</p>
              </div>
              <div className="mt-2 flex items-center">
              <p
                  className={`text-sm ${product.quantity < 5 ? "text-red-500" : "text-black"
                    }`}
                >
                  Quantity: {product.quantity}
                </p>
              </div>
              <div className="flex justify-between gap-2 mt-3">
                <button
                  className="btn flex items-center flex-1"
                  onClick={() => navigate(`/detail/${product.id}`)}
                >
                  <span className="flex-1 text-left">Detail</span>
                </button>
                <CartButton item={product} quantity={1} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Product;
