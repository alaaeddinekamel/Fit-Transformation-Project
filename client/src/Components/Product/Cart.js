import { useDispatch, useSelector } from "react-redux";
import { addOrder, removeFromCart, updateCartItem } from "../../Redux/Actions/OrderActions";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { current } from "../../Redux/Actions/AuthActions";

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
  const cart = useSelector(state => state.orderReducer.cart)
  const { cartItems } = cart;
  console.log('Cart Items:', cartItems); // Vérifiez que les items sont bien récupérés


    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId))
      }

      const handleQuantityChange = (productId, qty) => {
        console.log('Changing quantity for productId:', productId, 'to qty:', qty); // Log des changements de quantité
        if (qty > 0) {
          dispatch(updateCartItem(productId, qty));
        }
      }

      const handlePlaceOrder = () => {
        const orderItems = cartItems.map((item) => ({
          product: item.title,
          quantity: item.qty,
          price : item.price,
          image : item.imageURL
        }));
        dispatch(addOrder({ items: orderItems }, navigate));
      }
      
      useEffect(()=>{
        dispatch(current())
    },[])

  return (
    <div>
      <h2>Mon Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide. <Link to="/ProductPage">Retourner au shopping</Link></p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div>
                  <h3>{item.product}</h3>
                  <p>{item.title}</p>
                 <img style={{width : "286px" , height : "391px"}} src={item.imageURL} alt="image not found"/>
              
              <p>Price: {item.price*item.qty}</p>
                  <div>
                    <button onClick={() => handleQuantityChange(item.product, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                    <p>Quantity: {item.qty}</p>
                    <button onClick={() => handleQuantityChange(item.product, item.qty + 1)}>+</button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item.product)}>Retirer</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handlePlaceOrder}>Passer la commande</button>
        </>
      )}
    </div>
  )
}

export default Cart