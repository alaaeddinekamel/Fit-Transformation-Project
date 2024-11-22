import AuthReducer from "./AuthReducer"
import {combineReducers} from 'redux'
import ErreurReducer from "./ErreurReducer"
import ProductReducer from "./ProductReducer"
import orderReducer from "./OrderReducer"
import RendezVousReducer from "./RendezVousReducer"

const rootReducer = combineReducers({AuthReducer, ErreurReducer, ProductReducer, orderReducer, RendezVousReducer})

export default rootReducer