import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneRDV, updateRendezVous } from "../Redux/Actions/RendezVousActions"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateRendezVous = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(()=>{
        dispatch(getOneRDV(id))
    },[])

    const rendezVous = useSelector(state => state.RendezVousReducer.oneRendezVous)

    const [date,setDate]= useState(rendezVous.date)
    const [message,setMessage]= useState(rendezVous.message)

    useEffect(()=>{
        const formattedDate = rendezVous.date ? new Date(rendezVous.date).toISOString().split('T')[0] : '';
            setDate(formattedDate)
            setMessage(rendezVous.message)
    },[rendezVous])

    const handleUpdate=(a)=>{
        a.preventDefault()
        if ( rendezVous.status == "In progress") {
            dispatch(updateRendezVous(id,{date,message},navigate))
        } else {
            dispatch(updateRendezVous(id,{date,message, status : "Updated"},navigate))
        }
        

       
    }
  return (
    <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Date</Form.Label>
        <Form.Control value={date} onChange={(e)=>setDate(e.target.value)} type="date" placeholder="Enter date" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control value={message} onChange={(e)=>setMessage(e.target.value)} type="email" placeholder="Enter message" />
      </Form.Group>

      
      <Button onClick={(e)=>handleUpdate(e)} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
)
}

export default UpdateRendezVous