import { useState } from "react";
import { addToCart } from "../../Redux/Actions/OrderActions";
import { useDispatch } from "react-redux";

const AddToCartButton = ({product}) => {

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        console.log('Product ID:', product._id); // Vérifie que c'est un ID valide
        console.log('Quantity:', quantity); // Vérifie la quantité
        dispatch(addToCart(product._id, quantity));
      };
  return (
    <div className="flex items-center justify-between mt-4 space-x-4 -ml-10">
  {/* Quantity Modifier */}
  <div className="flex items-center space-x-2">
    <button
      className="w-8 h-8 flex items-center justify-center border rounded-full bg-white text-gray-600 hover:bg-gray-200 disabled:opacity-50"
      onClick={() => setQuantity(quantity - 1)}
      disabled={quantity <= 1}
    >
      <i className="fas fa-minus"></i>
    </button>
    <input
      type="number"
      value={quantity}
      readOnly
      className="w-12 h-8 text-center border rounded bg-gray-50 text-gray-800 font-semibold focus:outline-none"
    />
    <button
      className="w-8 h-8 flex items-center justify-center border rounded-full bg-white text-gray-600 hover:bg-gray-200"
      onClick={() => setQuantity(quantity + 1)}
    >
      <i className="fas fa-plus"></i>
    </button>
  </div>

  {/* Add to Cart Button */}
  <button
    className="flex items-center px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-slate-800 whitespace-nowrap"
    onClick={handleAddToCart}
  >
    <i className="fas fa-shopping-cart mr-2"></i>
    Add to Cart
  </button>
</div>


  )
}

export default AddToCartButton