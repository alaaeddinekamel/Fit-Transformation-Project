import { GETADHERENTRDV, GETCOACHRDV, GETONERDV, GETRDV, UPDATE_RENDEZVOUS_STATUS } from "../ActionTypes/RendezVousTypes";

const initialState = {
    rendezVous : [],
    oneRendezVous : {}
}

const RendezVousReducer =(state = initialState, action)=> {
    switch (action.type) {
        case GETRDV: return {...state, rendezVous : action.payload}
        case GETONERDV : return {...state, oneRendezVous : action.payload }
        case GETADHERENTRDV:
            return {
              ...state,
              rendezVous: action.payload }

        case GETCOACHRDV:
            return {
                ...state,
                rendezVous: action.payload }
        
        case UPDATE_RENDEZVOUS_STATUS:
            // Trouve la commande correspondante et met à jour son statut
            const { RendezVousId, newStatus } = action.payload;
            const updatedRDV = state.rendezVous.map(rendezVous =>
                rendezVous._id === RendezVousId ? { ...rendezVous, status: newStatus } : rendezVous
            )
            return {
                ...state,
                rendezVous: updatedRDV,
            }
    
        default: return state
           
    }
}

export default RendezVousReducer