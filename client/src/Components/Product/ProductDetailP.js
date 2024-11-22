import React, { useEffect } from 'react';
import { deleteProduct, getOneProduct } from '../../Redux/Actions/ProductActions';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProduct from './UpdateProduct';
import AddToCartButton from './AddToCartButton';
import { Button } from 'react-bootstrap';
import { current } from '../../Redux/Actions/AuthActions';

const ProductDetailP = ({product}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    return (
       

<div class="custom-table-container relative shadow-md sm:rounded-lg ">
    <table class="custom-table text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Image</span>
                </th>
                <th scope="col" class="px-6 py-3">
                    Product
                </th>
                <th scope="col" class="px-6 py-3">
                    Price
                </th>
                <th scope="col" class="px-6 py-3">
                    Category
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="p-4 text-center">
                    <img src={product.imageURL} class="w-20 h-20 object-cover rounded" alt="Product Image"/>
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.title} 
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} DT
                </td>
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.category}
                </td>
                <td className="px-6 py-4">
                            {/* <button onClick={toggleModal} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                Edit user
                            </button> */}
                            <UpdateProduct product={product} />
                            <i
                                className="fa-solid fa-trash ms-3 cursor-pointer text-red-600"
                                onClick={() => {
                                    dispatch(deleteProduct(product._id));
                                }}
                            ></i>
                </td>   
            </tr>
        </tbody>
    </table>
    
</div>
    );
};

export default ProductDetailP;
