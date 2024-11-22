import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../Redux/Actions/AuthActions"
import { useEffect } from "react"
import CardUser from "./CardUser"

const ListUsers = () => {
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getUsers())
    },[])

    const users = useSelector(state=>state.AuthReducer.users)
  return (
    <div style={{marginLeft : '170px', width : '88%'}}>
        {
            users.map((user)=> <CardUser user = {user} />)
        }
    </div>
  )
}

export default ListUsers