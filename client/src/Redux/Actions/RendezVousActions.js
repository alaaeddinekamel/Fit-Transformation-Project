import { GETADHERENTRDV, GETCOACHRDV, GETONERDV, GETRDV, UPDATE_RENDEZVOUS_STATUS } from "../ActionTypes/RendezVousTypes"
import axios from 'axios'
export const addRDV=(newRDV, navigate)=>async(dispatch)=>{
    try {
        await axios.post('/api/RendezVous/createRendezVous', newRDV)
        dispatch(getRDV())
        navigate('/Profil')
        
    } catch (error) {
        console.log(error)
    }
}

export const getRDV=()=>async(dispatch)=>{
    try {
    const res = await axios.get('/api/RendezVous/getRendezVous')
    dispatch(
        {
            type : GETRDV,
            payload : res.data.rendezVous
        }
    )
    } catch (error) {
        console.log(error)
    }
    
}

export const getOneRDV=(id)=>async(dispatch)=>{
    try {
      const res =  await axios.get(`/api/RendezVous/getOneRendezVOus/${id}`)
        dispatch(
            {
            type : GETONERDV,
            payload : res.data.found
            }
        )
    } catch (error) {
        console.log(error)
    }
}

export const getAdherentRendezVous = () => async (dispatch) => {
    try {
      const config = {
        headers : {
            Authorized : localStorage.getItem('token')
        }
    }
      const response = await axios.get('/api/RendezVous/getAdherentRendezVous', config);
      dispatch({
        type: GETADHERENTRDV,
        payload: response.data.rendezVous
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez vous de l\'utilisateur:', error);
    }
  }

  export const getCoachRendezVous = () => async (dispatch) => {
    try {
      const config = {
        headers : {
            Authorized : localStorage.getItem('token')
        }
    }
      const response = await axios.get('/api/RendezVous/getCoachRendezVous', config);
      dispatch({
        type: GETCOACHRDV,
        payload: response.data.rendezVous
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez vous de l\'utilisateur:', error);
    }
  }

  export const updateRendezVousStatus = (RendezVousId, newStatus) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(`/api/RendezVous/updateRendezVousStatus/${RendezVousId}`, { status: newStatus });
        dispatch({
          type: UPDATE_RENDEZVOUS_STATUS,
          payload: { RendezVousId, newStatus: response.data.found.status }, // Utilise le statut retourné
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du rendez Vous:', error);
      }
    }
  }

  export const updateRendezVous=(id,upRDV,navigate)=>async(dispatch)=>{
    try {
        await axios.put(`/api/RendezVous/updateRendezVous/${id}`, upRDV)
        dispatch(getRDV())
        navigate('/Profil')
    } catch (error) {
        console.log(error)
    }
}

export const deleteRendezVous=(id)=>async(dispatch)=>{
    try {
        await axios.delete(`/api/RendezVous/deleteRendezVous/${id}`)
        dispatch(getRDV())
    } catch (error) {
        console.log(error)
    }
}