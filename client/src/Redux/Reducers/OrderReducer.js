const { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM, CLEAR_CART, GET_ORDERS, GETONEORDER, REJECTORDER, ACCEPTORDER, UPDATE_ORDER_STATUS, SET_ORDERS, SETMYORDERS } = require("../ActionTypes/OrderTypes")

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// État initial
const initialState = {
    cart: {
      cartItems: cartItemsFromStorage  // Utilise les items du localStorage
    },
    orders : [],
    order : {}
  }

  const orderReducer =(state = initialState, action)=>{
    switch (action.type) {
        case ADD_TO_CART:
      const item = action.payload;

      // Vérifier si l'article est déjà dans le panier
      const existItem = state.cart.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // Si l'article existe déjà, on met à jour la quantité
        return {
          ...state,
          cart: {
            cartItems: state.cart.cartItems.map((x) =>
              x.product === existItem.product ? { ...x, qty: x.qty + item.qty } : x // Ajout à la quantité existante
            ),
          },
        };
      } else {
        // Sinon, on ajoute le produit au panier
        console.log('Updated Cart Items:', [...state.cart.cartItems, item]); // Log les nouveaux items
        return {
          ...state,
          cart: {
            cartItems: [...state.cart.cartItems, item],
          },
        };
      }

      

      case REMOVE_FROM_CART:
        return {
          ...state,
          cart: {
            cartItems: state.cart.cartItems.filter((item) => item.product !== action.payload),
          },
        };

  
        case UPDATE_CART_ITEM:
    console.log('Updating cart item:', action.payload); // Log de l'action
    const updatedCartItems = state.cart.cartItems.map((item) =>
        item.product === action.payload.productId
            ? { ...item, qty: action.payload.qty } // Assurez-vous d'utiliser 'qty' ici
            : item
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    return {
        ...state,
        cart: {
            cartItems: updatedCartItems,
        },
    };


    case CLEAR_CART:
        return {
            ...state,
            cart: {
                ...state.cart,
                cartItems: [], // Vider le tableau des cartItems
            },
        }

    case GET_ORDERS : return {...state, orders : action.payload}
    case GETONEORDER : return {...state, order : action.payload }

    case UPDATE_ORDER_STATUS:
      // Trouve la commande correspondante et met à jour son statut
      const { orderId, newStatus } = action.payload;
      const updatedOrders = state.orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
      return {
        ...state,
        orders: updatedOrders,
      }
      
      case SETMYORDERS:
      return {
        ...state,
        orders: action.payload
      }

            
        default: return state
            
    }
  }

  export default orderReducer