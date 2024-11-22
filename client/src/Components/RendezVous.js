import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { current, getOneUser } from '../Redux/Actions/AuthActions';
import { addRDV } from '../Redux/Actions/RendezVousActions';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const RendezVous = ({coach}) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    
    useEffect(() => {
        dispatch(current());
    }, []);


    const adherent = useSelector(state => state.AuthReducer.currentUser); // L'utilisateur connecté   

    
    const [date,setDate]=useState('')
    const [message,setMessage]=useState('') 
    console.log("ID de l'utilisateur connecté :", adherent._id);
    console.log("ID du coach :", coach._id);
    const handleAdd =(a)=>{
        a.preventDefault()
        dispatch(addRDV({adherent: adherent._id,coach : coach._id,date,message},navigate))
    }
  return (
  //   <Card style={{ width: '18rem' }}>
  //   <Card.Body>
  //   <Col xs={6} md={4}>
  //         <Image src="holder.js/171x180" roundedCircle />
  //       </Col>
  //     <Card.Title>{coach.name}</Card.Title>
  //     <Card.Text>
  //         {coach.email} 
  //     </Card.Text>
  //     <label for="date">Select a date:</label>
  //       <input type="date" id="date" name="date" onChange={(e)=>setDate(e.target.value)}/>
  //       <h5 class="card-title">Message</h5>
  //   <div >
  //     <textarea class="form-control" id="message" rows="4" placeholder="Your message" onChange={(e)=>setMessage(e.target.value)}></textarea>
  //   </div>
  //     <Button variant='info' onClick={(e)=>handleAdd(e)}>Create Rendez vous</Button>
  //   </Card.Body>
  // </Card>
  
  <>
  <Button variant="info" onClick={handleShow}>Get in Touch</Button>

<Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Create Appointment</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <div className="d-flex flex-column align-items-center mb-4">
        <Image src={coach.picture} roundedCircle width={100} height={100} alt={`${coach.name}'s picture`} />
        <h5 className="mt-3">{coach.name}</h5>
        <p className="text-muted">{coach.email}</p>
      </div>

      <Form.Group controlId="date" className="mb-3">
        <Form.Label>Select a Date</Form.Label>
        <Form.Control 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </Form.Group>

      <Form.Group controlId="message" className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          placeholder="Enter your message here" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer className="d-flex justify-content-between">
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
    <Button variant="primary" onClick={(e) => handleAdd(e)}>
      Create Appointment
    </Button>
  </Modal.Footer>
</Modal>
</>

  )
}

export default RendezVous