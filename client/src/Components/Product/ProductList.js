import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { getProducts } from '../../Redux/Actions/ProductActions';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ProductDetailP from './ProductDetailP';

const ProductList = () => {
    const initialCategories = [
        'Accessories', 'Amino acids', 'Body & Fit', 'Burners', 'Clothes', 
        'Endurance', 'Fat Burner', 'Nutrition', 'Packs', 'Promo', 
        'Protein', 'Snacks', 'Vitamins'
    ];

    // State for category counts
    const [categoryCounts, setCategoryCounts] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const products = useSelector(state => state.ProductReducer.products);
    const searchP = useSelector(state => state.ProductReducer.searchP);

    const [priceRange, setPriceRange] = useState([0, 390]);
    const [selectedCategory, setSelectedCategory] = useState('');
    
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handlePriceChange = (range) => {
        setPriceRange(range);
    };

    // Update category counts whenever the products list changes
    useEffect(() => {
        const counts = initialCategories.reduce((acc, category) => {
            acc[category] = products.filter(product => product.category === category).length;
            return acc;
        }, {});
        setCategoryCounts(counts);
    }, [products]);

    const filteredProducts = products.filter(product => 
        product.title.toUpperCase().includes(searchP.toUpperCase()) &&
        product.price >= priceRange[0] && 
        product.price <= priceRange[1] &&
        (selectedCategory === '' || product.category === selectedCategory)
    );

    return (
        <div className="product-list-container">
            <div className="filters">
                <label>
                    Filter by Price:
                    <Slider
                        range
                        min={0}
                        max={500}
                        defaultValue={priceRange}
                        onChange={handlePriceChange}
                        trackStyle={{ backgroundColor: '#d9d9d9', height: 5 }}
                        handleStyle={{
                            borderColor: '#999',
                            height: 15,
                            width: 15,
                            marginTop: -5,
                            backgroundColor: '#fff',
                        }}
                        railStyle={{ backgroundColor: '#e9e9e9', height: 5 }}
                    />
                    <div className="price-label">
                        Price: {priceRange[0]} د.ت — {priceRange[1]} د.ت
                    </div>
                </label>

                <div className="category-filter">
                    <h3>Product Categories</h3>
                    <ul>
                        {initialCategories.map((category) => (
                            <li
                                key={category}
                                className={selectedCategory === category ? 'active' : ''}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <span>{category}</span>
                                <span className="category-count">{categoryCounts[category] || 0}</span>
                                <span className="expand-icon">+</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="product-cards">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p>No products match your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
