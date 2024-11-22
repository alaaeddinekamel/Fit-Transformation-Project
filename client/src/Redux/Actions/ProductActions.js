import { GETONEPRODUCT, GETPRODUCTS, RESETSEARCH, SEARCHPRODUCT } from "../ActionTypes/ProductTypes"
import axios from 'axios'


export const getProducts=()=>async(dispatch)=>{
    try {
    const res = await axios.get('/api/Products/getProducts')
    dispatch(
        {
            type : GETPRODUCTS,
            payload : res.data.produits
        }
    )
    } catch (error) {
        console.log(error)
    }
    
}

export const getOneProduct=(id)=>async(dispatch)=>{
    try {
      const res =  await axios.get(`/api/Products/getOneProduct/${id}`)
        dispatch(
            {
            type : GETONEPRODUCT,
            payload : res.data.found
            }
        )
    } catch (error) {
        console.log(error)
    }
}

export const addProduct=(newProduct, navigate)=>async(dispatch)=>{
    try {
        await axios.post('/api/Products/addProduct', newProduct)
        dispatch(getProducts())
        navigate('/ProductPage')
        
    } catch (error) {
        console.log(error)
    }
}

export const searchProduct=(term)=>{
    return ({
        type: SEARCHPRODUCT,
        payload: term,
    })
    
}

export const resetSearch=()=>{
    return ({
        type: RESETSEARCH
    })
    
}

export const updateProduct=(id,upProduct)=>async(dispatch)=>{
    try {
        await axios.put(`/api/Products/updateProduct/${id}`, upProduct)
        dispatch(getProducts())
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct=(id)=>async(dispatch)=>{
    try {
        await axios.delete(`/api/Products/deleteProduct/${id}`)
        dispatch(getProducts())
    } catch (error) {
        console.log(error)
    }
}