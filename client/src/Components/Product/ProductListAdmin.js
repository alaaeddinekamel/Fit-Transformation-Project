import React, { useEffect } from 'react'
import ProductDetailP from './ProductDetailP'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/Actions/ProductActions';

const ProductListAdmin = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const products = useSelector(state => state.ProductReducer.products);

  return (
    <div className="container">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4 flex flex-col" style={{ width : '100%'}}>
                {products.map((product) => (
                    <div className="col" key={product._id}>
                        <ProductDetailP product={product} />
                    </div>
                ))}
            </div>
        </div>
  )
}

export default ProductListAdmin