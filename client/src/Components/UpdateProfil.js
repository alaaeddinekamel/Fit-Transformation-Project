import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneUser, updateUser } from '../Redux/Actions/AuthActions';


const UpdateProfil = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getOneUser(id))
    },[])

    const user = useSelector(state=> state.AuthReducer.user)

    const [name,setName]= useState(user.name)
    const [email,setEmail]= useState(user.email)

    useEffect(()=>{
            setName(user.name)
            setEmail(user.email)
    },[user])

    const handleUpdate=(a)=>{
        a.preventDefault()
        dispatch(updateUser(id,{name,email},navigate))
    }
  return (
    <Form>
      <Form.Group className="mb-3" >
        <Form.Label>name</Form.Label>
        <Form.Control value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" />
      </Form.Group>

      
      <Button onClick={(e)=>handleUpdate(e)} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
)
}

export default UpdateProfil