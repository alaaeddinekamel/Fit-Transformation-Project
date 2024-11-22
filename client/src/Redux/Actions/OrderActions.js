import { ADD_ORDER, ADD_TO_CART, CLEAR_CART, GET_ORDERS, GETONEORDER, REMOVE_FROM_CART, SET_ORDERS, SETMYORDERS, UPDATE_CART_ITEM, UPDATE_ORDER_STATUS } from "../ActionTypes/OrderTypes"
import axios from 'axios'

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    // Récupérer les détails du produit à partir du backend

    try {
        const res = await axios.get(`/api/Products/getOneProduct/${productId}`);
  
    const item = {
      product: res.data.found._id, // L'ID du produit
      title: res.data.found.title, // Le titre du produit
      description: res.data.found.description, // La description du produit
      imageURL: res.data.found.imageURL, // L'image du produit
      price: res.data.found.price, // Le prix du produit
      qty, // Quantité ajoutée au panier
    };
  
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
  
    // Sauvegarder le panier dans le localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().orderReducer.cart.cartItems));
  }
     catch (error) {
        console.error('Erreur lors de l\'ajout au panier :', error);

    }
}


    

  export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });
  
    // Mettre à jour le localStorage
    localStorage.setItem('cartItems', JSON.stringify(getState().orderReducer.cart.cartItems));
  };

  export const updateCartItem = (productId, qty) => (dispatch, getState) => {
    dispatch({
      type: UPDATE_CART_ITEM,
      payload: { productId, qty },
    });
  
    // Mettre à jour le localStorage
    localStorage.setItem('cart', JSON.stringify(getState().orderReducer.cart.cartItems));
  }

  export const addOrder = (order, navigate) => async (dispatch) => {
    try {
      const res = await axios.post('/api/Order/createOrder', order, {
        headers : {
            Authorized : localStorage.getItem('token')
        }
    });
      dispatch({
        type: ADD_ORDER,
        payload: res.data.newOrder,
      })
  
      // Vider le panier après la commande
      dispatch({ type: CLEAR_CART });
      localStorage.removeItem('cartItems')
      navigate('/ProductPage')
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
    }
  }

  export const getOrders = () => async (dispatch) => {
    try {
      const res = await axios.get('/api/Order/getOrders')
      dispatch({
        type: GET_ORDERS,
        payload: res.data.orders,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    }
  }

  export const getOneOrder=(id)=>async(dispatch)=>{
    try {
      const res =  await axios.get(`/api/Order/getOneOrder/${id}`)
        dispatch(
            {
            type : GETONEORDER,
            payload : res.data.found
            }
        )
    } catch (error) {
        console.log(error)
    }
}

export const updateOrder=(id,upOrder,navigate)=>async(dispatch)=>{
    try {
        await axios.put(`/api/Order/updateOrder/${id}`, upOrder)
        dispatch(getOrders())
        navigate('/CommandesList')
    } catch (error) {
        console.log(error)
    }
}

  export const deleteOrder=(id)=>async(dispatch)=>{
    try {
        await axios.delete(`/api/Order/deleteOrder/${id}`)
        dispatch(getOrders())
    } catch (error) {
        console.log(error)
    }
}

  
  export const updateOrderStatus = (orderId, newStatus) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`/api/Order/updateOrderStatus/${orderId}`, { status: newStatus });
        dispatch({
          type: UPDATE_ORDER_STATUS,
          payload: { orderId, newStatus: response.data.found.status }, // Utilise le statut retourné
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut:', error);
      }
    };
  }

  export const getMyOrders = () => async (dispatch) => {
    try {
      const config = {
        headers : {
            Authorized : localStorage.getItem('token')
        }
    }
      const response = await axios.get('/api/Order/getMyOrders', config);
      dispatch({
        type: SETMYORDERS,
        payload: response.data.orders
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes de l\'utilisateur:', error);
    }
  }
