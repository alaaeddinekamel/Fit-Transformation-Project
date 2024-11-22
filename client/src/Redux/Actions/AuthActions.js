import { CURRENT, GETONEUSER, GETUSERS, LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE_PICTURE_SUCCESS } from "../ActionTypes/AuthTypes";
import axios from 'axios'
import { handleError } from "./ErreurActions";

export const register=(cordUser, navigate)=>async(dispatch)=>{
    try {
        const res = await axios.post('/api/auth/signUp', cordUser)
        dispatch(
            {
                type : REGISTER,
                payload : res.data
            }
        )
        navigate('/Profil')
    } catch (error) {
      error.response.data.errors.forEach(element => {
        dispatch(handleError(element.msg))
    }); 
    }
}

export const login =(cordUser, navigate)=>async(dispatch)=>{
    try {
        const res = await axios.post('/api/auth/signIn', cordUser)
        dispatch(
            {
                type : LOGIN,
                payload : res.data
            }
        )
        navigate('/Profil')
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        }); 
    }
}

export const current=()=>async(dispatch)=>{
    try {
        const config = {
            headers : {
                Authorized : localStorage.getItem('token')
            }
        }
        const res = await axios.get('/api/auth/currentUser', config)
        dispatch(
            {
                type : CURRENT,
                payload : res.data
            }
        )
    } catch (error) {
        error.response.data.errors.forEach(element => {
            dispatch(handleError(element.msg))
        });
    }
}

export const logout=()=>{
    return ({
        type : LOGOUT
    })
    
}

export const updateUser=(id,upUser,navigate)=>async(dispatch)=>{
    try {
        await axios.put(`/api/auth/updateUser/${id}`, upUser)
        dispatch(current())
        navigate('/Profil')
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser=(id)=>async(dispatch)=>{
    try {
        await axios.delete(`/api/auth/deleteUser/${id}`)
        dispatch(getUsers())
    } catch (error) {
        console.log(error)
    }
}

export const getUsers=()=>async(dispatch)=>{
    try {
    const res = await axios.get('/api/auth/getUsers')
    dispatch(
        {
            type : GETUSERS,
            payload : res.data.contacts
        }
    )
    } catch (error) {
        console.log(error)
    }
    
}

export const getOneUser=(id)=>async(dispatch)=>{
    try {
      const res =  await axios.get(`/api/auth/getOneUser/${id}`)
        dispatch(
            {
            type : GETONEUSER,
            payload : res.data.found
            }
        )
    } catch (error) {
        console.log(error)
    }
}


export const uploadProfilePicture = (file, userId) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('image', file);  // 'image' est le paramètre requis par ImgBB
        
        const API_KEY = '869ba1b695d0299095a0ab6921cf0c7f';  // Remplacez par votre clé API ImgBB

        // Envoi de la requête à ImgBB
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }   
        });

        const imageUrl = response.data.data.url;  // Récupère l'URL de l'image sur ImgBB

        // Maintenant, vous pouvez envoyer l'URL de l'image à votre backend pour mettre à jour l'utilisateur
        const updatedUserResponse =  await axios.put(`http://localhost:3000/api/auth/${userId}/updateProfilePicture`, { picture: imageUrl });

        dispatch({
            type: UPDATE_PROFILE_PICTURE_SUCCESS,
            payload: updatedUserResponse.data // L'utilisateur mis à jour
        });

        console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
        console.error('Failed to upload profile picture:', error);
    }
};



