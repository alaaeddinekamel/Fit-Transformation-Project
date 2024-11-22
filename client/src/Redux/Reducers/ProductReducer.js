const { GETPRODUCTS, GETONEPRODUCT, SEARCHPRODUCT, RESETSEARCH } = require("../ActionTypes/ProductTypes")

const initialState = {
    products : [],
    product : {},
    searchP: ''
}

const ProductReducer =(state = initialState, action)=>{
    switch (action.type) {
        case GETPRODUCTS: return {...state, products : action.payload}
        case GETONEPRODUCT : return {...state, product : action.payload }
        case SEARCHPRODUCT: return { ...state, searchP : action.payload }
        case RESETSEARCH: return {...state, searchP : ''};
        default: return state
            
    }
}

export default ProductReducer