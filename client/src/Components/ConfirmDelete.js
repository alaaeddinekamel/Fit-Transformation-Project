import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { current, deleteUser } from '../Redux/Actions/AuthActions';
import { useNavigate } from 'react-router-dom';

const ConfirmDelete = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(current())
    },[])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const user = useSelector(state => state.AuthReducer.user)
  return (
    <div>
          <>
          <i className="fa-solid fa-trash ms-3 cursor-pointer text-red-600" onClick={handleShow}></i>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={()=>{navigate('/');dispatch(deleteUser(user._id));handleClose()}}>Delete</Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
    </div>
  )
}

export default ConfirmDelete