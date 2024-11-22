import { useDispatch, useSelector } from "react-redux"
import CoachCard from "./CoachCard"
import { useEffect } from "react"
import { getUsers } from "../Redux/Actions/AuthActions"

const ListCoachs = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getUsers())
    },[])

    const users = useSelector(state=>state.AuthReducer.users)
    
  return (
    <div >
        {
            users.filter((user)=> user.role === "coach").map((coach)=> <CoachCard coach={coach}/> )
        }
    </div>
  )
}

export default ListCoachs