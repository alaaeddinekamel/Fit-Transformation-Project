import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Carousel"
import CategoryList from "./CategoryList"
import TestQuiz from "./TestQuiz"
import { useEffect } from "react";
import { getProducts } from "../Redux/Actions/ProductActions";
import ProductCard from "./Product/ProductCard";


const Home = () => {
        
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const products = useSelector(state => state.ProductReducer.products);

    // Filter for Best Sales and Most Popular
    const bestSalesProducts = products
        .filter(product => product.price < 1000) // Adjust the sales count threshold if needed
        .slice(0, 100); // Display the top 5 best-selling products

    const mostPopularProducts = products
        .filter(product => product.category === 'Protein' ) // Adjust the popularity threshold if needed
        .slice(0, 5); // Display the top 5 most popular products

  return (
    <div>
      
      <div className="bg-gray-100 text-gray-900 min-h-screen">
      {/* Carousel Section */}
      <section className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-6">Transform Your Fitness Journey</h1>
          <p className="text-center mb-8 text-lg">Join our community and equip yourself with the best gear.</p>
          <Carousel />
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Shop by Category</h2>
          <CategoryList />
        </div>
      </section>

    {/* Best Sales Section */}
{/* <section className="bg-gray-100 py-10">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-semibold mb-6">Best Sales</h2>
    {bestSalesProducts.length > 0 ? (
      <div className="flex overflow-x-auto space-x-6">
        {bestSalesProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    ) : (
      <p>No best-seller products available.</p>
    )}
  </div>
</section> */}


<section className="bg-gray-100 py-10">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-semibold mb-6">Best Sales</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="grid gap-4">
        {bestSalesProducts[4] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[4].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
        {bestSalesProducts[1] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[1].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
        {bestSalesProducts[2] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[2].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
      </div>
      <div className="grid gap-4">
        {bestSalesProducts[3] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[3].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
        {bestSalesProducts[0] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[0].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
        {bestSalesProducts[6] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[6].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
      </div>
      <div className="grid gap-4">
        {bestSalesProducts[7] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[7].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
        {bestSalesProducts[8] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[8].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
        {bestSalesProducts[9] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[9].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
      </div>
      <div className="grid gap-4">
        {bestSalesProducts[5] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[5].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
        {bestSalesProducts[10] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[10].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
        {bestSalesProducts[11] && (
          <img
            className="h-auto max-w-full rounded-lg"
            src={bestSalesProducts[11].imageURL || "default-image.jpg"}
            alt="Product"
          />
        )}
      </div>
    </div>
  </div>
</section>




{/* Most Popular Section */}
<section className="bg-gray-200 py-10">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-3xl font-semibold mb-6">Most Popular</h2>
    {mostPopularProducts.length > 0 ? (
      <div className="flex overflow-x-auto justify-between">
        {mostPopularProducts.map(product => (
          <ProductCard key={product._id} product={product} className="flex-shrink-0" />
        ))}
      </div>
    ) : (
      <p>No popular products available.</p>
    )}
  </div>
</section>



    </div>    

    </div>
  )
}

export default Home