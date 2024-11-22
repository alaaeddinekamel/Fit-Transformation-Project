import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { current } from "../../Redux/Actions/AuthActions";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  return (
    <div className="w-full max-w-xs mx-auto bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <a href="#" className="relative block overflow-hidden rounded-t-lg">
        <img
          className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
          src={product.imageURL}
          alt={product.title}
        />
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg">
          New
        </span>
      </a>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
          {product.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {readMore ? product.description : `${product.description.substring(0, 60)}...`}
          <button
            className="text-blue-600 dark:text-blue-400 font-semibold ml-1"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "Show less" : "Read more"}
          </button>
        </p>

        {/* Rating */}
        <div className="flex items-center mt-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < 4 ? "text-yellow-300" : "text-gray-300 dark:text-gray-600"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            5.0
          </span>
        </div>

        {/* Price and Action */}
        <div className="flex justify-center mt-4">
      <span className="text-2xl font-extrabold text-gray-800 dark:text-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm">
        {product.price} DT
      </span>
    </div>
          <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
