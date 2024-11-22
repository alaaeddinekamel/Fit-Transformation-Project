import AddProduct from "./AddProduct"
import ProductList from "./ProductList"
import SearchProduct from "./SearchProduct"

const ProductsPage = () => {
  return (
    <div>
            <div className='searchAdd'>
                <AddProduct/>
                <SearchProduct/>
            </div>

            <ProductList/>
        </div>
  )
}

export default ProductsPage