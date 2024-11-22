import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRootAdmin = ({children}) => {
    const token = localStorage.getItem('token')
    const user = useSelector(state => state.AuthReducer.currentUser)
    
    return (
      <div>
          {
              token && user.role === 'admin' ? children : <Navigate to={'/'}/>
          }
      </div>
    )
}

export default PrivateRootAdmin