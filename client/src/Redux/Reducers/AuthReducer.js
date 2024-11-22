import { CURRENT, GETONEUSER, GETUSERS, LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE_PICTURE_SUCCESS } from "../ActionTypes/AuthTypes"

const initialState = {
    user : {},
    users : [],
    currentUser : {},
    token: localStorage.getItem('token') || null,
    errors : []
}

const AuthReducer =(state = initialState, action)=>{
    switch (action.type) {
        
        case REGISTER : 
        localStorage.setItem('token', action.payload.token)
        return {...state, user : action.payload.newAccount, errors : []}
        case LOGIN : 
        localStorage.setItem('token', action.payload.token)
        return {...state, user : action.payload.found, errors : []}
        case LOGOUT : 
        localStorage.removeItem('token')
        return {...state , user : {}, errors : []}
        case CURRENT : 
        return {...state, currentUser : action.payload, errors : []}
        case GETUSERS : return {...state, users : action.payload, errors : []}
        case GETONEUSER : return {...state, user : action.payload, errors : [] }
        case UPDATE_PROFILE_PICTURE_SUCCESS:
            return {
                ...state,
                currentUser: action.payload, // Mise à jour de l'utilisateur actuel avec la nouvelle image
            };
        default: return state
        
    }
}


export default AuthReducer