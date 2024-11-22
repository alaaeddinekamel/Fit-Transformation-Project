import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetSearch, searchProduct } from '../../Redux/Actions/ProductActions';
import Button from 'react-bootstrap/Button';

const SearchProduct = () => {
    const dispatch = useDispatch()
  const searchP = useSelector(state => state.ProductReducer.searchP)

  const handleReset = () => {
    dispatch(resetSearch());
  };
  return (
    <div className="search">
    <input value={searchP} type="text" onChange={(e) => dispatch(searchProduct(e.target.value))} />
    <Button variant="warning" onClick={handleReset}>Reset</Button>
  </div>
  )
}

export default SearchProduct