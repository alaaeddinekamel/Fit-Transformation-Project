import { CLEARERROR, HANDLEERROR } from "../ActionTypes/ErreurTypes"

const initialState = []

const ErreurReducer =(state = initialState, action)=>{
    switch (action.type) {
       
        case HANDLEERROR : return [...state, action.payload]
        case CLEARERROR : return state.filter((el,i,t)=>el.id != action.payload)
        default: return state
            
    }
}

export default ErreurReducer