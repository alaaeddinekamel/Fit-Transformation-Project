import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addOrder, removeFromCart, updateCartItem } from '../../Redux/Actions/OrderActions';
import { current } from '../../Redux/Actions/AuthActions';
import Offcanvas from 'react-bootstrap/Offcanvas';

const SideBarProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.orderReducer.cart);
    const { cartItems } = cart;

    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(current());
    }, [dispatch]);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleQuantityChange = (productId, qty) => {
        if (qty > 0) {
            dispatch(updateCartItem(productId, qty));
        }
    };

    const handlePlaceOrder = () => {
        const orderItems = cartItems.map((item) => ({
            product: item.title,
            quantity: item.qty,
            price: item.price,
            image: item.imageURL,
        }));
        dispatch(addOrder({ items: orderItems }, navigate));
        handleClose();
    };

    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShow(true);
    };

    return (
        <>
            <div className="relative inline-block cursor-pointer" onClick={handleShow}>
                {/* Cart Icon */}
                <svg
                    className="w-6 h-6 text-gray-700 dark:text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1 5h12l-1-5M10 21a1 1 0 102 0m4 0a1 1 0 102 0m-6-7h4"></path>
                </svg>
                {/* Badge displaying the cart count */}
                {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {cartItems.length}
                    </span>
                )}
            </div>

            <Offcanvas show={show} onHide={handleClose} placement="end" backdrop>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="text-lg font-semibold">Mon Panier</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {cartItems.length === 0 ? (
                        <div className="text-center">
                            <p className="mb-4">Votre panier est vide.</p>
                            <Link
                                to="/ProductPage"
                                className="text-blue-500 hover:text-blue-700 font-medium"
                            >
                                Retourner au shopping
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <ul className="space-y-4">
                                {cartItems.map((item) => (
                                    <li
                                        key={item.product}
                                        className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
                                    >
                                        <img
                                            src={item.imageURL}
                                            alt={item.title}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 sm:ml-4">
                                            <h3 className="font-semibold text-lg">{item.title}</h3>
                                            <p className="text-gray-500">Prix : {item.price * item.qty} €</p>
                                            <div className="flex items-center mt-2 space-x-2">
                                                <button
                                                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                                                    onClick={() =>
                                                        handleQuantityChange(item.product, item.qty - 1)
                                                    }
                                                    disabled={item.qty <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="font-medium">{item.qty}</span>
                                                <button
                                                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                                                    onClick={() =>
                                                        handleQuantityChange(item.product, item.qty + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            className="text-red-500 hover:text-red-700 mt-2 sm:mt-0"
                                            onClick={() => handleRemoveFromCart(item.product)}
                                        >
                                            Retirer
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={handlePlaceOrder}
                                className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                            >
                                Passer la commande
                            </button>
                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default SideBarProduct;
