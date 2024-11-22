import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOrder, updateOrderStatus } from '../../Redux/Actions/OrderActions';
import { useEffect } from 'react';
import { current } from '../../Redux/Actions/AuthActions';


const CommandeCard = ({ order }) => {
    const dispatch = useDispatch();

    const handleStatusUpdate = (newStatus) => {
        dispatch(updateOrderStatus(order._id, newStatus));
    };

    const getStatusColor = () => {
        if (order.status === 'Rejected') return 'text-danger';
        if (order.status === 'Accepted') return 'text-success';
        return 'text-warning'; // couleur par défaut pour "in progress"
    };

    useEffect(()=>{
        dispatch(current())
    },[])

    return (

<div class="custom-table-container relative shadow-md sm:rounded-lg ">
    <table class="custom-table text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Image</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    Owner Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Product
                </th>
                <th scope="col" class="px-6 py-3">
                    Qty
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="p-4 text-center">
                    <img src={order.image} class="w-20 h-20 object-cover rounded" alt="Product Image"/>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {order.owner.name}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {order.product}
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center justify-center space-x-2">
                        <button class="inline-flex items-center justify-center p-1 h-8 w-8 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Decrease quantity</span>
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <input type="number" class="w-12 text-center bg-gray-50 border border-gray-300 rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-blue-500 focus:border-blue-500" value={order.quantity} />
                        <button class="inline-flex items-center justify-center h-8 w-8 p-1 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Increase quantity</span>
                            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${order.price * order.quantity}
                </td>
                <td className={`font-weight-bold ${getStatusColor()}`} class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                     {order.status}
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <Button
                        variant="outline-danger"
                        onClick={() => handleStatusUpdate('Rejected')}
                        className="btn-sm"
                    >
                        Reject
                    </Button>
                    <Button
                        variant="outline-success"
                        onClick={() => handleStatusUpdate('Accepted')}
                        className="btn-sm"
                    >
                        Accept
                    </Button>
                </td>
                
                <td class="px-6 py-4">
                    <i class="fa-solid fa-trash  text-red-600 dark:text-red-500 hover:underline w-24" onClick={() => dispatch(deleteOrder(order._id))}></i>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    );
};

export default CommandeCard;
